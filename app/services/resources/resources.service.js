angular.module('app.services').factory('Resources', [
  '$http', 'config',
  function($http, config) {
    var SERVICE_PREFIX = config.api.url + "/resources";

    return {
      getResources: function(resourceId) {
        return $http.get(SERVICE_PREFIX);
      },

      getAppointments: function(resourceId) {
        return $http.get(SERVICE_PREFIX + '/' + resourceId + "/appointments");
      },

      getSBD: function(resourceId) {
        return $http.get(SERVICE_PREFIX + '/' + resourceId + "/stat-bank-declaration");
      },

      getSingleSBD: function(resourceId, sbdId){
        return $http.get(SERVICE_PREFIX + '/' + resourceId + "/stat-bank-declaration/" + sbdId);
      },

      getCurrent: function() {
        return $http.get(SERVICE_PREFIX + '/' + "current");
      },

      import: function(file) {
        var form = new FormData();
        form.append("file", file);

        return $http.post(SERVICE_PREFIX + '/' + "import", form, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        });
      },

      get: function(resourceId) {
        return $http.get(SERVICE_PREFIX + '/' + resourceId);
      },

      update: function(resourceId, resource) {
        return $http.put(SERVICE_PREFIX + '/' + resourceId, resource);
      }
    }
  }
]);