'use strict';

angular.module('mouthlessApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('yc', {
        url: '/yc',
        templateUrl: 'app/yc/yc.html',
        controller: 'YcCtrl'
      });
  });