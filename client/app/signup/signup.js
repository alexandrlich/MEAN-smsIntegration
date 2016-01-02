'use strict';

angular.module('mouthlessApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signinSignup', {
        url: '/s/:uid',
        templateUrl: 'app/signup/navigate.html',
        controller: 'NavigateCtrl'
      })
      .state('signup', {
        url: '/s2/:uid',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('reset', {
        url: '/r/:uid',
        templateUrl: 'app/signup/reset.html',
        controller: 'SignupCtrl'
      });
      
  });


