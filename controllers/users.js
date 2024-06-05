const db = require("../db.js");
const bcrypt = require("bcrypt");

const signup = async (req,res)=>{
    const {name,email,password,age,mobile} = req.body;
    try {
        const existingUser = await db.collection("Users").findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exist!"});
        hashedPassword = await bcrypt.hash(password,12);
        const user = {
          name,
          email,
          password: hashedPassword,
          age,
          mobile,
        };
        const result = await db.collection("Users").insertOne(user);
        console.log("Successfully registered");
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong." });
    }
    
}

const signin = async (req, res) => {
  try {
    const { email,password } = req.body;
    const existingUser = await db.collection("Users").findOne({ email });
    if(!existingUser) return res.status(400).json({ message: "User doesn't exist!" });
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message:"Incorrect password"});
    console.log("Successfully Signed in");
    res.send(existingUser);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong." });
  }
};

module.exports = { signup,signin };