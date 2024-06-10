const Router=require('express').Router;
const healthRoute=Router();
const ensureAuthenticated=require('../middleware/ensureAuthenticated');
const {getHealth, postHealth}=require('../controllers/health');

healthRoute.get('/',ensureAuthenticated, getHealth);
healthRoute.post('/',ensureAuthenticated,postHealth)

module.exports=healthRoute;