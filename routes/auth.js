const Router = require('express').Router;
const authRoute = Router();

const db  = require('../db.js');

authRoute.get('/login', async (req,res)=>{

    res.send("login");
});

authRoute.get('/signup', async (req,res)=>{
    res.send("register");
});

authRoute.post('/signup', async (req,res)=>{

console.log(req.body);
    const user = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        age: req.body.age,
        mobile: req.body.mobile
};
        const result = await db.collection('Users').insertOne(user);

        res.send(result);
});


exports = module.exports = authRoute;