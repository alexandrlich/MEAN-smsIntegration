'use strict';

angular.module('mouthlessApp')
  .controller('RegistrationSuccessCtrl', function ($scope,$stateParams,AuthService) {
    $scope.uid = $stateParams.uid;
    
    console.log('about to send a confirmation: ' + $scope.uid);
    //AuthService.sendConfirmationSMS($scope.uid);
      
    
    $scope.twitterShareSuccess = false;
    
   
   
   
   //put a delay
   twttr.ready(function (twttr) {
        twttr.events.bind('tweet', function (event) {
             AuthService.shareTwitter($scope.uid)
		        .then(function () {
		        	$scope.twitterShareSuccess  = true;
					$scope.$apply();
		        }).catch(function (e) {console.log('ttt');});
             
        });
        twttr.events.bind('follow', function(event) {
            var followed_user_id = event.data.user_id;
            var followed_screen_name = event.data.screen_name;
        });
 
        twttr.events.bind('retweet', function(event) {
            var retweeted_tweet_id = event.data.source_tweet_id;
        });
 
        twttr.events.bind('favorite', function(event) {
            var favorited_tweet_id = event.data.tweet_id;
        });
	}); 
  });
