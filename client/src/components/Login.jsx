import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/logincontext';
import BASE_URL from '../config';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

export default function Login(props) {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

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

      if (response.status === 200 && response.data.success) {
        setIsLoggedIn(true);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 400) {
        console.log(error.response.data);
        navigate('/login');
      }
    }
  }

  async function handleGOauthLogin(e) {
    e.preventDefault();
    window.open(`${BASE_URL}/auth/google`, '_self');
  }

  return (
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Username:
    //       <input name="username" type="text" value={credentials.username} onChange={handleChange} />
    //     </label>

    //     <label>
    //       Password:
    //       <input type="password" value={credentials.password} onChange={handleChange} name="password" />
    //     </label>
    //     <input type="submit" value="Submit" />
    //   </form>

    //   <button onClick={handleGOauthLogin} className="btn btn-primary login-button btn-submit" type="submit">
    //     Sign In With Google
    //   </button>
    // </div>
    <div className=" flex-grow items-center p-28">
      <form
        className="flex flex-col max-w-md gap-4 mx-auto mt-8 p-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <h1 className="text-4xl">Login</h1>
        </div>
        <div>
          <Label
            htmlFor="username"
            className="mb-2 block"
            value="username"
            name="username"
          />
          <TextInput
            id="username"
            type="text"
            required
            className="w-full"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label
            htmlFor="password1"
            className="mb-2 block"
            value="password"
            name="password"
          />
          <TextInput
            id="password1"
            type="password"
            required
            className="w-full"
            onChange={handleChange}
            name="password"
          />
        </div>

        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
        <Button
          onClick={handleGOauthLogin}
          className="btn btn-primary login-button btn-submit mt-4 w-full"
          type="submit"
        >
          Sign In With Google
        </Button>
      </form>
    </div>
  );
}
