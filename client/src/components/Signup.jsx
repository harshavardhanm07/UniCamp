import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/logincontext';
import axios from 'axios';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../config';
// import { UserNameContext } from '../context/namecontext';

export default function SignUp(props) {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [confirmPassword, setConfirmPassword] = useState('');
  //   const [samePassword, setSamePassword] = useState(true);
//   const { updateUserName } = useContext(UserNameContext);

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  //   const togglePasswordVisibility = () => {
  //     setShowPassword(!showPassword);
  //   };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          username: credentials.username,
        },
        { withCredentials: true } // Include this in the request config
      );

      console.log(response);

      if (response.status === 200 && response.status < 300) {
        const json = response.data;

        if (json.success) {
          //   props.showAlert('Signup Success', 'success');
          setIsLoggedIn(true);
          //   updateUserName(json.user.name);
          navigate('/');
        }
      } else {
        props.showAlert('Something error occurred', 'danger');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        const json = error.response.data;
        console.log(json);
        // props.showAlert(json.error, 'danger');
      } else {
        // props.showAlert('Invalid Credentials', 'danger');
      }
      navigate('/signup');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleOauthLogin(e) {
    e.preventDefault();
    window.open(`${BASE_URL}/auth/google`, '_self');
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Username:
          <input
            name="username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={credentials.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={credentials.password}
            onChange={handleChange}
            name="password"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <button
        onClick={handleOauthLogin}
        className="btn btn-primary login-button btn-submit"
        type="submit"
      >
        Sign In With Google
      </button>
    </div>
  );
}
