// import axios from 'axios';
// import React, { useState, useEffect, useContext } from 'react';
// import BASE_URL from '../config';
// import { AuthContext } from '../context/logincontext';

// function Dashboard() {
//   const [dietaryRecommendations, setDietaryRecommendations] = useState('');
//   const [exerciseFrequency, setExerciseFrequency] = useState(0);
//   const [exerciseDescription, setExerciseDescription] = useState('');
//   const [stressManagement, setStressManagement] = useState('');
//   const [calorieIntakeAmount, setCalorieIntakeAmount] = useState(0);
//   const [calorieIntakeDescription, setCalorieIntakeDescription] = useState('');
//   const [waterIntakeAmount, setWaterIntakeAmount] = useState(0);
//   const [waterIntakeDescription, setWaterIntakeDescription] = useState('');
//   const [sleepHours, setSleepHours] = useState(0);
//   const [sleepDescription, setSleepDescription] = useState('');
//   const [mentalWellbeing, setMentalWellbeing] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const userResponse = await axios.get(BASE_URL + '/auth/user', {
//           withCredentials: true,
//         });
//         setIsLoggedIn(userResponse.data.isLoggedIn);
//         if (userResponse.data.isLoggedIn) {
//           const dataResponse = await axios.get(`${BASE_URL}/recommendation`, {
//             withCredentials: true,
//           });
//           const data = dataResponse.data;

//           setDietaryRecommendations(data.dietary_recommendations);
//           setExerciseFrequency(data.exercise_recommendations[0]);
//           setExerciseDescription(data.exercise_recommendations[1]);
//           setStressManagement(data.stress_management);
//           setCalorieIntakeAmount(data.calorie_intake[0]);
//           setCalorieIntakeDescription(data.calorie_intake[1]);
//           setWaterIntakeAmount(data.water_intake[0]);
//           setWaterIntakeDescription(data.water_intake[1]);
//           setSleepHours(data.sleep_recommendations[0]);
//           setSleepDescription(data.sleep_recommendations[1]);
//           setMentalWellbeing(data.mental_wellbeing);
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [isLoggedIn, setIsLoggedIn]); // Dependency array with isLoggedIn
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome to the Dashboard</h1>
//       <div>
//         <h2>Dietary Recommendations</h2>
//         <p>{dietaryRecommendations}</p>

//         <h2>Exercise Recommendations</h2>
//         <p>{exerciseDescription}</p>
//         <p>Frequency: {exerciseFrequency} hours a week</p>

//         <h2>Stress Management</h2>
//         <p>{stressManagement}</p>

//         <h2>Calorie Intake</h2>
//         <p>{calorieIntakeDescription}</p>
//         <p>Amount: {calorieIntakeAmount} calories per day</p>

//         <h2>Water Intake</h2>
//         <p>{waterIntakeDescription}</p>
//         <p>Amount: {waterIntakeAmount} liters per day</p>

//         <h2>Sleep Recommendations</h2>
//         <p>{sleepDescription}</p>
//         <p>Hours: {sleepHours} hours per night</p>

//         <h2>Mental Wellbeing</h2>
//         <p>{mentalWellbeing}</p>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import BASE_URL from "../config";
import { AuthContext } from "../context/logincontext";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosWater } from "react-icons/io";
import { FaBowlFood, FaPersonRunning } from "react-icons/fa6";
import { GiNightSleep } from "react-icons/gi";

function Dashboard() {
  const [dietaryRecommendations, setDietaryRecommendations] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState(0);
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [stressManagement, setStressManagement] = useState("");
  const [calorieIntakeAmount, setCalorieIntakeAmount] = useState(0);
  const [calorieIntakeDescription, setCalorieIntakeDescription] = useState("");
  const [waterIntakeAmount, setWaterIntakeAmount] = useState(0);
  const [waterIntakeDescription, setWaterIntakeDescription] = useState("");
  const [sleepHours, setSleepHours] = useState(0);
  const [sleepDescription, setSleepDescription] = useState("");
  const [mentalWellbeing, setMentalWellbeing] = useState("");
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get(BASE_URL + "/auth/user", {
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
  }, [isLoggedIn, setIsLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <Container>
    //   <h1 className="my-4">Welcome to the Dashboard</h1>

    //   <Row className="mb-4">
    //     <Col>
    //       <Card className="text-center">
    //         <Card.Body>
    //           <Card.Title>{calorieIntakeAmount} cal</Card.Title>
    //           <Card.Text>Calories Burn</Card.Text>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col>
    //       <Card className="text-center">
    //         <Card.Body>
    //           <Card.Title>{waterIntakeAmount} liters</Card.Title>
    //           <Card.Text>Water Intake</Card.Text>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col>
    //       <Card className="text-center">
    //         <Card.Body>
    //           <Card.Title>{sleepHours} Hours</Card.Title>
    //           <Card.Text>Sleeping Effectiveness</Card.Text>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>

    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Card.Title>Dietary Recommendations</Card.Title>
    //       <Card.Text>{dietaryRecommendations}</Card.Text>
    //     </Card.Body>
    //   </Card>

    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Card.Title>Exercise Recommendations</Card.Title>
    //       <Card.Text>{exerciseDescription}</Card.Text>
    //       <Card.Text>Frequency: {exerciseFrequency} hours a week</Card.Text>
    //     </Card.Body>
    //   </Card>

    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Card.Title>Stress Management</Card.Title>
    //       <Card.Text>{stressManagement}</Card.Text>
    //     </Card.Body>
    //   </Card>

    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Card.Title>Calorie Intake</Card.Title>
    //       <Card.Text>{calorieIntakeDescription}</Card.Text>
    //       <Card.Text>Amount: {calorieIntakeAmount} calories per day</Card.Text>
    //     </Card.Body>
    //   </Card>

    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Card.Title>Water Intake</Card.Title>
    //       <Card.Text>{waterIntakeDescription}</Card.Text>
    //       <Card.Text>Amount: {waterIntakeAmount} liters per day</Card.Text>
    //     </Card.Body>
    //   </Card>

    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Card.Title>Sleep Recommendations</Card.Title>
    //       <Card.Text>{sleepDescription}</Card.Text>
    //       <Card.Text>Hours: {sleepHours} hours per night</Card.Text>
    //     </Card.Body>
    //   </Card>

    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Card.Title>Mental Wellbeing</Card.Title>
    //       <Card.Text>{mentalWellbeing}</Card.Text>
    //     </Card.Body>
    //   </Card>
    // </Container>
    <div className="bg-slate-200 p-6">
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6 items-center px-4 lg:px-10">
        <div className="bg-white h-auto w-full lg:w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center">
          <button
            type="button"
            style={{ color: "orange", backgroundColor: "#FFD3B6" }}
            className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
          >
            <FaBowlFood />
          </button>
          <div className="text-center">
            <p className="text-xl font-semibold">{calorieIntakeAmount}</p>
            <p className="text-sm text-gray-500 mt-1">Calories Intake</p>
          </div>
        </div>

        <div className="bg-white h-auto w-full lg:w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center">
          <button
            type="button"
            style={{ color: "#1E3A8A", backgroundColor: "#BFDBFE" }}
            className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
          >
            <IoIosWater />
          </button>
          <div className="text-center">
            <p className="text-xl font-semibold">{waterIntakeAmount} liters</p>
            <p className="text-sm text-gray-500 mt-1">Water Intake</p>
          </div>
        </div>

        <div className="bg-white h-auto w-full lg:w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center">
          <button
            type="button"
            style={{ color: "#2563EB", backgroundColor: "#BFDBFE" }}
            className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
          >
            <GiNightSleep />
          </button>
          <div className="text-center">
            <p className="text-xl font-semibold">{sleepHours} hours</p>
            <p className="text-sm text-gray-500 mt-1">Sleep Hours</p>
          </div>
        </div>

        <div className="bg-white h-auto w-full lg:w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex flex-col justify-between items-center">
          <button
            type="button"
            style={{ color: "green", backgroundColor: "#A7F3D0" }}
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
  );
}

export default Dashboard;

//hoorizontal card

{/* <div className="bg-slate-200 p-6">
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6 items-center px-10">
        <div className="bg-white h-auto w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex justify-between px-10 items-center">
          <button
            type="button"
            style={{ color: "orange", backgroundColor: "pink" }}
            className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
          >
            <FaBowlFood />
          </button>
          <div className="text-center">
            <p className="text-xl font-semibold">{calorieIntakeAmount}</p>
            <p className="text-sm text-gray-400 mt-1">Calories Intake</p>
          </div>
        </div>

        <div className="bg-white h-auto w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex justify-between px-10 items-center">
          <button
            type="button"
            style={{ color: "darkblue", backgroundColor: "lightblue" }}
            className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
          >
            <IoIosWater />
          </button>
          <div className="text-center">
            <p className="text-xl font-semibold">{waterIntakeAmount} liters</p>
            <p className="text-sm text-gray-400 mt-1">Water Intake</p>
          </div>
        </div>

        <div className="bg-white h-auto w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex justify-between px-10 items-center">
          <button
            type="button"
            style={{ color: "blue", backgroundColor: "lightblue" }}
            className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
          >
            <GiNightSleep />
          </button>
          <div className="text-center">
            <p className="text-xl font-semibold">{sleepHours} hours</p>
            <p className="text-sm text-gray-400 mt-1">Sleep Hours</p>
          </div>
        </div>
        <div className="bg-white h-auto w-1/5 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 pt-9 rounded-2xl hover:drop-shadow-xl flex justify-between px-10 items-center">
          <button
            type="button"
            style={{ color: "green", backgroundColor: "lightgreen" }}
            className="text-4xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mb-3"
          >
            <FaPersonRunning />
          </button>
          <div className="text-center">
            <p className="text-xl font-semibold">{exerciseFrequency} hours</p>
            <p className="text-sm text-gray-400 mt-1">a week</p>
          </div>
        </div>
      </div>
    </div> */}