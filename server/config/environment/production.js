'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL +
            process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/mouthless'
  },
  
  sendgrid_api_key: "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",
  fromEmail: 'no-reply@mouthless.co',
  
  
  twilioKey: 'AC705c044d3c343375dcfe34a69724d646',
  twilioSecret: '1174cc74b790c478086b9c3e5e41ab6e',
  twilioPhone:'+16466933348'
};
