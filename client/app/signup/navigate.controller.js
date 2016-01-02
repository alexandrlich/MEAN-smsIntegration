'use strict';
//sign up, reset password
angular.module('mouthlessApp')
  .controller('NavigateCtrl', //["AuthService",
  function ($scope, $location, $state,$http, $stateParams, AuthService) {
    console.log("uid: " + $stateParams.uid);



$scope.signIn = function() {
    $state.go("signin", {'uid':$stateParams.uid});
  };

$scope.signUp = function() {
    $state.go("signup", {'uid':$stateParams.uid});
  };
   
          		
	    

  }
  //]
  );

