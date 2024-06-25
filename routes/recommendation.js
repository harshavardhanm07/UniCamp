const Router = require('express').Router;
const recommendationRoute = Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const { getResponse } = require('../controllers/recommendation.js');

recommendationRoute.get('/', ensureAuthenticated,getResponse);
module.exports=recommendationRoute;