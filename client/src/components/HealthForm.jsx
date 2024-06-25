import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { useNavigate, Link } from 'react-router-dom';


function HealthForm() {
  const navigate = useNavigate();
  const [medicalHistory, setMedicalHistory] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diet, setDiet] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState('');
  const [dietaryIntake, setDietaryIntake] = useState('');
  const [stressLevels, setStressLevels] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      medical_history: medicalHistory.split(',').map((item) => item.trim()),
      allergies: allergies.split(',').map((item) => item.trim()),
      lifestyle: {
        diet,
        activity_level: activityLevel,
        smoking_status: smokingStatus,
        alcohol_consumption: alcoholConsumption,
      },
      vital_signs: {
        height,
        weight,
        bmi,
        blood_pressure: bloodPressure,
        heart_rate: heartRate,
      },
      health_tracking: {
        symptoms: symptoms.split(',').map((item) => item.trim()),
        sleep_patterns: {
          hours: sleepHours,
          quality: sleepQuality,
        },
        exercise_logs: exerciseLogs.split(',').map((item) => item.trim()),
        dietary_intake: dietaryIntake,
        mental_health: {
          stress_levels: stressLevels,
          mood,
        },
      },
    };


    await axios.post(BASE_URL + '/health', data, {
      withCredentials: true,
    });
    navigate('/dashboard')
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Medical History (comma-separated):
        <input
          type="text"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
        />
      </label>
      <label>
        Allergies (comma-separated):
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
      </label>
      {/* ... */}
      <label>
        Diet:
        <input
          type="text"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
      </label>
      <label>
        Activity Level:
        <input
          type="text"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        />
      </label>
      <label>
        Smoking Status:
        <input
          type="text"
          value={smokingStatus}
          onChange={(e) => setSmokingStatus(e.target.value)}
        />
      </label>
      <label>
        Alcohol Consumption:
        <input
          type="text"
          value={alcoholConsumption}
          onChange={(e) => setAlcoholConsumption(e.target.value)}
        />
      </label>
      <label>
        Height:
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <label>
        Weight:
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>
      <label>
        BMI:
        <input
          type="text"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
        />
      </label>
      <label>
        Blood Pressure:
        <input
          type="text"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
        />
      </label>
      <label>
        Heart Rate:
        <input
          type="text"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
        />
      </label>
      <label>
        Symptoms (comma-separated):
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
      </label>
      <label>
        Sleep Hours:
        <input
          type="text"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
        />
      </label>
      <label>
        Sleep Quality:
        <input
          type="text"
          value={sleepQuality}
          onChange={(e) => setSleepQuality(e.target.value)}
        />
      </label>
      <label>
        Exercise Logs (comma-separated):
        <input
          type="text"
          value={exerciseLogs}
          onChange={(e) => setExerciseLogs(e.target.value)}
        />
      </label>
      <label>
        Dietary Intake:
        <input
          type="text"
          value={dietaryIntake}
          onChange={(e) => setDietaryIntake(e.target.value)}
        />
      </label>
      <label>
        Stress Levels:
        <input
          type="text"
          value={stressLevels}
          onChange={(e) => setStressLevels(e.target.value)}
        />
      </label>
      <label>
        Mood:
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default HealthForm;
