angular.module('cocodas').directive('idle',idleDirectiveConfig);

function idleDirectiveConfig(){
  return {
    restrict:'AE',
    // replace:true,
    // templateUrl:'template/add-topic.template.html',
    controller:['$scope','$log','Idle','$uibModal','$cookies','$state',idleCtrl],
    link: function(scope, el, attrs) {
    // scope.$watch('selectedTopic', function(newVal) {
    //     if(newVal) { el.text(scope.product.name);}
    // }, true);
    }
  };
}

function idleCtrl($scope,$log,Idle,$uibModal,$cookies,$state){
  $log.info('idleCtrl');
  $log.debug($cookies);
  if($cookies.get('currentUserToken')){
    Idle.watch();
  }

  function closeModals() {
       if ($scope.warning) {
         $scope.warning.close();
         $scope.warning = null;
       }

       if ($scope.timedout) {
         $cookies.remove('currentUserToken');
         $cookies.remove('currentUserName');
         $scope.timedout.close();
         $scope.timedout = null;
       }
   }

   function closeModalsByTimeout(){
     if ($scope.warning) {
       $scope.warning.close();
       $scope.warning = null;
     }

     if ($scope.timedout) {
       $cookies.remove('currentUserToken');
       $cookies.remove('currentUserName');
       $scope.timedout.close();
       $scope.timedout = null;
     }
     
     $cookies.remove('currentUserToken');
     $cookies.remove('currentUserName');
     Idle.unwatch();
     $state.go('userLogin');
   }

    // Idle is used to watch for user events to bubble up to document.body.
    // Once you start watching for idleness, a timeout will start. If that timeout expires,
    // it will broadcast the IdleStart event on the root scope enter the warning phase. During the warning phase,
    // the IdleWarn event will be broadcast every second, counting down to zero. When the countdown hits zero,
    // the IdleTimeout event is broadcast, indicating the user's session has expired. If at any time the user triggers a watched event,
    // it will reset the idle and warning timeouts and states and broadcast the IdleEnd event on the root scope.
    //  If the user keeps clicking, scrolling, etc. within the idle duration, they can ostensibly stay logged in forever.
     $scope.$on('IdleStart', function() {
       console.info('IdleStart');
       closeModals();

       $scope.warning = $uibModal.open({
         templateUrl: 'template/dialog/warning-dialog.html',
         windowClass: 'modal-danger'
       });
     });

     $scope.$on('IdleEnd', function() {
       console.info('IdleEnd');
       closeModals();
     });

     $scope.$on('IdleTimeout', function() {
       console.info('IdleTimeout');
       closeModalsByTimeout();
       $scope.timedout = $uibModal.open({
         templateUrl: 'template/dialog/timedout-dialog.html',
         windowClass: 'modal-danger'
       });
     });

     $scope.start = function() {
       closeModals();
       Idle.watch();
       $scope.started = true;
     };

     $scope.stop = function() {
       closeModals();
       Idle.unwatch();
       $scope.started = false;

     };
}
