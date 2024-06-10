// Login.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/logincontext';
// import { UserNameContext } from '../context/namecontext';
import BASE_URL from '../config';
import axios from 'axios';

export default function Login(props) {
  // console.log(props);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
//   const { updateUserName } = useContext(UserNameContext);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });



  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signin`,
        {
          username: credentials.username,
          password: credentials.password,
        },
        { withCredentials: true }
      );

      // console.log(response.status);

      if (response.status === 200 && response.status < 300) {
        const json = response.data;
        // console.log(json);
        if (json.success) {
        //   props.showAlert('Logged in Success', 'success');
          setIsLoggedIn(true);
        //   updateUserName(json.user.name);
          navigate('/');
        }
      }
    } catch (error) {
      // console.error(error);
      if (error.response && error.response.status === 401) {
        // props.showAlert('Invalid Credentials', 'danger');
        navigate('/login');
      } else if (error.response && error.response.status === 400) {
        const json = error.response.data;
        console.log(json);
        // props.showAlert(json.error, 'danger');
        navigate('/login');
      }
    }
  }
  async function handleGOauthLogin(e) {
    e.preventDefault();
    // updateUserName('');
    window.open(`${BASE_URL}/auth/google`, '_self');
    // Wait for Google OAuth process to complete

    // try {
    //       const response = await axios.get(`${BASE_URL}/auth/google/callback`);
    //       // console.log(response.status);
    //       if (response.status === 200 && response.status < 300) {
    //         const json = response.data;

    //         if (json.success) {
    //           props.showAlert('Logged in Success', 'success');
    //           setIsLoggedIn(true);
    //           navigate('/');
    //         }
    //       }
    //     } catch (error) {
    //       // console.error('Error:', error);
    //     }

  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" value={credentials.username} onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" value={credentials.password} onChange={handleChange} name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <button
              onClick={handleGOauthLogin}
              className="btn btn-primary login-button btn-submit"
              type="submit"
            >
              Sign In With Google
            </button>
    </div>
  );
}

