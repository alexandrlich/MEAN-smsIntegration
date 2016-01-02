// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;//,
    //passportLocalMongoose = require('passport-local-mongoose');

/*
var User = new Schema({
  username: String,
  password: String,
  email: String
});*/

//User.plugin(passportLocalMongoose);


//module.exports = mongoose.model('users', User);


//!!!

// app/models/user.js
// load the things we need
//var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        phone        : String,
        password     : String
    },
    email		 : String,
    twitterShared: Boolean,
    smsConfirmationSent: Number, //1: delivered, 0: not delivered, -1: failed and will not be retried
    smsDeliveryError: String,
    registered: Boolean, //first we send it to the phone user to signup and provide email + password
	resetRequestDate:Date
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

