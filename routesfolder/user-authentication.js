const express = require('express');
// const nodemailer = require('nodemailer')
const session = require('express-session');
// const passport = require('passport');
// const Auth0Strategy = require('passport-auth0');
const { auth, requiresAuth } = require('express-openid-connect');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();
const Event = require('../models/Eventshema');
const Programme = require('../models/programmeshema');


const router = express.Router();


router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,                                                             // Configure Express session middleware
  saveUninitialized: true
}));
router.use(express.static('public'));


const config = {
    
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:6800',                                                 // Configure OpenID Connect
  clientID: '8IkrkxOlEsWrnUyzxDjSPL4JuY3je0r2',
  issuerBaseURL: 'https://dev-s2tf14fhzw2rynkq.us.auth0.com',

};

router.use(auth(config));

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/htmlfile.html'));
});

router.get('/logout', function(req, res) {
  res.redirect('/');
});


router.get('/dashboard', requiresAuth(), function(req, res) {
  res.redirect('/userlogin');
  let userProfile = req.oidc.user;
  res.render(filePath, { userProfile });
});


router.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/registration.html'));
});


// router.get('/userlogin', function(req, res) {
//   res.sendFile(path.join(__dirname, '../views/userdashbaord.ejs'));
// });

router.get('/signup-success', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/signupsuccess.html'));
});

router.get('/register-now', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/myhtml.html'));
});


router.get('/userlogin', async (req, res) => {
  try {
    const events = await Event.find({});
    const programmes = await Programme.find();

    res.render('userdashbaord', { events , programmes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); 


module.exports = router;


