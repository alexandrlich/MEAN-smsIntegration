'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var smsReceiverCtrlStub = {
  index: 'smsReceiverCtrl.index',
  show: 'smsReceiverCtrl.show',
  create: 'smsReceiverCtrl.create',
  update: 'smsReceiverCtrl.update',
  destroy: 'smsReceiverCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var smsReceiverIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './smsReceiver.controller': smsReceiverCtrlStub
});

describe('SmsReceiver API Router:', function() {

  it('should return an express router instance', function() {
    smsReceiverIndex.should.equal(routerStub);
  });

  describe('GET /api/sms/reply', function() {

    it('should route to smsReceiver.controller.index', function() {
      routerStub.get
        .withArgs('/', 'smsReceiverCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/sms/reply/:id', function() {

    it('should route to smsReceiver.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'smsReceiverCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/sms/reply', function() {

    it('should route to smsReceiver.controller.create', function() {
      routerStub.post
        .withArgs('/', 'smsReceiverCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/sms/reply/:id', function() {

    it('should route to smsReceiver.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'smsReceiverCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sms/reply/:id', function() {

    it('should route to smsReceiver.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'smsReceiverCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sms/reply/:id', function() {

    it('should route to smsReceiver.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'smsReceiverCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
