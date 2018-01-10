var loginTemplate = require('./login.html');

angular.module('app.login')

  .config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider.state('app.login', {
        url: '/login',
        templateUrl: loginTemplate,
        controller: 'LoginController'
      })
    }
  ])

  .controller('LoginController', ['$scope', function ($scope) {

    $scope.onLogin = function () {
      console.log('Logged in!');
    }
  }]);