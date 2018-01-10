var navbarTemplate = require('./navbar.html');

angular.module('app.directives')

.directive('jzNavbar', function() {
  return {
    replace: false,
    scope: false,
    templateUrl: navbarTemplate,
    controller: [
      '$scope', '$rootScope', '$state', '$stateParams', '$translate', '$location', 'Resources',
      function($scope, $rootScope, $state, $stateParams, $translate, $location, Resources) {

        if($rootScope.currentUser && !$rootScope.currentUser.isAdmin) {
          Resources.get($rootScope.currentUser.resourceId).then(function(userInfo){
            $scope.userName = userInfo.data.firstName + ' ' + userInfo.data.lastName;
          });
        }

        $scope.goHome = function() {
          $location.path('/app');
        }

        $scope.getCurrentStateTitleKey = function() {
            return ($state.current.data && $state.current.data.getTitleKey) ? $state.current.data.getTitleKey($stateParams) : '';        
        };

        $scope.getCurrentStateBackRoute = function() {
            return ($state.current.data && $state.current.data.getTitleRoute) ? $state.current.data.getTitleRoute($stateParams) : null;        
        }

        $scope.goTo = function(stateParams) {
          $state.go(stateParams.route, stateParams.params, { reload: true });
        }

        $scope.openMenu = function($mdMenu, ev) {
          $mdMenu.open(ev);
        };

        $scope.profile = function() {
          $state.go('app.profile', { id: $rootScope.currentUser.resourceId });
        }

        $scope.switchLanguage = function(lang) {
          $translate.use(lang);
          moment.locale(lang);
          $scope.lang = lang;
          sessionStorage.setItem('lang', lang);
        };

        $scope.lang = sessionStorage.getItem('lang') || 'en';
        $scope.switchLanguage($scope.lang);
      }
    ]
  };
});