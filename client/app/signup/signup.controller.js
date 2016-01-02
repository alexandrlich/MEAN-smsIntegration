'use strict';
//sign up, reset password
angular.module('mouthlessApp')
  .controller('SignupCtrl', //["AuthService",
  function ($scope, $location, $state,$http, $stateParams, AuthService) {
    console.log("uid: " + $stateParams.uid);

    $scope.registerObj = {
    	phone:"",
    	visiblePhone:"",
    	email:"",
    	password:"",
    	password2:""

    }

    $http.post('/api/register/phone',{//todo: make it GET
        //params: {
            uid: $stateParams.uid
        //}
     }).success(function (data,status) {
     		if(status) {
     			$scope.registerObj.phone = data;
	 			formatPhone(data);
     		}
     });


    //if 11digits and starts with +1 -ignore it.
    function formatPhone(data) {
	    if( (data.length==12) && (data.substring(0, 2) == "+1")) {
	     		$scope.registerObj.visiblePhone = data.replace(/\+1(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
		} else {
		 		$scope.registerObj.visiblePhone = data;
        }
    }


     function resetForm() {
	     $scope.error = true;
          $scope.disabled = false;
          if(!$scope.form.password.$valid) {
	         $scope.errorMessage = 'Password is invalid';
          }

     }
     function resetEmail() {
	     if(!$scope.form.email.$valid) {
	          $scope.errorMessage = 'Email is invalid';
         }
     }

     function resetPassword() {
	     if(!$scope.form.password2.$valid) {
	          $scope.errorMessage = 'Password fields do not match';
         }
     }



    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      if(!$scope.form.$valid) {//for safari https://github.com/angular/angular.js/issues/3205
		  resetForm();
		  resetEmail();
		  return;
	  }
      //TODO: add phone & password validation on client side

      // call register from service
      AuthService.register($scope.registerObj.phone, $scope.registerObj.password,$scope.registerObj.email)
        // handle success
        .then(function (value) {


          //$location.path('/login');
          //$location.path('/register/success');
          //$location.path('/register/success').search({message: value});
          if(value) {
          		   $scope.errorMessage = 'You have been registered already';
          		   resetForm();
          		   resetEmail();
          } else {
          		$state.go("registrationSuccess", {'uid':$stateParams.uid});//TODO: create site error page
	      }
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function (e) {
        	console.log("got an error in initial processing",e);
			resetForm();
			resetEmail();
        });

    };

	$scope.resetPassword = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      if(!$scope.form.$valid) {//for safari https://github.com/angular/angular.js/issues/3205
		  resetForm();
		  resetPassword();
		  return;
	  }
      //TODO: add phone & password validation on client side
	  //TODO: check passwords are equal
      // call register from service
      AuthService.reset($scope.registerObj.phone, $scope.registerObj.password,$scope.registerObj.email)
        // handle success
        .then(function (value) {

          if(value) {
          		$scope.errorMessage = 'You reset requst has expired or registration is not completed yet. Finish the registration or send "RESET" request again';
		  		resetForm();
          } else {
          		$state.go("resetSuccess");
	      }
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function (e) {
        	console.log("got an error in initial processing",e);
			resetForm();
			resetPassword();

        });

    };




  }
  //]
  );

