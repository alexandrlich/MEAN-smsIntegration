'use strict';

angular.module('mouthlessApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('registrationSuccess', {
        url: '/registrationSuccess/:uid',
        templateUrl: 'app/registrationSuccess/registrationSuccess.html',
        controller: 'RegistrationSuccessCtrl'
      });
  });
