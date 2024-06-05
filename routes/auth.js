const Router = require('express').Router;
const authRoute = Router();
const { signup,signin } = require('../controllers/users.js');

authRoute.post('/signup',signup);
authRoute.post('/signin',signin);

module.exports = authRoute;