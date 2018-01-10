angular.module('app.services').factory('Version', [
  '$http', 'config',
  function($http, config) {
    var SERVICE_PREFIX = config.api.url + "/version";

    return {
      get: function() {
        return $http.get(SERVICE_PREFIX);
      }
    }
  }
]);