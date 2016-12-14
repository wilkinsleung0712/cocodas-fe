angular.module('cocodas').directive('userRegister',userRegisterDirectiveConfig);
function userRegisterDirectiveConfig(){
  return {
    restrict:'AE',
    templateUrl:'template/user-register.template.html',
    link: function postLink(scope, element, attrs) {

    },
    controller:['$scope','$log','$state','authenticateService',userRegisterCtrl]
  };
}

function userRegisterCtrl($scope,$log,$state,authenticateService){
  $log.warn('userRegisterCtrl');
  $scope.register = function (userRegisterDetail) {
    authenticateService.register(userRegisterDetail).then(function(response){
      alert('Register Successful');
      $state.go('home');
    },function(errorResponse){
      alert('Register failed');
    });
  }
}
