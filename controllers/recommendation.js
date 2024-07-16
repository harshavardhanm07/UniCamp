const dotenv = require('dotenv');
const { AzureOpenAI } = require("openai");
const Health = require('../db').collection('Health');
const Recommendations = require('../db').collection('Recommendations'); // Assuming you have a collection for recommendations

dotenv.config();

const endpoint = process.env['AZURE_OPENAI_ENDPOINT'];
const apiKey = process.env['AZURE_OPENAI_API_KEY'];
const apiVersion = '2024-04-01-preview';
const deployment = 'unicamp';

const getResponse = async (req, res) => {
  const user = req.user;
  const user_data = await Health.findOne({ user: user._id });

  if (!user_data) {
    return res.status(400).send({ message: "Please create your health profile." });
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  if (new Date(user_data.lastUpdated) <= oneWeekAgo) {
    return res.status(400).send({ message: "Please update your health profile." });
  }

  const existingRecommendations = await Recommendations.findOne({ user: user._id });
  if (existingRecommendations && new Date(existingRecommendations.lastUpdated) > oneWeekAgo) {
    res.send(existingRecommendations);
  } else {
    main(user_data).then(async (result) => {
      result=JSON.parse(result);
      console.log(result.dietary_recommendations);
      const updateDoc = {
        $set: {
          dietary_recommendations: result.dietary_recommendations,
          exercise_recommendations: result.exercise_recommendations,
          stress_management: result.stress_management,
          calorie_intake: result.calorie_intake,
          water_intake: result.water_intake,
          sleep_recommendations: result.sleep_recommendations,
          mental_wellbeing: result.mental_wellbeing,
          // Assuming you still want to track when the recommendations were last updated
          lastUpdated: new Date(),
        },
      };
      const options = { upsert: true };
      await Recommendations.updateOne({ user: user._id }, updateDoc, options);
      res.send(result);
    }).catch((err) => {
      console.error('Error:', err);
      res.status(500).send(err);
    });
  }
}

async function main(user_data) {
  const user_profile = user_data.toString();

  const client = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
  });

  const result = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'UniCampBot is an AI health bot who gives personal suggestions based on the metrics passed by the user. You are also a personal nutritioner for the user. You have to provide personalized health suggestions based on the user health profile. You have to provide the suggestions in JSON format.',
      },
      {
        role: 'user',
        content:
          'Based on the following user health profile, provide personalized health suggestions. The Suggestions should be straight forward with more clarity. The suggestions should be for a week. Follow the schema provided: {"dietary_recommendations": String, "exercise_recommendations": [Hours of exercise per week, "suggestions"], "stress_management": "Ways to engage to manage Stress", "calorie_intake": [Amount of Calories per day for a week," Suggestions on how to consume calories"], "water_intake":[ Litres of water per day, "Suggestions on different conditions"] "sleep_recommendations": [Hours of sleep per day, "how to manage sleep ad suggestions"], "mental_wellbeing": "How to engage in activities to maintain mental well being"}\n' +
          user_profile +
          'Provide the recommendations in JSON format.',
      },
    ],
    model: deployment,
    max_tokens: 2000,
  });
  return result.choices[0].message.content;
}

module.exports = { getResponse };

