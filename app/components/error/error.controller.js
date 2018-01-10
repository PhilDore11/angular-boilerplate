var errorTemplate = require('./error.html');

angular.module('app.error')

.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('app.error', {
      url: '/error',
      templateUrl: errorTemplate
    })
  }
]);