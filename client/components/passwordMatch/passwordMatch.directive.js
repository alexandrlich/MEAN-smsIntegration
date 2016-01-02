'use strict';

angular.module('mouthlessApp')
  .directive('passwordMatch', function () {
    return {
      require: "ngModel",
        scope: {
            otherModelValue: "=passwordMatch"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.passwordMatch = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
  });
  
  
