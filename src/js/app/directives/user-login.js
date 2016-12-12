angular.module('cocodas').directive('userLogin',userLoginDirectiveConfig);
function userLoginDirectiveConfig(){
  return {
    restrict:'AE',
    templateUrl:'template/user-login.template.html',
    link: function postLink(scope, element, attrs) {

    },
    controller:['$scope','$log','$rootScope','$state','Idle','authenticateService',userCtrl]
  };
}

function userCtrl($scope,$log,$rootScope,$state,Idle,authenticateService){
  $log.info('userLoginCtrl');
  // https://thinkster.io/angularjs-jwt-auth
  $scope.login = function(loginDetail){
      authenticateService.authenticate(loginDetail.username,loginDetail.password,function(result){
        if (result === true) {
            Idle.watch();
            $state.go('home');
        } else {
            vm.error = 'Username or password is incorrect';
            alert(vm.error);
        }
      });
  };
  $scope.register = function(username,password){

  };

}
