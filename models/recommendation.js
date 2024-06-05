const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    dietary_recommendations: {
        type: String,
        required: true
    },
    exercise_recommendations: {
        type: String,
        required: true
    },
    stress_management: {
        type: String,
        required: true
    },
    calorie_intake: {
        type: Number,
        required: true
    },
    water_intake: {
        type: Number,
        required: true
    },
    sleep_recommendations: {
        type: String,
        required: true
    },
    mental_wellbeing: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);