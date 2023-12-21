const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// Connecting to database
const query = 'mongodb://127.0.0.1:27017/AqcellorDb';

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
  console.log('connected to DB');
})
.catch((error) => {
  console.log("Error!" + error);
});

