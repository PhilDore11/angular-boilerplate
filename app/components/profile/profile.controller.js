var template = require('./profile.html');

angular.module('app.profile', [])

.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('app.profile', {
      url: '/profile/:id',
      templateUrl: template,
      controller: 'ProfileController',
      requireADLogin: true,
      data: {
        getTitleKey: function() {
          return 'PROFILE';
        }
      }
    })
  }
])

.controller('ProfileController', [
  '$scope', '$stateParams', 'Resources',
  function($scope, $stateParams, Resources) {
    Resources.get($stateParams.id).then(function(response) {
      $scope.profile = response.data; 
    });
  }
]);