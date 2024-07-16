import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';
import { AuthContext } from '../context/logincontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosWater } from 'react-icons/io';
import { FaBowlFood, FaPersonRunning } from 'react-icons/fa6';
import { GiNightSleep } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isLoggedIn, setIsLoggedIn,navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-200 p-6 pt-16">
      <h1 className="my-4 ">Dashboard</h1>
      <div className="pb-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6 items-center px-6 lg:px-12">
          <div className="bg-white h-auto w-full lg:w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center shadow-md">
            <button
              type="button"
              style={{ color: 'orange', backgroundColor: '#FFD3B6' }}
              className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
            >
              <FaBowlFood />
            </button>
            <div className="text-center">
              <p className="text-xl font-semibold">{calorieIntakeAmount}</p>
              <p className="text-sm text-gray-500 mt-1">Calories Intake</p>
            </div>
          </div>

          <div className="bg-white h-auto w-full lg:w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center shadow-md">
            <button
              type="button"
              style={{ color: '#1E3A8A', backgroundColor: '#BFDBFE' }}
              className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
            >
              <IoIosWater />
            </button>
            <div className="text-center">
              <p className="text-xl font-semibold">
                {waterIntakeAmount} liters
              </p>
              <p className="text-sm text-gray-500 mt-1">Water Intake</p>
            </div>
          </div>

          <div className="bg-white h-auto w-full lg:w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center shadow-md">
            <button
              type="button"
              style={{ color: '#2563EB', backgroundColor: '#BFDBFE' }}
              className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
            >
              <GiNightSleep />
            </button>
            <div className="text-center">
              <p className="text-xl font-semibold">{sleepHours} hours</p>
              <p className="text-sm text-gray-500 mt-1">Sleep Hours</p>
            </div>
          </div>

          <div className="bg-white h-auto w-full lg:w-1/5 p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center shadow-md">
            <button
              type="button"
              style={{ color: 'green', backgroundColor: '#A7F3D0' }}
              className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
            >
              <FaPersonRunning />
            </button>
            <div className="text-center">
              <p className="text-xl font-semibold">{exerciseFrequency} hours</p>
              <p className="text-sm text-gray-500 mt-1">a week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="my-4 pb-2">Recommendations</h1>
        <div className="flex flex-col bg-white rounded-2xl p-4 items-start justify-start shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-semibold">Dietary Recommendations</h2>
          <p className="text-lg text-gray-500">{dietaryRecommendations}</p>
        </div>
        <div className="flex flex-col bg-white rounded-2xl p-4 items-start justify-start shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-semibold">Exercise Recommendations</h2>
          <p className="text-lg text-gray-500">{exerciseDescription}</p>
        </div>
        <div className="flex flex-col bg-white rounded-2xl p-4 items-start justify-start shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-semibold">Stress Management</h2>
          <p className="text-lg text-gray-500">{stressManagement}</p>
        </div>
        <div className="flex flex-col bg-white rounded-2xl p-4 items-start justify-start shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-semibold">Calorie Intake</h2>
          <p className="text-lg text-gray-500">{calorieIntakeDescription}</p>
        </div>
        <div className="flex flex-col bg-white rounded-2xl p-4 items-start justify-start shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-semibold">Water Intake</h2>
          <p className="text-lg text-gray-500">{waterIntakeDescription}</p>
        </div>
        <div className="flex flex-col bg-white rounded-2xl p-4 items-start justify-start shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-semibold">Sleep Recommendations</h2>
          <p className="text-lg text-gray-500">{sleepDescription}</p>
        </div>
        <div className="flex flex-col bg-white rounded-2xl p-4 items-start justify-start shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-semibold">Mental Wellbeing</h2>
          <p className="text-lg text-gray-500">{mentalWellbeing}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
