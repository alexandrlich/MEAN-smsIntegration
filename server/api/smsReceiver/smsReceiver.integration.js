'use strict';

var app = require('../..');
var request = require('supertest');

var newSmsReceiver;

describe('SmsReceiver API:', function() {

  describe('GET /api/sms/reply', function() {
    var smsReceivers;

    beforeEach(function(done) {
      request(app)
        .get('/api/sms/reply')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          smsReceivers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      smsReceivers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sms/reply', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sms/reply')
        .send({
          name: 'New SmsReceiver',
          info: 'This is the brand new smsReceiver!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSmsReceiver = res.body;
          done();
        });
    });

    it('should respond with the newly created smsReceiver', function() {
      newSmsReceiver.name.should.equal('New SmsReceiver');
      newSmsReceiver.info.should.equal('This is the brand new smsReceiver!!!');
    });

  });

  describe('GET /api/sms/reply/:id', function() {
    var smsReceiver;

    beforeEach(function(done) {
      request(app)
        .get('/api/sms/reply/' + newSmsReceiver._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          smsReceiver = res.body;
          done();
        });
    });

    afterEach(function() {
      smsReceiver = {};
    });

    it('should respond with the requested smsReceiver', function() {
      smsReceiver.name.should.equal('New SmsReceiver');
      smsReceiver.info.should.equal('This is the brand new smsReceiver!!!');
    });

  });

  describe('PUT /api/sms/reply/:id', function() {
    var updatedSmsReceiver

    beforeEach(function(done) {
      request(app)
        .put('/api/sms/reply/' + newSmsReceiver._id)
        .send({
          name: 'Updated SmsReceiver',
          info: 'This is the updated smsReceiver!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSmsReceiver = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSmsReceiver = {};
    });

    it('should respond with the updated smsReceiver', function() {
      updatedSmsReceiver.name.should.equal('Updated SmsReceiver');
      updatedSmsReceiver.info.should.equal('This is the updated smsReceiver!!!');
    });

  });

  describe('DELETE /api/sms/reply/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sms/reply/' + newSmsReceiver._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when smsReceiver does not exist', function(done) {
      request(app)
        .delete('/api/sms/reply/' + newSmsReceiver._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
