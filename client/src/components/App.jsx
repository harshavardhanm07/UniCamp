// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Landing';
import Login from './Login';
import Signup from './Signup';
import HealthForm from './HealthForm';
import { AuthProvider } from '../context/logincontext';
import Profile from './Profile';
function App() {
  return (
    <>
    <Router>
      <AuthProvider>
          {/* <Header /> */}
          {/* <Alert alert={alert} /> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={<Login />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup />}
            />
            <Route
              exact
              path="/addHealthData"
              element={<HealthForm />}
            />
             <Route
              exact
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
            exact
            path='/profile'
            element={<Profile />}
          />
          </Routes>
          
      </AuthProvider>
    </Router>
  </>
  );
}


export default App;