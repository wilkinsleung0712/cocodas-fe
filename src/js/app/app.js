var cocodas = angular.module('cocodas',['ui.router','ui.bootstrap','ngCookies','ngIdle']);
cocodas.config(['$httpProvider','KeepaliveProvider', 'IdleProvider',config]);
cocodas.run(run);
function config($httpProvider,KeepaliveProvider, IdleProvider){
  // setting timeout value
  IdleProvider.idle(5);
  IdleProvider.timeout(5);
  KeepaliveProvider.interval(10);

  $httpProvider.interceptors.push(['$q', '$cookies', '$injector',myHttpInterceptor]);
  // register the interceptor as a service
  function myHttpInterceptor($q, $cookies, $injector) {
    return {
      // optional method
      'request': function(config) {
        // do something on success
        config.headers = config.headers || {};
        if($cookies.get('currentUserName')&&$cookies.get('currentUserToken')){
          config.headers.Authorization
            = 'Bearer ' + $cookies.get('currentUserToken');
        }
        return config;
      },

      // optional method
     'requestError': function(rejection) {
        // do something on error
        if (canRecover(rejection)) {
          return responseOrNewPromise
        }

        if (rejection.status === 401 || rejection.status === 403) {
               $injector.get('$state').go('userLogin');
           }
        return $q.reject(rejection);
      },

      // optional method
      'response': function(response) {
        // do something on success
        return response;
      },

      // optional method
     'responseError': function(rejection) {
        // do something on error
        if (canRecover(rejection)) {
          return responseOrNewPromise
        }
        return $q.reject(rejection);
      }
    };
  };


  };



function run($rootScope, $http, $location, $cookies,$log,Idle,$state) {
        // keep user logged in after page refresh
        if ($cookies.get('currentUser')) {
            $log.info($cookies);
            $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('currentUserToken');
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // used to define a list of public page that can be used without authentication
            var publicPages = ['/user/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$cookies.get('currentUserToken')) {
                 $location.path('/user/login');
                // $state.go('userLogin');
            }
        });


        $log.debug('app started.');
    }
