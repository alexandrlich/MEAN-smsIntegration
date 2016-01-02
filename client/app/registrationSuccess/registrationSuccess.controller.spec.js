'use strict';

describe('Controller: RegistrationSuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('mouthlessApp'));

  var RegistrationSuccessCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationSuccessCtrl = $controller('RegistrationSuccessCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
