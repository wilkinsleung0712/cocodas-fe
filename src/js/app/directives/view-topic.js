angular.module('cocodas').directive('viewTopic',directiveConfig);
function directiveConfig(){
  return {
    restrict:'AE',
    replace:true,
    templateUrl:'template/view-topic.template.html',
    controller:['$scope','$log','topicService','$state',viewTopicCtrl],
    link: function(scope, el, attrs) {
    // scope.$watch('selectedTopic', function(newVal) {
    //     if(newVal) { el.text(scope.product.name);}
    // }, true);
  }
  };
}

function viewTopicCtrl($scope,$log,topicService,$state){
  $log.info('viewTopicCtrl');
  $scope.isEditSelected = true;
  $scope.editSelectedTopic = function(){
    //togal edit mode
    $scope.isEditSelected = false;
  };
  $scope.cancelSelectedTopic = function(){
    //cancel selectedTopic
    $scope.isEditSelected = true;
  };
  $scope.saveSelectedTopic = function(topic){
    //save selected topic
    topicService.updateTopic(topic).then(function(){
      //do something here after the wait until our resonse from server
        $state.go('home');
    });
  };
  $scope.deleteSelectedTopic = function(topic){
    //save selected topic
    topicService.deleteTopic(topic).then(
      //do something here after the wait until our resonse from server
      function(){
        $state.go('home');
      }
    );

  };
  $scope.backSelectedTopic = function(){
    //back to previous page selected topic
    $state.go('home');
  };

}
