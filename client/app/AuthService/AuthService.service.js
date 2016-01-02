'use strict';

angular.module('mouthlessApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
    }

    function getUserStatus() {
      return user;
    }

  

//move to a separate service
    function shareTwitter(uid) {
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/api/register/twitter/shared', {uid: email})
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        //.error(function (data) {
        //  console.log(data);
        //  deferred.reject();
        //});
         .error(function (data, status) {
          if(status === 401){
          	 deferred.resolve("test222");//pass as validation message
          }
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

   
    function register(phone, password,email) {

      // create a new instance of deferred
      var deferred = $q.defer();
	  // send a post request to the server
      $http.post('/api/register', {phone: phone, password: password, email: email})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){            
            deferred.resolve();
          } else {
            console.log("status1 " +status);
			console.log("status2 " +data.status);
			deferred.reject();
          }
        })
        // handle error
        .error(function (data, status) {
          if(status === 401){
          	 deferred.resolve("no able to associate User's phone number");//pass as validation message
          }
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }


    function reset(phone, password,email) {

      // create a new instance of deferred
      var deferred = $q.defer();
	  // send a post request to the server
      $http.post('/api/register/resetPassword', {phone: phone, password: password, email: email})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){            
            deferred.resolve();
          } else {
            console.log("status1 " +status);
			console.log("status2 " +data.status);
			deferred.reject();
          }
        })
        // handle error
        .error(function (data, status) {
          if(status === 401){
          	 deferred.resolve("no able to associate User's phone number");//pass as validation message
          }
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    
   /*
 function sendConfirmationSMS (uid) {

      // create a new instance of deferred
      var deferred = $q.defer();
	  // send a post request to the server
      $http.post('/api/register/confirmationSMS', {uid: uid})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){            
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data, status) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }    
*/
    
    
    
    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      register: register,
      reset: reset,
      shareTwitter: shareTwitter,
    //  sendConfirmationSMS: sendConfirmationSMS
    });    

}]);  
