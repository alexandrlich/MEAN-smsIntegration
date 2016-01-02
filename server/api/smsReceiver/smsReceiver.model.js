'use strict';

//var mongoose = require('bluebird').promisifyAll(require('mongoose'));
//var Schema = mongoose.Schema;

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;//,

var SmsReceiverSchema = new Schema({
  mSid: String,//messageSId
  sSid: String,//smsSid
  aSid: String, //AccountSid
  text: String, //body
  nMedia: String, //NumMedia
  phone: String,
  zip: String, //FromZip
  city: String, //FromCity
  state: String, //FromState
  country: String //FromCountry
  

});

module.exports = mongoose.model('SmsReceiver', SmsReceiverSchema);
