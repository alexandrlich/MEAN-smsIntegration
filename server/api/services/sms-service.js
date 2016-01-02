'use strict';

var Q = require( "q" );

exports.sendConfirmation = sendConfirmation;
exports.sendResetConfirmation = sendResetConfirmation;

	var config = rootRequire('config/environment');
	var client = require('twilio')(config.twilioKey, config.twilioSecret);
	
function sendResetConfirmation(phonenumber) {
	console.log("phonenumber: " + phonenumber); 

		        
		var phone = require('phone');
		var normalizedPhone = phone(phonenumber);//npm module retults [plainPhone, country]
		console.log('normalizedPhone ' + normalizedPhone[0] +  " country: " + normalizedPhone[1]);
		var deferred = Q.defer()

		
		var promise = client.sendMessage({
		    to: normalizedPhone[0], 
		    from: config.twilioPhone, 
		    body: 'Your password has been changed successfully! If you did not change you password - emails us at contact@mouthless.co immediately.'  //move to separate file
		
		}, function(err, responseData) { //this function is executed when a response is received from Twilio
		
		    if (!err) { 
				console.log("sent to: " + responseData.to); // outputs "+14506667788"
		        console.log("sent text: " + responseData.body); // outputs "word to your mother."
			} else {
			    console.log('sms delivery status: ' + err.status);
			    console.log('sms delivery message: ' + err.message);
			    deferred.reject(err.message)
		    }
		});

	return (deferred.promise );

};

//send sms text message
function sendConfirmation( phonenumber, message ) {
		console.log("phonenumber: " + phonenumber); 
        
		var phone = require('phone');
		var normalizedPhone = phone(phonenumber);//npm module retults [plainPhone, country]
		console.log('normalizedPhone ' + normalizedPhone[0] +  " country: " + normalizedPhone[1]);
		var deferred = Q.defer()
		//if(normalizedPhone[1] !=="USA") {
		//	deferred.reject("invalid phone number: " + phonenumber);
		//}
		
		
		var promise = client.sendMessage({
		    to: normalizedPhone[0], 
		    from: config.twilioPhone, 
		    body: 'Your account has been created successfully! We’ll send you a heads-up when service rolls out to your area.'  //move to separate file
		
		}, function(err, responseData) { //this function is executed when a response is received from Twilio
		
		    if (!err) { 
				console.log("sent to: " + responseData.to); // outputs "+14506667788"
		        console.log("sent text: " + responseData.body); // outputs "word to your mother."
				//second message

				var promise = client.sendMessage({
			    to: normalizedPhone[0], 
			    from: config.twilioPhone, 
			    body: "In the meantime, we’d love to hear what excites you most about Mouthless, as well as any questions, comments or feedback you might have. Do this anytime, by sending us a 💬 followed by message text (e.g., '💬I’m super excited about…'), and we'll get back to you ASAP"  //move to separate file
				}, function(err, responseData) {
					if (!err) {
						deferred.resolve();
					} else {
					    deferred.reject(err.message)
				    }
				});
				//end of second message
				//deferred.resolve();
		    } else {
			    console.log('sms delivery status: ' + err.status);
			    console.log('sms delivery message: ' + err.message);
			    deferred.reject(err.message)
		    }
		});

	return (deferred.promise );
	
};






