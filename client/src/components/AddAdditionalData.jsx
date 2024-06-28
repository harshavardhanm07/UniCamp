import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';

export default function AddAdditionalData() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    age: '',
    mobileNumber: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Assuming you have an endpoint to check user status
        const response = await axios.get(`${BASE_URL}/auth/user`, { withCredentials: true });
        if (response.data.username) {
          navigate('/profile'); // Redirect to profile if username exists
        }
      } catch (error) {
        console.error(error);
        navigate('/signup'); // Redirect to signup if error (e.g., not logged in)
      }
    };

    checkUserStatus();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assume a function saveUserInfo exists to save this to your backend
    try {
      await axios.put(`${BASE_URL}/signup`, userInfo, {
        withCredentials: true,
      });
      navigate('/addHealthData'); // Or wherever you want to redirect after
    } catch (error) {
      console.error(error);
      navigator('/signup');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={userInfo.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="number"
        name="age"
        value={userInfo.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        type="tel"
        name="mobileNumber"
        value={userInfo.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile Number"
        required
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}

