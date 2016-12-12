angular.module('cocodas').directive('listTopics',directiveConfig);
function directiveConfig(){
  return {
    restrict: 'AE',
    replace: true,
    scope:{
      //pass object from parent scope
      // allTopics:'=info',
      // viewSelectedTopic:'&'
    },
    templateUrl:'template/list-topics.template.html',
    link: function postLink(scope, element, attrs) {
      //postlink function goes here
      //  console.log('linking');
        //  console.log(scope);
      //   console.log(attrs);
      //   console.log(element);
    },
    controller:['$scope','$log','topicService',listTopicCtrl]
  };
}


// Main logic for listTopic directive
function listTopicCtrl($scope,$log,topicService){
  $log.info('listTopicCtrl');
  topicService.allTopics().then(function(data){
    $scope.allTopics = data;
  });
  $scope.viewSelectedTopic = function(selectedTopic){
    alert(selectedTopic);
  };
};
