const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();
const db  = require('./db.js');

app.use(bodyParser.urlencoded({ extended: true })); 

const authRoute=require('./routes/auth');
app.use('/api/auth', authRoute);

app.get('/', async (req, res) => {

        res.send("welcome");
    
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


// To do:
// home
// login
// register

// profile
// logout
// update profile
// delete profile

