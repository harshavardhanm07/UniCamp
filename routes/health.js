const Router=require('express').Router;
const healthRoute=Router();
const ensureAuthenticated=require('../middleware/ensureAuthenticated');
const {getHealth, postHealth,updatehHealth}=require('../controllers/health');

healthRoute.get('/:username',ensureAuthenticated, getHealth);
healthRoute.post('/:username',ensureAuthenticated,postHealth)
healthRoute.put('/:username',ensureAuthenticated,updatehHealth);

module.exports=healthRoute;