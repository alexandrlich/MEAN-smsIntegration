'use strict';

angular.module('mouthlessApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
       .state('faq', {
        url: '/faq',
        templateUrl: 'app/main/faq.html'
      })
        .state('why', {
        url: '/why',
        templateUrl: 'app/main/why.html'
      })
       .state('terms', {
        url: '/terms',
        templateUrl: 'app/main/terms.html'
      })
       .state('privacy', {
        url: '/privacy',
        templateUrl: 'app/main/privacy.html'
      });


  });
