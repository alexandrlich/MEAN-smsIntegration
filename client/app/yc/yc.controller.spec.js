'use strict';

describe('Controller: YcCtrl', function () {

  // load the controller's module
  beforeEach(module('mouthlessApp'));

  var YcCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YcCtrl = $controller('YcCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
