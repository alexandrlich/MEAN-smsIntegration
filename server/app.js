/**
 * Main application file
 */

'use strict';

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';
import http from 'http';

//migrate
// dependencies
var logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport');


var debug = require('debug')('passport-mongo');
//    app = require('./app');


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { rootRequire('config/seed'); }

// user schema/model
var User = rootRequire('api/models/user.js');

// Setup server
var app = express();
var server = http.createServer(app);
rootRequire('config/express')(app);
//new
//	app.use(cookieParser());
	app.use(passport.initialize());
	app.use(passport.session());
	
rootRequire('routes')(app);
rootRequire('config/passport')(passport); 

var debug = require('debug')('passport-mongo');



// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    debug('Express server listening on port ' + server.address().port);
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}


//process old files

	// define middleware

	
/*
	app.use(express.static(path.join(__dirname, 'client')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(require('express-session')({
	    secret: 'keyboard cat',
	    resave: false,
	    saveUninitialized: false
	}));

	app.use(express.static(path.join(__dirname, 'public')));
	*/

	
	/*
	app.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname, '../client', 'index.html'));
	});
	
	
	// error hndlers
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});*/
	
	app.use(function(err, req, res) {
	  res.status(err.status || 500);
	  res.end(JSON.stringify({
	    message: err.message,
	    error: {}
	  }));
	});
//end of process old files

setImmediate(startServer);

// Expose app
exports = module.exports = app;
