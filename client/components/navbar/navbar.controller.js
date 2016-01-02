'use strict';

angular.module('mouthlessApp')
  .controller('NavbarCtrl', function ($scope) {
    $scope.menu = [{
      //'title': 'Home',
      //'state': 'main'
    }];

    $scope.isCollapsed = true;
  });
