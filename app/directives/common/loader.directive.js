var loaderTemplate = require('./loader.html');

angular.module('app.directives')

.directive('jzLoader', function() {
  return {
    templateUrl: loaderTemplate
  }
});