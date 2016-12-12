angular.module('cocodas').directive('addTopic',addTopicDirectiveConfig);

function addTopicDirectiveConfig(){
  return {
    restrict:'AE',
    replace:true,
    templateUrl:'template/add-topic.template.html',
    controller:['$scope','$log','$state','topicService',addTopicCtrl],
    link: function(scope, el, attrs) {
    // scope.$watch('selectedTopic', function(newVal) {
    //     if(newVal) { el.text(scope.product.name);}
    // }, true);
    }
  };
}

function addTopicCtrl($scope,$log,$state,topicService){
  $log.info('addTopicCtrl');
  $scope.addNewTopic = function(newTopic,isValid){
    // check to make sure the form is completely valid
    if (isValid) {
      topicService.createTopic(newTopic).then(function(){
          $state.go('home');
      });
    }
  };
}
