'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/mouthless-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  },
  twilioKey: 'AC4e4b33aad8b9571e72c0802ef2aea2bb',
  twilioSecret: 'Qw1234567.',
  twilioPhone:'+16466933348'

};
