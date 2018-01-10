angular.module('app.logout')

.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('app.logout', {
      url: '/logout',
      controller: 'LogoutController'
    })
  }
])

.controller('LogoutController', ['$rootScope', function($rootScope) {
  $rootScope.logout();
}]);