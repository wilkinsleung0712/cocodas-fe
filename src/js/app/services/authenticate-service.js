angular.module('cocodas').service('authenticateService',['$log','$http','$rootScope','$q','$cookies','$timeout',authenticateService]);

function authenticateService($log,$http,$rootScope,$q,$cookies,$timeout){
  var self = this;
  var baseUri = 'http://localhost:8080/user/';
  // var loginReq = {
  //   method:'POST',
  //   url:baseUri + 'login',
  //
  // };
  $log.info('authenticateService()');
  self.authenticate = function(username,password,callback){
    var deferred = $q.defer();
    $http.post(baseUri+'login',{'username':username,'password':password})
      .then(function(response){
        // login successful if there's a token in the response
        $log.info('Success');
        $log.info(response);
        if(response.data.token){
           // store username and token in local storage to keep user logged in between page refreshes
          $cookies.put('currentUserName',username);
          $cookies.put('currentUserToken',response.data.token);
          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
          // execute callback with true to indicate successful login
          callback(true);

        }else {
            // execute callback with false to indicate failed login
          callback(false);
        }
        deferred.resolve(response.data);
      },function(errorResponse){
        $log.debug(errorResponse);
        return deferred.reject(errorResponse);
      });
      return deferred.promise;
  };

  self.register = function(registerUserDetail){
    var deferred = $q.defer();
    $http.post(baseUri + 'register',registerUserDetail)
      .then(function(response){
        $log.info('register successful');
        deferred.resolve(response.data);
      },function(errorResponse){
        $log.error('register failed');
        deferred.reject(errorResponse);
      });
      return deferred.promise;
  }
}
