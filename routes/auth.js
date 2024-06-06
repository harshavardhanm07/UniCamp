const Router = require('express').Router;
const authRoute = Router();
const { signup,login,logout,getUser, googleLogin, googleCallback, successLogin
} = require('../controllers/auth.js');

authRoute.post('/signup',signup);
authRoute.post('/signin',login);
authRoute.post('/logout',logout);
authRoute.get('/user',getUser);
authRoute.get('/google',googleLogin);
authRoute.get('/google/callback',googleCallback);
authRoute.get('/login/success',successLogin);

module.exports = authRoute;

// http://localhost:5000/api/auth/google