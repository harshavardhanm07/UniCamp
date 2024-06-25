const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
  dietary_recommendations: {
    type: String,
    
  },
  exercise_recommendations: [Number, String],
  stress_management: String,
  calorie_intake: [Number, String],
  water_intake: [Number, String],
  sleep_recommendations: [Number, String],
  mental_wellbeing: String,
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
