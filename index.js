const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
const db  = require('./db.js');

// Now you can use getUserCollection
app.use(bodyParser.json());



app.get('/', async (req, res) => {


    const user = {
        name:'John Doe 2',
        email:'test@t.com',
        password:'123456',
        age: 25,
        mobile: 1234567890
};
        const result = await db.collection('Users').insertOne(user);
        res.send("done");
    
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

