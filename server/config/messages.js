/**
 * Messages fot twilio reply
 */

'use strict';


function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("MESSAGE_INFO", 'Coming soon: \n - Drizly:alcohol type 🍷 to address \n - Uber: from address 🚘 to address \n - Venmo: dollar amount 💸 to phone number \n\n Other inputs: \n - Current Services/Inputs: 😶 \n - Contact Us:💬 message text');

define("MESSAGE_WELCOME_REGISTRATION", 'Welcome to Mouthless! Create your account here to get started: https://mouthless.co/s/');//+ obj._id

define("MESSAGE_RESET_PASS_LINK", 'In order to reset your password please use the following link: https://mouthless.co/r/');//+ obj._id

define("MESSAGE_FINISH_REGISTRATION", 'Please create an account to continue.');

define("MESSAGE_FEEDBACK_ACK", 'Thanks for getting in touch.');

