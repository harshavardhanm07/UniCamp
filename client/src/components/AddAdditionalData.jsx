import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { UsernameContext } from '../context/usernamecontext';
export default function AddAdditionalData() {
  const { username, setUsername } = useContext(UsernameContext);
  const [userInfo, setUserInfo] = useState({
    username: '',
    age: '',
    mobile: '',
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
        const response = await axios.get(`${BASE_URL}/auth/user`, {
          withCredentials: true,
        });

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
      const response = await axios.put(`${BASE_URL}/auth/update`, userInfo, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const json = response.data;

        setUsername(json.user.username);
        navigate('/addHealthData'); // Or wherever you want to redirect after
      }
    } catch (error) {
      console.error(error);
      navigate('/signup');
    }
  };

  return (
    <div className=" flex-grow items-center p-28">
      <form
        className="flex flex-col max-w-md gap-4 mx-auto mt-8 p-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <h1 className="text-4xl">Finish Sign Up</h1>
        </div>
        <div>
          <Label
            htmlFor="username"
            className="mb-2 block"
            value="Your username"
          />
          <TextInput
            id="username"
            type="text"
            required
            className="w-full"
            onChange={handleChange}
            name="username"
          />
        </div>
        <div>
          <Label
            htmlFor="mobile"
            className="mb-2 block"
            value="Your mobile number"
          />
          <TextInput
            id="mobile"
            type="number"
            required
            className="w-full"
            onChange={handleChange}
            name="mobile"
          />
        </div>
        <div>
          <Label htmlFor="age" className="mb-2 block" value="Your age" />
          <TextInput
            id="age"
            type="number"
            required
            className="w-full"
            onChange={handleChange}
            name="age"
          />
        </div>

        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
