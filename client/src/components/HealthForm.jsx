import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HealthForm.css';

function HealthForm() {
  const navigate = useNavigate();
  const [medicalHistory, setMedicalHistory] = useState(['']);
  const [allergies, setAllergies] = useState(['']);
  const [diet, setDiet] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  // const [exerciseLogs, setExerciseLogs] = useState('');
  // const [dietaryIntake, setDietaryIntake] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState(['']);
  const [dietaryIntake, setDietaryIntake] = useState(['']);
  const [stressLevels, setStressLevels] = useState('');
  const [mood, setMood] = useState('');
  const handleExerciseLogChange = (index, value) => {
    const updatedLogs = [...exerciseLogs];
    updatedLogs[index] = value;
    setExerciseLogs(updatedLogs);
  };
  const handleMedicalHistoryChange = (index, value) => {
    const updatedHistory = [...medicalHistory];
    updatedHistory[index] = value;
    setMedicalHistory(updatedHistory);
  };

  // Add field for Medical History
  const addMedicalHistory = () => {
    setMedicalHistory([...medicalHistory, '']);
  };

  // Remove field for Medical History
  const removeMedicalHistory = (index) => {
    const updatedHistory = [...medicalHistory];
    updatedHistory.splice(index, 1);
    setMedicalHistory(updatedHistory);
  };

  // Handle change for Allergies
  const handleAllergiesChange = (index, value) => {
    const updatedAllergies = [...allergies];
    updatedAllergies[index] = value;
    setAllergies(updatedAllergies);
  };

  // Add field for Allergies
  const addAllergies = () => {
    setAllergies([...allergies, '']);
  };

  // Remove field for Allergies
  const removeAllergies = (index) => {
    const updatedAllergies = [...allergies];
    updatedAllergies.splice(index, 1);
    setAllergies(updatedAllergies);
  };
  const addExerciseLog = () => {
    setExerciseLogs([...exerciseLogs, '']);
  };

  const removeExerciseLog = (index) => {
    const updatedLogs = [...exerciseLogs];
    updatedLogs.splice(index, 1);
    setExerciseLogs(updatedLogs);
  };

  const handleDietaryIntakeChange = (index, value) => {
    const updatedIntake = [...dietaryIntake];
    updatedIntake[index] = value;
    setDietaryIntake(updatedIntake);
  };

  const addDietaryIntake = () => {
    setDietaryIntake([...dietaryIntake, '']);
  };

  const removeDietaryIntake = (index) => {
    const updatedIntake = [...dietaryIntake];
    updatedIntake.splice(index, 1);
    setDietaryIntake(updatedIntake);
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
      },
      exercise_logs: exerciseLogs,
      dietary_intake: dietaryIntake,
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
    <form className="health-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Medical History (comma-separated):</label>
        {medicalHistory.map((history, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={history}
              onChange={(e) =>
                handleMedicalHistoryChange(index, e.target.value)
              }
            />
            {medicalHistory.length > 1 && (
              <button type="button" onClick={() => removeMedicalHistory(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addMedicalHistory}>
          Add Medical History
        </button>
      </div>
      <div className="form-group">
        <label>Allergies (comma-separated):</label>
        {allergies.map((allergy, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={allergy}
              onChange={(e) => handleAllergiesChange(index, e.target.value)}
            />
            {allergies.length > 1 && (
              <button type="button" onClick={() => removeAllergies(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addAllergies}>
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
      {/* <div className="form-group">
        <label>BMI:</label>
        <input
          type="text"
          className="form-control"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
        />
      </div> */}
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
        <label>Symptoms (comma-separated):</label>
        <input
          type="text"
          className="form-control"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
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
      {/* <div className="form-group">
        <label>Exercise Logs (comma-separated):</label>
        <input
          type="text"
          className="form-control"
          value={exerciseLogs}
          onChange={(e) => setExerciseLogs(e.target.value)}
        />
      </div> */}
      <div className="form-group">
        <label>Exercise Logs:</label>
        {exerciseLogs.map((log, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={log}
              onChange={(e) => handleExerciseLogChange(index, e.target.value)}
            />
            {exerciseLogs.length > 1 && (
              <button type="button" onClick={() => removeExerciseLog(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addExerciseLog}>
          Add Exercise Log
        </button>
      </div>
      {/* <div className="form-group">
        <label>Dietary Intake:</label>
        <input
          type="text"
          className="form-control"
          value={dietaryIntake}
          onChange={(e) => setDietaryIntake(e.target.value)}
        />
      </div> */}
      <div className="form-group">
        <label>Dietary Intake:</label>
        {dietaryIntake.map((intake, index) => (
          <div key={index}>
            <input
              type="text"
              className="form-control"
              value={intake}
              onChange={(e) => handleDietaryIntakeChange(index, e.target.value)}
            />
            {dietaryIntake.length > 1 && (
              <button type="button" onClick={() => removeDietaryIntake(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addDietaryIntake}>
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
  );
}

export default HealthForm;
