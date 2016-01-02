'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/mouthless-dev'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  seedDB: true,
  		
  twilioKey: 'AC4e4b33aad8b9571e72c0802ef2aea2bb',
  twilioSecret: 'Qw1234567.',
  twilioPhone:'+16466933348'
};
