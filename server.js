var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var db = require('./dbfile')
var api = require('./api');
const flash = require('connect-flash');
const session = require('express-session');

const app = express()
app.use(flash());
app.set('view engine', 'ejs');
app.use(api)
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({  extended:true}))


.listen(6800);


console.log("Listening on PORT 6800 4th copy");
