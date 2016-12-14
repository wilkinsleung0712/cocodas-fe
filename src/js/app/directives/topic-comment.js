angular.module('cocodas').directive('topicComment',topicCommentDirectiveConfig);
function topicCommentDirectiveConfig(){
  return {
    restrict:'AE',
    templateUrl:'template/topic-comment.template.html',
    controller:['$scope','$log','topicService','$state',topicCommentCtrl],
    link: function(scope, el, attrs) {
      // scope.$watch('selectedTopic', function(newVal) {
      //     if(newVal) { el.text(scope.product.name);}
      // }, true);
    }
  };
}


function topicCommentCtrl($scope,$log,topicService,$state){


}
