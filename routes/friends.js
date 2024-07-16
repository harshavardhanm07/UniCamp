const express = require('express');
const Profile = express.Router();
const {getFriends,addFriend,deleteFriend,getAllUsers}=require('../controllers/friends.js');

Profile.get('/users',getAllUsers)
Profile.get('/:userId/friends',getFriends);
Profile.post('/:userId/friends',addFriend);
// Remove a friend
Profile.get('/:userId/friends/:friendId')
Profile.post('/:userId/friends/:friendId',deleteFriend);

module.exports= Profile;