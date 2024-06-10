// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import HealthForm from './HealthForm';
import { AuthProvider } from '../context/logincontext';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
          {/* <Header /> */}
          {/* <Alert alert={alert} /> */}
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
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
              path="/health-form"
              element={<HealthForm />}
            />
          </Routes>
          
      </AuthProvider>
    </Router>
  </>
  );
}


export default App;