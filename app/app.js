var moment = require('moment');
var app = angular.module('app', [
  'ngResource',
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'md.data.table',
  'fixed.table.header',
  'ngFileSaver',
  'angular.filter',
  'agGrid',
  'ngMaterialDatePicker',

  'app.filters',
  'app.directives',

  'app.login',
  'app.logout',
  'app.error',
  'app.home',

  'app.services',
  
  'pascalprecht.translate',
  'angularMoment',
  'angular-sortable-view'
]);

app.config([
  '$mdThemingProvider', '$urlRouterProvider', '$mdDateLocaleProvider', '$translateProvider', 'moment',
  function($mdThemingProvider, $urlRouterProvider, $mdDateLocaleProvider, $translateProvider, moment) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('grey')
      .backgroundPalette('grey');

    $translateProvider.useStaticFilesLoader({ prefix: 'translations/', suffix: '.json' })
      .useSanitizeValueStrategy('escape')
      .preferredLanguage('en');

    moment.locale('en');

    $urlRouterProvider.otherwise('/app');

    $urlRouterProvider.when('/app', ['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
      if ($rootScope.error) {
        return;
      }
      
      if (!$rootScope.userInfo || !$rootScope.userInfo.isAuthenticated) {
        $state.transitionTo('app.login', $stateParams, { reload: true });
      } else {
        $state.transitionTo('app.home', $stateParams, { reload: true });
      }
    }]);

    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('DD-MMM-YYYY');
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'DD-MMM-YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
  }
])

.config([
    '$locationProvider', '$httpProvider',
    function($locationProvider, $httpProvider) {
      $locationProvider.html5Mode(false).hashPrefix('');

      $httpProvider.interceptors.push(['$rootScope', '$q', '$location',
        function($rootScope, $q, $location) {
          return {
            'request': function(req) {
              $rootScope.loading = true;
              return req;
            },

            'response': function(response) {
              $rootScope.loading = false;
              return response;
            },

            'responseError': function(error) {
              console.error('responseError: ', error);
              $rootScope.loading = false;

              if(error.status === 403) {
                $location.path('/');
              }
              else {
                return $q.reject(error);
              }
            }
          };
        }
      ]);
    }
  ])
  .run([
    '$rootScope', '$state', '$location', '$timeout',
    function($rootScope, $state, $location, $timeout) {

      $rootScope.$on('$stateChangeStart', function() {
        $rootScope.loading = true;
      });

      $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.loading = false;
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $rootScope.loading = false;

        $rootScope.error = error;
        $state.go('app.error');
      });
    }
  ]);

app.filter('onlyDate', function() {
  return function(input, format) {
    var dt = moment.utc(input).format('YYYY-MM-DDT00:00:00');
    return Date.parse(dt);
  }
});
app.filter('onlyLocalDate', function() {
  return function(input, format) {
    var dt = moment(input).format('YYYY-MM-DDT00:00:00');
    return Date.parse(dt);
  }
});


module.exports = app;