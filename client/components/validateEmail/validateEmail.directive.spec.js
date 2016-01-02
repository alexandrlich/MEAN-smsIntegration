'use strict';

describe('Directive: validateEmail', function () {

  // load the directive's module
  beforeEach(module('mouthlessApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validate-email></validate-email>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validateEmail directive');
  }));
});