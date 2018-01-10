angular.module('resourcesE2E', [
  'ngMockE2E'
])

.run([
  '$httpBackend', 'config',
  function($httpBackend, config) {
    var resourcesResponse = require('./mocks/resources.json');
    $httpBackend.whenGET(config.api.url + '/resources').respond(resourcesResponse);

    var currentUserResponse = require('./mocks/currentUser.json');
    $httpBackend.whenGET(config.api.url + '/resources/current').respond(currentUserResponse);

    angular.forEach(resourcesResponse, function(resource) {
      $httpBackend.whenGET(config.api.url + '/resources/' + resource.id).respond(resource);
    });
  }
]);