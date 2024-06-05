const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  medical_history: [String],
  allergies: [String],
  lifestyle: {
    diet: String,
    activity_level: String,
    smoking_status: String,
    alcohol_consumption: String,
  },
  vital_signs: {
    height: Number,
    weight: Number,
    bmi: Number,
    blood_pressure: String,
    heart_rate: Number,
  },
  health_tracking: {
    symptoms: [String],
    sleep_patterns: {
      hours: Number,
      quality: String,
    },
    exercise_logs: [String],
    dietary_intake: String,
    mental_health: {
      stress_levels: String,
      mood: String,
    },
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('HealthRecord', healthSchema);
