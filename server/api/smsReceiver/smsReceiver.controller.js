/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sms/reply              ->  index
 * POST    /api/sms/reply              ->  create
 * GET     /api/sms/reply/:id          ->  show
 * PUT     /api/sms/reply/:id          ->  update
 * DELETE  /api/sms/reply/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var SmsReceiver = require('./smsReceiver.model');

var User            = rootRequire('api/models/user');

var const_messages = rootRequire('config/messages');



function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of SmsReceivers
exports.index = function(req, res) {
  SmsReceiver.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single SmsReceiver from the DB
exports.show = function(req, res) {
  SmsReceiver.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};


// Creates a new SmsReceiver in the DB
/*
	{"ToCountry":"US","ToState":"NY","SmsMessageSid":"SM841e5d6e16fc9948bfc847914f817875","NumMedia":"0","ToCity":"FLORAL PARK","FromZip":"11435","SmsSid":"SM841e5d6e16fc9948bfc847914f817875","FromState":"NY","SmsStatus":"received","FromCity":"SOUTH RICHMOND HILL","Body":"Hello","FromCountry":"US","To":"+15168304260","ToZip":"11426","NumSegments":"1","MessageSid":"SM841e5d6e16fc9948bfc847914f817875","AccountSid":"AC705c044d3c343375dcfe34a69724d646","From":"+19175158629","ApiVersion":"2010-04-01"}

*/
exports.twilioReceiver = function(req, res) {
	//console.log("message from twilio received " + req.params.Body);
	//console.log("message from twilio received2 " + req.body.Body);
	//console.log(JSON.stringify(req.body));
	var config = rootRequire('config/environment');
	var twilio = require('twilio');
	
	if (twilio.validateExpressRequest(req, config.twilioSecret)) {
    //    console.log("you ARE not twilio.  Welcome");
        
    }
    else {
      //  console.log("you are not twilio.  Buzz off");//TODO:check why it's not validating it properly
    }
	
	
	var message = new SmsReceiver({
	  mSid: req.body.SmsMessageSid,//messageSId
	  sSid: req.body.SmsSid,//smsSid
	  aSid: req.body.AccountSid, //AccountSid
	  text: req.body.Body,
	  nMedia: req.body.NumMedia, //NumMedia
	  phone: req.body.From, //From
	  zip: req.body.FromZip, //From
	  city: req.body.FromCity, //FromCity
	  state: req.body.FromState, //FromState
	  country: req.body.FromCountry //FromCountry
	});
	
	
	message.save(function(err, obj) {//save received message
	  if (err) console.log(err);
	  
	  
	  messagesProcessor(obj, res);
	
	});
	

};

/*
	Save new user in db and send an invitation to register
*/
function saveUserAndReply(message,res) {
		console.log("newUserReply");
		var newUser            = new User();
			newUser.local.phone    = message.phone;
            newUser.registered = false;
            newUser.save(function(err, obj) {
               if (err) {
                   console.log("error saving a new user in db");
				   throw err;
               }
               sendReply(res, const_messages.MESSAGE_WELCOME_REGISTRATION + obj._id);
			   
			});

}


function resetPassword(user,res) {
	var current = new Date();
	user.resetRequestDate = current;
	User.update({_id: user.id}, user, {upsert: true}, function(err) {
		if (err) {
			console.log("error2 " + err);//tmp
			throw err;
		}
		console.log("successfully updated actual user");
		sendReply(res,const_messages.MESSAGE_RESET_PASS_LINK +  user._id);
	});	
	
	
}


function messagesProcessor(message, res) {
	
	if(message && message.text) {
	
		User.findOne({'local.phone':message.phone}, function(err, user) {//check if we already have this phone in db
			  if (err) throw err;
			  if (!user) { //new phone
			  	//if(message.text.toUpperCase() === "HELLO") {
				  	console.log('register a new user');
				  	saveUserAndReply(message,res);
				//} else {
				//	sendReply(res,"Welcome to Mouthless! To create an account please type 'HELLO'.");
				//}
			  } else if(!user.registered) {
					sendReply(res,const_messages.MESSAGE_FINISH_REGISTRATION);			  
			  }
			  
			  //TODO: create switch for various commands to be processed
			  
			  //use case, feedback
			  if(message.text.substring(0, 2) === '💬') {
				  sendReply(res,const_messages.MESSAGE_FEEDBACK_ACK);
			  } else if(message.text.substring(0, 2) === '😶') {
				  sendReply(res,const_messages.MESSAGE_INFO);
			  } else if(message.text.toUpperCase() === "RESET") {
			  	resetPassword(user, res);			  	  
			  }	
			  //end of possible list of commands
			  
			  console.log("your request is received, your accound is registered and active: "+ message.text);
			 
			});
		
	} else {
		console.log("problem with reading reponse from the hook:"  + JSON.stringify(message));
	}
}

//send reply back to where it came from
function sendReply(res, msg) {
	var twilio = require('twilio');
	
	var twiml = new twilio.TwimlResponse();

    twiml.message(msg);
    
	res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(twiml.toString());
}

 // SmsReceiver.createAsync(req.body)
 //   .then(responseWithResult(res, 201))
 //   .catch(handleError(res));
	
	//console.log("sid: " +  req.body.MessageSid);
    
    	
	
	
    


// Updates an existing SmsReceiver in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  SmsReceiver.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a SmsReceiver from the DB
exports.destroy = function(req, res) {
  SmsReceiver.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
