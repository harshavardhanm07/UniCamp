import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HealthForm.css';

function HealthForm() {
  const navigate = useNavigate();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [diet, setDiet] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [dietaryIntake, setDietaryIntake] = useState([]);
  const [stressLevels, setStressLevels] = useState('');
  const [mood, setMood] = useState('');

  const handleArrayChange = (setter, index) => (e) => {
    setter((prev) => {
      const newArray = [...prev];
      newArray[index] = e.target.value;
      return newArray.filter((item) => item.trim() !== ''); // Remove empty strings
    });
  };

  const addToArray = (setter) => () => {
    setter((prev) => [...prev, '']);
  };

  const removeFromArray = (setter, index) => () => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100; // Convert height from cm to meters
    const weightInKilograms = weight; // Assuming weight is already in kilograms
    if (heightInMeters > 0 && weightInKilograms > 0) {
      return (weightInKilograms / (heightInMeters ** 2)).toFixed(2);
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bmi = calculateBMI();

    const data = {
      medical_history: medicalHistory.map((item) => item.trim()).filter((item) => item !== ''),
      allergies: allergies.map((item) => item.trim()).filter((item) => item !== ''),
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
        symptoms: symptoms.map((item) => item.trim()).filter((item) => item !== ''),
        sleep_patterns: {
          hours: sleepHours,
          quality: sleepQuality,
        },
      },
      exercise_logs: exerciseLogs.map((item) => item.trim()).filter((item) => item !== ''),
      dietary_intake: dietaryIntake.map((item) => item.trim()).filter((item) => item !== ''),
      mental_health: {
        stress_levels: stressLevels,
        mood,
      },
    };

    await axios.post(BASE_URL + '/health', data, {
      withCredentials: true,
    });
    navigate('/dashboard');
  };

  return (
    <div className="py-36">
    <form className="health-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Medical History:</label>
        {medicalHistory.map((history, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={history}
              onChange={handleArrayChange(setMedicalHistory, index)}
            />
            {medicalHistory.length > 1 && (
              <button type="button" onClick={removeFromArray(setMedicalHistory, index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addToArray(setMedicalHistory)}>
          Add Medical History
        </button>
      </div>
      <div className="form-group">
        <label>Allergies :</label>
        {allergies.map((allergy, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={allergy}
              onChange={handleArrayChange(setAllergies, index)}
            />
            {allergies.length > 1 && (
              <button type="button" onClick={removeFromArray(setAllergies, index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addToArray(setAllergies)}>
          Add Allergies
        </button>
      </div>
      <div className="form-group">
        <label>Diet:</label>
        <input
          type="text"
          className="form-control"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Activity Level:</label>
        <input
          type="text"
          className="form-control"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Smoking Status:</label>
        <input
          type="text"
          className="form-control"
          value={smokingStatus}
          onChange={(e) => setSmokingStatus(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Alcohol Consumption:</label>
        <input
          type="text"
          className="form-control"
          value={alcoholConsumption}
          onChange={(e) => setAlcoholConsumption(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Height: {"(in centimeters)"}</label>
        <input
          type="text"
          className="form-control"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Weight:</label>
        <input
          type="text"
          className="form-control"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>BMI:</label>
        <input
          type="text"
          className="form-control"
          value={calculateBMI()} // Call calculateBMI() here to display the calculated BMI
          readOnly // Make the BMI field read-only since it's a derived value
        />
      </div>
      <div className="form-group">
        <label>Blood Pressure:</label>
        <input
          type="text"
          className="form-control"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Heart Rate:</label>
        <input
          type="text"
          className="form-control"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
        />
      </div>
      <div className="form-group">
  <label>Symptoms:</label>
  {symptoms.map((symptom, index) => (
    <div key={index}>
      <input
        type="text"
        className="form-control"
        value={symptom}
        onChange={handleArrayChange(setSymptoms, index)}
      />
      {symptoms.length > 1 && (
        <button type="button" onClick={removeFromArray(setSymptoms, index)}>
          Remove
        </button>
      )}
    </div>
  ))}
  <button type="button" onClick={addToArray(setSymptoms)}>
    Add Symptom
  </button>
</div>
      <div className="form-group">
        <label>Sleep Hours:</label>
        <input
          type="text"
          className="form-control"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Sleep Quality:</label>
        <input
          type="text"
          className="form-control"
          value={sleepQuality}
          onChange={(e) => setSleepQuality(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Exercise Logs:</label>
        {exerciseLogs.map((log, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={log}
              onChange={handleArrayChange(setExerciseLogs, index)}
            />
            {exerciseLogs.length > 1 && (
              <button type="button" onClick={removeFromArray(setExerciseLogs, index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addToArray(setExerciseLogs)}>
          Add Exercise Log
        </button>
      </div>
      <div className="form-group">
        <label>Dietary Intake:</label>
        {dietaryIntake.map((intake, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={intake}
              onChange={handleArrayChange(setDietaryIntake, index)}
            />
            {dietaryIntake.length > 1 && (
              <button type="button" onClick={removeFromArray(setDietaryIntake, index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addToArray(setDietaryIntake)}>
          Add Dietary Intake
        </button>
      </div>
      <div className="form-group">
        <label>Stress Levels:</label>
        <input
          type="text"
          className="form-control"
          value={stressLevels}
          onChange={(e) => setStressLevels(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Mood:</label>
        <input
          type="text"
          className="form-control"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
  );
}

export default HealthForm;