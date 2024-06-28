const Health = require('../db').collection('Health');
const User = require('../db').collection('Users');
const { ObjectId } = require('mongodb');
const getHealth = async (req, res) => {
  try {
    const user = req.params.username;

    const dbuser = await User.findOne({ username: user });
    if (!dbuser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = dbuser._id;

    const healthData = await Health.findOne({ user: userId });

    if (!userId.equals(req.user._id)) {
      if (!healthData.friends.map(friend => friend.toString()).includes(req.user._id.toString())) {
        return res.status(403).json({ message: 'Forbidden' });
      }else {
        return res.status(200).json(healthData);
      }
    } else {
      return res.status(200).json(healthData);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postHealth = (req, res) => {
  const {
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health,
  } = req.body;

  const health = {
    user: req.user._id,
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health,
    last_updated: new Date(),
    friends: [],
  };

  // Now you can use these variables in your function
  // console.log( medical_history, allergies, lifestyle, vital_signs, health_tracking, exercise_logs, dietary_intake, mental_health);

  // Save data to database...
  Health.insertOne(health);
  res.status(200).json({ message: 'Data Added' });
};

const updatehHealth = () => {
  //update health data

  const user = req.user._id;
  const {
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health,
  } = req.body;

  const health = {
    user: req.user._id,
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health,
    last_updated: new Date(),
  };

  Health.findOneAndUpdate({ user: user }, { $set: health })
    .then((health) => {
      res.status(200).json({ health });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = {
  getHealth,
  postHealth,
  updatehHealth,
};
