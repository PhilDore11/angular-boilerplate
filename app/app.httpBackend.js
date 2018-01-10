angular.module('appE2E', [
  'app',
  'ngMockE2E',

  'resourcesE2E',
  'versionE2E'
])
.run([
  '$httpBackend', 'config', 
  function($httpBackend, config) {
    
    // Translations
    $httpBackend.whenGET('translations/en.json').passThrough();
    $httpBackend.whenGET('translations/fr.json').passThrough();

    // Version
    $httpBackend.whenGET(config.api.url + '/version').passThrough();
  }
]);