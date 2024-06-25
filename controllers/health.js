const Health=require('../db').collection('Health');

const getHealth = (req, res) => {
  
  const user=req.user._id;
  Health.findOne({user:user}).then((health)=>{
    res.status(200).json({ health });
  }).catch((err)=>{
    res.status(500).json({ message: 'Internal server error' });
  })

  // res.status(200).json({ message: 'Health check passed' });
}
const postHealth = (req, res) => {
  const {
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health
  } = req.body;

  const health={
    user:req.user._id,
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health,
    last_updated: new Date(),
    friends: []
  }

  // Now you can use these variables in your function
  // console.log( medical_history, allergies, lifestyle, vital_signs, health_tracking, exercise_logs, dietary_intake, mental_health);

  // Save data to database...
  Health.insertOne(health);
  res.status(200).json({ message: 'Data Added' });
}

const updatehHealth =()=>{
  //update health data

  const user=req.user._id;
  const {
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health
  } = req.body;

  const health={
    user:req.user._id,
    medical_history,
    allergies,
    lifestyle,
    vital_signs,
    health_tracking,
    exercise_logs,
    dietary_intake,
    mental_health,
    last_updated: new Date(),
  }

Health.findOneAndUpdate({user:user},{$set:health}).then((health)=>{
  res.status(200).json({ health });
}).catch((err)=>{
  res.status(500).json({ message: 'Internal server error' });
})
  // res.status(200).json({ message: 'Health check passed' });
}

module.exports = {
    getHealth,
    postHealth,
    updatehHealth
    };
    