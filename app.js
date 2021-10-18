var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors())
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;