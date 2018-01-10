var moment = require('moment');
var homeTemplate = require('./home.html');

angular.module('app.home')

.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('app.home', {
      url: '/home',
      templateUrl: homeTemplate,
      controller: 'HomeController',
      requireADLogin: true,
      resolve: {
        appList: ['$stateParams', 'currentUser', 'Resources', function($stateParams, currentUser, Resources) {
          return Resources.getAppointments($stateParams.resourceId || currentUser.data.resourceId);
        }],
        sbdList: ['$stateParams', 'currentUser', 'Resources', function($stateParams, currentUser, Resources){
          return Resources.getSBD($stateParams.resourceId || currentUser.data.resourceId);
        }],
        resource: ['$stateParams', 'currentUser', 'Resources', function($stateParams, currentUser, Resources) {
          return Resources.get($stateParams.resourceId || currentUser.data.resourceId);
        }]
      }
    })
  }
])

.controller('HomeController', [
  '$rootScope', '$scope', '$q', '$filter', 'appList', 'sbdList', 'resource', 
  function($rootScope, $scope, $q, $filter, appList, sbdList, resource) {
    $scope.resource = resource.data;
    $scope.resource.fullName = $scope.resource.firstName + ' ' + $scope.resource.lastName;

    $scope.appList = appList.data;
    $scope.sbdList = sbdList.data;
    
    angular.forEach($scope.sbdList, function(item) {
      var endTime = moment(item.endTime, 'HH:mm:ss');
      item.endTime = moment(item.endDate).add(endTime.format("HH"), 'hours').add(endTime.format("mm"), 'minutes').format("HH:mm");
      item.isSBD = true;
    });

    $scope.list = $scope.sbdList.concat($scope.appList);

    // Current Bid
    $scope.currentBidColumns = [{
      labelKey: 'CLASSIFICATION',
      getValue: function(currentBidData) {
        return currentBidData.slotCrew
      }
    }, {
      labelKey: 'POSITION',
      getValue: function(currentBidData) {
        return currentBidData.slotCategory
      }
    }, {
      labelKey: 'CREW',
      getValue: function(currentBidData) {
        if(currentBidData.slotTeamName) {
          return currentBidData.slotTeamName
        } else {
          return "Crew - " + currentBidData.slotCrewTeam
        }
      }
    }, {
      labelKey: 'STATUS',
      hidePrint: true,
      getClass: function(currentBidData) {
        return ['jz-status-label', $filter('jzAppointmentStatusClass')(currentBidData.status)].join(' ');
      },
      getValue: function(currentBidData) {
        return $filter('jzAppointmentStatusLabel')(currentBidData.status);
      }
    }];

    $scope.getCurrentBidData = function(appData) {
      var defered = $q.defer();

      defered.resolve({data: [appData]});

      return defered.promise;
    };

    $scope.standingBidsColumns = [{
      labelKey: 'PICK',
      getValue: function(standingBidData) {
        return standingBidData.priority
      }
    }, {
      labelKey: 'CLASSIFICATION',
      getValue: function(standingBidData) {
        return standingBidData.crewName
      }
    }, {
      labelKey: 'POSITION',
      getValue: function(standingBidData) {
        return standingBidData.categoryName
      }
    }, {
      labelKey: 'CREW',
      getValue: function(standingBidData) {
        if (standingBidData.teamName) {
          return standingBidData.teamName
        } else {
          return 'Crew - ' + standingBidData.teamOrder
        }
      }
    }, {
      labelKey: 'STATUS',
      hidePrint: true,
      getClass: function(standingBidData) {
        return ['jz-status-label', $filter('jzStandingBidStatusClass')(standingBidData.status)].join(' ');
      },
      getValue: function(standingBidData) {
        return $filter('jzStandingBidStatusLabel')(standingBidData.status);
      }
    }];

    $scope.getStandingBidsData = function(appData) {
      var defered = $q.defer();

      defered.resolve({data: appData.standingBids});

      return defered.promise;
    };


    $scope.formatDate = function(date) {
      return moment(date).format('YYYY-MM-DD');
    }

    $scope.isPreBidding = function(appData) {
      return appData.status === 0;
    };

    $scope.isBidding = function(appData) {
      return appData.status === 100;
    }
  }
]);