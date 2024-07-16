import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';
import { AuthContext } from '../context/logincontext';
import { UsernameContext } from '../context/usernamecontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Profile.css";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [data, setData] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { username,setUsername } = useContext(UsernameContext);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get(BASE_URL + '/auth/user', {
          withCredentials: true,
        });

        setIsLoggedIn(userResponse.data.isLoggedIn);

        if (userResponse.data.isLoggedIn) {
          const dataResponse = await axios.get(`${BASE_URL}/health/${username}`, {
            withCredentials: true,
          });
          console.log(dataResponse.data);
          setData(dataResponse.data);
        }
      } catch (error) {
        setUsername(''); 
        setIsLoggedIn(false);
        navigate('/login');
      }
    }

    fetchData();
  }, [isLoggedIn, setIsLoggedIn, username, setUsername,navigate]);

  const renderList = (title, items =[]) => (
    <div className="mb-3">
      <h5>{title}</h5>
      <ul className="list-group">
        {items.length===0 ? <li className="list-group-item">No Data</li>:
        items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
          </li>
        ))
      }
      </ul>

    </div>
  );

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">Welcome {username}</h1>
          <hr />
          {data ? (
            <div className="profile-data">
              {renderList("Medical History", data.medical_history)}
              {renderList("Allergies", data.allergies)}
              <div className="mb-3">
                <h5>Lifestyle</h5>
                <ul className="list-group">
                  <li className="list-group-item">Diet: {data.lifestyle?.diet || 'No Data'}</li>
                  <li className="list-group-item">Activity Level: {data.lifestyle?.activity_level || 'No Data'}</li>
                  <li className="list-group-item">Smoking Status: {data.lifestyle?.smoking_status || 'No Data'}</li>
                  <li className="list-group-item">Alcohol Consumption: {data.lifestyle?.alcohol_consumption || 'No Data'}</li>
                </ul>
              </div>
              <div className="mb-3">
                <h5>Vital Signs</h5>
                <ul className="list-group">
                  <li className="list-group-item">Height: {data.vital_signs?.height || 'No Data'}</li>
                  <li className="list-group-item">Weight: {data.vital_signs?.weight || 'No Data'}</li>
                  <li className="list-group-item">BMI: {data.vital_signs?.bmi || 'No Data'}</li>
                  <li className="list-group-item">Blood Pressure: {data.vital_signs?.blood_pressure || 'No Data'}</li>
                  <li className="list-group-item">Heart Rate: {data.vital_signs?.heart_rate || 'No Data'}</li>
                </ul>
              </div>
              {renderList("Symptoms", data.health_tracking?.symptoms)}
              <div className="mb-3">
                <h5>Sleep Patterns</h5>
                <ul className="list-group">
                  <li className="list-group-item">Sleep Hours: {data.health_tracking?.sleep_patterns?.hours || 'No Data'}</li>
                  <li className="list-group-item">Sleep Quality: {data.health_tracking?.sleep_patterns?.quality || 'No Data'}</li>
                </ul>
              </div>
              {renderList("Exercise Logs", data.health_tracking?.exercise_logs)}
              <div className="mb-3">
                <h5>Dietary Intake</h5>
                <p>{data.health_tracking?.dietary_intake || 'No Data'}</p>
              </div>
              <div className="mb-3">
                <h5>Mental Health</h5>
                <ul className="list-group">
                  <li className="list-group-item">Stress Levels: {data.health_tracking?.mental_health?.stress_levels || 'No Data'}</li>
                  <li className="list-group-item">Mood: {data.health_tracking?.mental_health?.mood || 'No Data'}</li>
                </ul>
              </div>
              <div className="mb-3">
                <h5>Friends</h5>
                <ul className="list-group">
                  {data.friends?.map((friend, index) => (
                    <li key={index} className="list-group-item">{friend}</li>
                  )) || 'No Friends'}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
