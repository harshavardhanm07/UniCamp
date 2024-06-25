import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';
import { AuthContext } from '../context/logincontext';

function Dashboard() {
  const [dietaryRecommendations, setDietaryRecommendations] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState(0);
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [stressManagement, setStressManagement] = useState('');
  const [calorieIntakeAmount, setCalorieIntakeAmount] = useState(0);
  const [calorieIntakeDescription, setCalorieIntakeDescription] = useState('');
  const [waterIntakeAmount, setWaterIntakeAmount] = useState(0);
  const [waterIntakeDescription, setWaterIntakeDescription] = useState('');
  const [sleepHours, setSleepHours] = useState(0);
  const [sleepDescription, setSleepDescription] = useState('');
  const [mentalWellbeing, setMentalWellbeing] = useState('');
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get(BASE_URL + '/auth/user', {
          withCredentials: true,
        });
        setIsLoggedIn(userResponse.data.isLoggedIn);
        if (userResponse.data.isLoggedIn) {
          const dataResponse = await axios.get(`${BASE_URL}/recommendation`, {
            withCredentials: true,
          });
          const data = dataResponse.data;

          setDietaryRecommendations(data.dietary_recommendations);
          setExerciseFrequency(data.exercise_recommendations[0]);
          setExerciseDescription(data.exercise_recommendations[1]);
          setStressManagement(data.stress_management);
          setCalorieIntakeAmount(data.calorie_intake[0]);
          setCalorieIntakeDescription(data.calorie_intake[1]);
          setWaterIntakeAmount(data.water_intake[0]);
          setWaterIntakeDescription(data.water_intake[1]);
          setSleepHours(data.sleep_recommendations[0]);
          setSleepDescription(data.sleep_recommendations[1]);
          setMentalWellbeing(data.mental_wellbeing);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isLoggedIn, setIsLoggedIn]); // Dependency array with isLoggedIn
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <div>
        <h2>Dietary Recommendations</h2>
        <p>{dietaryRecommendations}</p>

        <h2>Exercise Recommendations</h2>
        <p>{exerciseDescription}</p>
        <p>Frequency: {exerciseFrequency} hours a week</p>

        <h2>Stress Management</h2>
        <p>{stressManagement}</p>

        <h2>Calorie Intake</h2>
        <p>{calorieIntakeDescription}</p>
        <p>Amount: {calorieIntakeAmount} calories per day</p>

        <h2>Water Intake</h2>
        <p>{waterIntakeDescription}</p>
        <p>Amount: {waterIntakeAmount} liters per day</p>

        <h2>Sleep Recommendations</h2>
        <p>{sleepDescription}</p>
        <p>Hours: {sleepHours} hours per night</p>

        <h2>Mental Wellbeing</h2>
        <p>{mentalWellbeing}</p>
      </div>
    </div>
  );
}

export default Dashboard;
