

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = rootRequire('api/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    /*
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });        
    });*/
    passport.deserializeUser(function( user, done ) {
    	done( null, user );
	});

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'phone',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, phone, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.phone' :  phone }, function(err, user) {//TODO:check uid from FE
            // if there are any errors, return the error
            if (err) {
                	console.log("error1");
					return done(err);
				}
            // check to see if theres already a user with that email
            if (user) {
            
            	if(user.registered) {
            		console.log('phone exist');
            		//return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            		return done(null, false);
            	} else {
            	
            		//if(phone == user.phone) //TODO this check
	                user.local.password = user.generateHash(password);
	                user.email = req.body.email;
	                user.twitterShared = false;
	                user.smsConfirmationSent = 0;
	                user.registered = true;
	                
	                User.update({_id: user.id}, user, {upsert: true}, function(err) {
	                    if (err) {
	                        console.log("error2 " + err);
							throw err;
	                    }
	                    console.log("successfully created actual user");
	
		                    return done(null, user);
	                });
	                
	           }
            	
            } else {
				return done(null, false);//no record indicating that we sent you invite to your phone!
            }//user

        });  //User  

        });//process

    }));//passport
    
    
};