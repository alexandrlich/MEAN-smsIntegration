'use strict';

angular.module('mouthlessApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('resetSuccess', {
        url: '/resetSuccess',
        templateUrl: 'app/resetSuccess/resetSuccess.html',
        controller: 'ResetSuccessCtrl'
      });
  });