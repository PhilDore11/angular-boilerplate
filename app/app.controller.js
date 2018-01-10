var appTemplate = require('./app.html');

angular.module('app')

.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('app', {
      abstract: true,
      url: '/app?resourceId',
      templateUrl: appTemplate,
      controller: 'AppController',
      resolve: {
        currentUser: ['$rootScope', 'Resources', function($rootScope, Resources) {
          if ($rootScope.userInfo && $rootScope.userInfo.isAuthenticated) {
            if (angular.isUndefined($rootScope.currentUser)) {
              return Resources.getCurrent();
            } else {
              return {
                data: $rootScope.currentUser
              };
            }
          } else {
            return { data: null };
          }
        }]
      }
    })
  }
])

.controller('AppController', [
  '$rootScope', '$scope', '$state', 'currentUser',
  function($rootScope, $scope, $state, currentUser) {
    $rootScope.currentUser = currentUser.data;

    $rootScope.logout = function() {
      console.log('Logging out...');
    };

    $rootScope.login = function() {
      $state.go('app.login', {}, {reload: true});
    };
  }
]);