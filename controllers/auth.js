const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../db.js').collection('Users');
const ensureAuthenticated = require('../middleware/ensureAuthenticated.js');
const bCrypt = require('bcrypt-nodejs');
var { ObjectId } = require('mongodb');

const getUser = async (req, res) => {
  const id = req.session.passport ? req.session.passport.user : null;
  // console.log(id);
  if (id) {
    const user = await User.findOne(new ObjectId(id));
    if (user) {
      const response = {
        isLoggedIn: true,
        name: user.name,
        username: user.username,
      };

      res.json(response);
    } else {
      res.json({ isLoggedIn: false });
    }
  } else {
    res.json({ isLoggedIn: false });
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
    res.cookie('userId', req.user._id);
    res.clearCookie('connect.sid');

    res.status(200).json({ message: 'Successfully logged out' });
  });
};

const googleLogin = 
   passport.authenticate('google', {
    scope: ['profile', 'email'],
  });


//auth google callback
const googleCallback = 
  passport.authenticate('google', {
    successRedirect: '/api/auth/login/success',
    failureRedirect: '/api/auth/login/failed',
  });

const successLogin = (req, res) => {
  let success = false;
  if (req.user) {
    // console.log("hello")
    // set the cookie set the user as authenticated
    res.cookie('email', req.user.email);
    res.cookie('username', req.user.username);
    res.cookie('userId', req.user._id);
    res.cookie('name', req.user.name);

    success = true;
    var userI = { name: req.user.name, email: req.user.email };

    // return res.status(200).json({ success: success, user: userI });

    // res.redirect(`http://192.168.0.103:3000`);
    res.redirect(`http://localhost:3000/`);
  } else {
    return res
      .status(401)
      .json({ success: success, message: 'Incorrect email or password' });
  }
  // res.redirect("/");
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  googleLogin,
  googleCallback,
  successLogin,
};
