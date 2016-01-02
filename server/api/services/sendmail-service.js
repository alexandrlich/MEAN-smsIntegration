'use strict';

var config = rootRequire('config/environment');
var sendgrid  = require('sendgrid')(config.sendgrid_api_key);


exports.sendEmailVerificationRequest = sendEmailVerificationRequest;
 
//https://www.npmjs.com/package/sendgrid
function sendEmailVerificationRequest( emailTo, uid ) {

	console.log("emailTo:" + emailTo + " uid:"+uid); 
		        
	var content = "click to verify your email address: https://mouthless.co/e/" + uid;	        
	
	var payload   = {
	  to      : emailTo,
	  from    : config.fromEmail,
	  subject : "Mouthless email verification",
	  text    : content
	}
	
	sendgrid.send(payload, function(err, json) {
	  if (err) { 
	    console.error("sendmail err:"+err); 
	  }
	  console.log("message " + json);
	});
	
};





