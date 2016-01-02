'use strict';

var express = require('express');
var controller = require('./register.controller');
var router = express.Router();

router.post('/', controller.register);
router.post('/resetPassword', controller.resetPassword);
router.post('/phone', controller.getPhone);
router.post('/twitter/shared', controller.twitterShared);
//router.post('/confirmationSMS', controller.confirmationSMS);


module.exports = router;
