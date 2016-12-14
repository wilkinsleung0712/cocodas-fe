angular.module('cocodas').service('topicService',['$log','$http','$q',TopicService]);
function TopicService($log,$http,$q){
  var self = this;
  var baseReqUri = 'http://localhost:8080/topic/';
  var baseResourceUri = 'http://localhost:8080/rest/';
  self.allTopics = function(){
      var deferred = $q.defer();
      $http.get(baseReqUri + 'allTopic').then(function(response){
        $log.info('Success');
        $log.info(response);
        deferred.resolve(response.data);
        return deferred.promise;
      },function(error){
        $log.debug(error);
        return deferred.reject(error);
      });
      return deferred.promise;
  }

  self.getTopic = function(topicId){
    function topicMatchesParam(topic){
      return topic.id == topicId;
    }
    // var deferred = $q.defer();
    //this should call a find method
    // you need two return from here to return the result to parent
    return $http.get(baseReqUri + 'view/'+topicId).then(function(response){
      return response.data;
    });
  };

  //the following rest method required authentication token to access with the
  //method
  self.updateTopic = function(topic){
    //populate topic extra info from $localStorage
    // topic.username = $localStorage.currentUser.username;
    var deferred = $q.defer();
    $http.post(baseResourceUri+'topic/update',topic).then(
      function(response){
        $log.info('update success');
        $log.info(response.data);
        return deferred.resolve(response.data);
      },  function(error){
          $log.info('update fail');
          $log.info(error);
          return deferred.reject(error);
        }
    );
    return deferred.promise;
  };
  self.deleteTopic = function(topic){
    //populate topic extra info from $localStorage
    // topic.username = $localStorage.currentUser.username;
    var deferred = $q.defer();
    $http.post(baseResourceUri + 'topic/delete/'+topic.topicId).then(function(response){
      $log.info('delete success');
      deferred.resolve(response.data);
      return deferred.promise;
      },function(error){
        $log.debug(error);
        return deferred.reject(error);
      });
      return deferred.promise;
  };
  self.createTopic = function(topic){
    //populate topic extra info from $localStorage
    // topic.username = $localStorage.currentUser.username;
    // topic.userId = $localStorage.currentUser.username;
    var deferred = $q.defer();
    $http.post(baseResourceUri + 'topic/add',topic).then(function(response){
      $log.info('create success');
      deferred.resolve(response.data);
      return deferred.promise;
    },function(error){
      $log.debug(error);
      return deferred.reject(error);
    });
    return deferred.promise;
  };

}
