var versionTemplate = require('./version.html');

angular.module('app.directives')

.directive('jzVersion', function() {
  return {
		replace: true,
		scope: {},
    templateUrl: versionTemplate,

    controller: ['$scope', 'Version', function($scope, Version) {
      Version.get().then(function(response) {
        $scope.apiVersion = response.data.version;
        $scope.apiBuild = moment(response.data.build).format('YYYY-MM-DD HH:mm');

        $scope.env = process.env.APP_ENV;
        $scope.appVersion = process.env.VERSION;
        $scope.appBuild = moment(process.env.DATE).format('YYYY-MM-DD HH:mm');
        $scope.appHash = process.env.HASH;

        if ($scope.env === 'prod') {
          $scope.version = {
            app: "Version " + $scope.appVersion,
            api: "API " + $scope.apiVersion
          };
        }
        if ($scope.env === 'dev' || $scope.env === 'stg') {
          $scope.version = {
            app: "Version " + $scope.appVersion + " Build " + $scope.appBuild,
            api: "API " + $scope.apiVersion + " Build " + $scope.apiBuild
          };
        }
      });
    }]
  };
});