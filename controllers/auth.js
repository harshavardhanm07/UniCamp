const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../db.js').collection('Users');
const ensureAuthenticated = require('../middleware/ensureAuthenticated.js');
const bCrypt = require('bcrypt-nodejs');
var { ObjectId } = require('mongodb');
const Health = require('../db.js').collection('Health');

const getUser = async (req, res) => {
  const id = req.session.passport ? req.session.passport.user : null;
  // console.log(id);
  if (id) {
    const user = await User.findOne(new ObjectId(id));
    if (user) {
      const response = {
        isLoggedIn: true,
        name: user.name,
        username: user.username == undefined ? null : user.username,
      };

      res.status(200).json(response);
    } else {
      res.status(401).json({ isLoggedIn: false });
    }
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
};

//local auth signup
const signup = (req, res, next) => {
  let success = false;
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      console.log('not a user');
      return res
        .status(401)
        .json({ success: success, message: 'Incorrect username or password' });
    }

    req.login(user, (err) => {
      if (err) {
        console.log('auth error');
        return next(err);
      }
      success = true;
      res.cookie('name', req.user.name);
      res.cookie('username', req.body.username);
      res.cookie('email', req.user.email);
      res.cookie('userId', req.user._id);
      // console.log('confirm');

      const user = { name: req.user.name, username: req.user.username };
      return res.status(200).json({ success: success, user: user });
    });
  })(req, res, next);
};

//local auth sign in
const login = (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => {
    let success = false;
    if (err) {
      return next(err);
    }

    if (!user) {
      // console.log('not a user');
      return res
        .status(401)
        .json({ success: success, message: 'Incorrect username or password' });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      // console.log(user);

      res.cookie('name', user.name);
      res.cookie('email', user.email);
      res.cookie('username', user.username);
      res.cookie('userId', req.user._id);

      success = true;
      var resUser = { name: user.name, username: user.username };

      return res.status(200).json({ success: success, user: resUser });
    });
  })(req, res, next);
};

const logout = function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.clearCookie('name');
    res.clearCookie('email');
    res.clearCookie('username');
    res.clearCookie('userId');
    res.clearCookie('connect.sid');

    res.status(200).json({ message: 'Successfully logged out' });
  });
};

const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

//auth google callback
const googleCallback = passport.authenticate('google', {
  successRedirect: '/api/auth/login/success',
  failureRedirect: '/api/auth/login/failed',
});

const successLogin = async (req, res) => {
  try {
    if (req.user) {
      // console.log("hello")
      // set the cookie set the user as authenticated
      res.cookie('email', req.user.email);
      res.cookie('username', req.user.username);
      res.cookie('userId', req.user._id);
      res.cookie('name', req.user.name);

      // var userI = { name: req.user.name, email: req.user.email };

      // return res.status(200).json({ success: success, user: userI });

      // res.redirect(`http://192.168.0.103:3000`);
      const healthData = await Health.findOne({ user: req.user._id });
      const user = await User.findOne({ _id: req.user._id });
      console.log(healthData);
      if (!user.username) {
        return res.redirect(`http://localhost:3000/addAccountData`);
      }
      if (!healthData) {
        return res.redirect(`http://localhost:3000/addHealthData`);
      }

      return res.redirect(`http://localhost:3000/dashboard`);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you store the user's ID in req.user
    const updateFields = req.body; // This can include any number of fields to update

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Construct the update object dynamically based on provided fields
    const updateObject = {};
    for (const [key, value] of Object.entries(updateFields)) {
      if (value != null) {
        // Ensure null values are not included in the update
        updateObject[key] = value;
      }
    }

    const result = await User.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateObject }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.cookie('name', req.user.name);
    res.cookie('email', req.user.email);
    res.cookie('username', req.user.username);
    res.cookie('userId', req.user._id);

    var resUser = { name: req.user.name, username: req.user.username };

    return res.status(200).json({ user: resUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  googleLogin,
  googleCallback,
  successLogin,
  updateUser,
};
