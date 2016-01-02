'use strict';

describe('Controller: ResetSuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('mouthlessApp'));

  var ResetSuccessCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResetSuccessCtrl = $controller('ResetSuccessCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
