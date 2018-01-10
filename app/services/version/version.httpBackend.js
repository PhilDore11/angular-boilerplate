angular.module('versionE2E', [
  'ngMockE2E'
])

.run([
  '$httpBackend', 'config',
  function($httpBackend, config) {
    var holidaysResponse = require('./mocks/version.json');
    $httpBackend.whenGET(config.api.url + '/version').respond(holidaysResponse);
  }
]);