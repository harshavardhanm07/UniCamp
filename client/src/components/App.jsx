// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Landing';
import Login from './Login';
import Signup from './Signup';
import AddAdditionalData from './AddAdditionalData';
import HealthForm from './HealthForm';
import { AuthProvider } from '../context/logincontext';
import { UsernameProvider } from '../context/usernamecontext';
import Profile from './Profile';
import BlogHome from './Blogs/BlogHome';
import BlogDetails from './Blogs/BlogDetails';
import BlogCreate from './Blogs/BlogCreate';
import Header from './Header';
import { Alert } from './Alert';

function App() {
  const [alert, setalert] = useState(null);
  function showAlert(message, type) {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <UsernameProvider>
            <Header />
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route exact path="/addHealthData" element={<HealthForm />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/profile/:username" element={<Profile />} />
              <Route
                exact
                path="/addAccountData"
                element={<AddAdditionalData showAlert={showAlert}/>}
              />
              {/* Blogs */}
              <Route exact path="/blogs" element={<BlogHome />} />
              <Route exact path="/blogs/blog/:id" element={<BlogDetails />} />
              <Route
                exact
                path="/blogs/blog/edit/:id"
                element={<BlogCreate />}
              />
              <Route exact path="/blogs/create" element={<BlogCreate />} />
            </Routes>
          </UsernameProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
