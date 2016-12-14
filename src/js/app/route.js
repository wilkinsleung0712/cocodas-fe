angular.module('cocodas').config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

  // for unmatched routes
  $urlRouterProvider.otherwise('/');

  // Application routes
  $stateProvider
    .state('home',{
      url:'/',
      // controller:'MainCtrl',
      //'='->'xxxx' or '@'->'{{xxx}}', please check document
      template:"<list-topics info='alltopics'></list-topics>",
      // resolve: {
      //   alltopics:function(topicService,$scope){
      //     return ;
      //   }
      // }
    })
    .state('viewTopic',{
      url:'/viewTopic/{topicId}',
      template:"<view-topic></view-topic>",
      bindings: { selectedTopic: '<' },
      resolve:{
        selectedTopic: function(topicService,$log,$stateParams){
          // $log.info(topicService.getTopic($stateParams.topicId));
          return topicService.getTopic($stateParams.topicId);
        }
      },
      //used controller to set the data in the ui-scope to pass into directive
      controller:function($scope, selectedTopic){
        $scope.selectedTopic = selectedTopic;
      }
    })
    .state('userLogin',{
      url:'/user/login',
      template:'<user-login></user-login>'
    })
    .state('addTopic',{
      url:'/addTopic',
      template:'<add-topic></add-topic>'
    })
    .state('userRegister',{
      url:'/user/register',
      template:'<user-register></user-register>'
    });

}]);
