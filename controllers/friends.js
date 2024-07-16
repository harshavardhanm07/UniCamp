const { ObjectId } = require('mongodb');
const Health=require('../db').collection('Health');
const User=require('../db').collection('Users');

// Fetch all friends of a user
const getAllUsers=async (req,res)=>{
  try{
    const users = await User.find({}, { projection: { name: 1,username:1} }).toArray();
  console.log(users);
  return res.status(200).json(users);
  }catch(err){
    console.error(err);
    return res.status(500).json({message:'Error fetching users'})
  }
}
const getFriends= async (req, res) => {
  try {
    const user = await User.findOne({ _id: new ObjectId(req.params.userId) });
    if (!user) return res.status(404).json({ message: 'User not found' });


    const healthDocuments = await Health.find(
        { user: new ObjectId(req.params.userId) }, 
        { projection: { friends: 1 } } 
      ).toArray();
  

      res.json(healthDocuments[0].friends);


    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
const addFriend = async (req, res) => {
    try {
      const { friendId } = req.body;
      console.log(friendId);
      const user = await User.findOne({ _id: new ObjectId(req.params.userId) });
  
      // Check if user exists
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const healthDocuments = await Health.find(
        { user: new ObjectId(req.params.userId) }, 
        { projection: { friends: 1 } } 
      ).toArray();
     const friends= healthDocuments[0].friends;
      // Check if the user already has 3 friends
      if (friends && friends.length >= 3) {
        return res.status(400).json({ message: 'Cannot add more than 3 friends' });
      }
  
      const updateResult = await Health.updateOne(
        { user: new ObjectId(req.params.userId) },
        { $addToSet: { friends: new ObjectId(friendId) } } // Use $addToSet to avoid duplicates
      );
  
      if (updateResult.modifiedCount === 0) {
        res.status(400).json({ message: 'Friend already added or user not found' });
      } else {
        res.status(201).json({ message: 'Friend added successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const deleteFriend=async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    if(userId === friendId) {
      return res.status(400).json({ message: 'You cannot remove yourself' });
    }
    if(userId!==req.user._id){
        return res.status(400).json({ message: 'You cannot remove other users' });
        }
    const updateResult = Health.updateOne(
      { user: new ObjectId(userId) },
      { $pull: { friends: new ObjectId(friendId) } } 
    );

    if (updateResult.modifiedCount === 0) {
      res.status(400).json({ message: 'Friend not found or user not found' });
    } else {
      res.status(200).json({ message: 'Friend removed successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getFriends,addFriend,deleteFriend,getAllUsers};