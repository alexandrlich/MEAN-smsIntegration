/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

//confider removing
var _ = require('lodash');
var smsService = rootRequire( "api/services/sms-service" );
//var sendMailService = rootRequire( "api/services/sendmail-service" );

//var Thing = require('./thing.model');



var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = rootRequire('api/models/user.js');

exports.twitterShared = function(req, res) {
	console.log("shared uid: " + req.body.id);
	if(req.body.uid) {
		var query = {'_id':req.body.uid};
		var update = {$set: {twitterShared: true}};
		var options = {upsert:true};
		User.findOneAndUpdate(query, update, options, function(err, doc){
		    if (err) return res.send(500, { error: err });
		    return res.send("user account is succesfully updated");
		});
	}
};

//todo: make it get
exports.getPhone = function(req, res) {
	console.log("getPhone, uid: " + req.body.uid);
	User.findById(req.body.uid, function (err, user) {
		if (!user) { res.send(401, { error: err });return;}
		   
		res.send(user.local.phone);return;
	});
};



//TODO: add promises
exports.register = function(req, res) {
  passport.authenticate('local-signup'//, {
        //successRedirect : '/register/success', // redirect to the secure profile section
        //failureRedirect : '/register?emailExist=true', // redirect back to the signup page if there is an error
       // failureFlash : false // allow flash messages
    //}
    )(req, res, function () {
    
    console.log("after signup");
		    
	    if(req.user) {
		    //sendMailService.sendEmailVerificationRequest(req.user.email, req.user._id);
		    
		    
		    User.findById(req.user._id, function (err, user) {
			   if (!user) { console.log("user with such uid is not found"); return;}
			   if (user &&  user.smsConfirmationSent) { console.log("user with such uid already had acknowledgment"); return;}
			   
			   smsService.sendConfirmation(user.local.phone).then(function (result) {
				   console.log("user.local.phone} " + user.local.phone);
				   User.update({"local.phone": user.local.phone}, {"smsConfirmationSent":1}, {upsert: false},function (err){ if(err) console.log(err);});
			   },function (error) {
				   console.log("don't mark user as received the confirmation " + error);
				   User.update({"local.phone": user.local.phone}, {"smsConfirmationSent":-1,"smsDeliveryError":error}, {upsert: true},function (err){ if(err) console.log(err);});
			   });
			});
		    
		    
	    } else {
    		//bypass for empty user
    		return res.status(200).json({status: 'empty user'})
		}
    });
};

//TODO: fix passport to move logic to the strategy
exports.resetPassword = function(req, res) {
	User.findOne({ 'local.phone' :  req.body.phone, 'registered' : true }, function(err, user) {//TODO:check uid from FE
            // if there are any errors, return the error
            if (err) {
                	console.log("error1");
					return res.status(401).json({status: err})
				}
            // check to see if theres already a user with that email
            if (user) {            
            		var current = new Date();
            		if(user.resetRequestDate && (user.resetRequestDate.getTime()+3600000) > current.getTime()) {//request made 1 hour before
	                	//check token expiration
		                user.local.password = user.generateHash(req.body.password);
		                User.update({_id: user.id}, user, {upsert: true}, function(err) {
		                    if (err) {
		                        console.log("error2 " + err);
								throw err;
		                    }
		                    //console.log("successfully updated actual user");
		
			                smsService.sendResetConfirmation(user.local.phone).then(function (result) {
									return res.status(200).json({status: 'Reset successful!'})  
								},function (error) {
									console.log("coudn't send password reset ack " + error);	
									return res.status(200).json({status: 'Reset successful!'})			  
							});
		    
		                });
	                } else {
            			return res.status(401).json({status: "token expired"})
            		}
            	
            } else {
					return res.status(401).json({status: "user not found"})
            		
            }//user

        });  //User 



};


/*
exports.confirmationSMS = function(req, res) {
		User.findById(req.body.uid, function (err, user) {
		   if (!user) { console.log("user with such uid is not found"); return;}
		   if (user &&  user.smsConfirmationSent) { console.log("user with such uid already had acknowledgment"); return;}
		   
		   smsService.sendConfirmation(user.local.phone).then(function (result) {
			   console.log("user.local.phone} " + user.local.phone);
			   User.update({"local.phone": user.local.phone}, {"smsConfirmationSent":1}, {upsert: false},function (err){ if(err) console.log(err);});
		   },function (error) {
			   console.log("don't mark user as received the confirmation " + error);
			   User.update({"local.phone": user.local.phone}, {"smsConfirmationSent":-1,"smsDeliveryError":error}, {upsert: true},function (err){ if(err) console.log(err);});
		   });
		});
};
*/


exports.logout = function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
};





