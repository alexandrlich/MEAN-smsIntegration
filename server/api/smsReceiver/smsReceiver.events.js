/**
 * SmsReceiver model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var SmsReceiver = require('./smsReceiver.model');
var SmsReceiverEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SmsReceiverEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SmsReceiver.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SmsReceiverEvents.emit(event + ':' + doc._id, doc);
    SmsReceiverEvents.emit(event, doc);
  }
}

module.exports = SmsReceiverEvents;
