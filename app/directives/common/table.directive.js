var tableTemplate = require('./table.html');

angular.module('app.directives')

.directive('jzTable', ['$translate', function($translate) {
  return {
    replace: true,
    scope: {
      tableActions: '=',
      columns: '=',
      actions: '=',
      getDataFunc: '&',
      addFunc: '&',
      addLabelKey: '=',
      itemKey: '=',
      titleKey: '=',
      hideSearch: '=',
      hidePagination: '=',
      hideHeader: '=',
      api: "=?",
      selected: '=',
      order: '=?'
    },
    templateUrl: tableTemplate,
    link: function(scope, elem, attrs) {
      function loadData() {
        scope.loading = true;

        scope.getDataFunc().then(function(res) {
            scope.data = res.data;
            if (scope.hidePagination) {
              scope.limit = scope.data.length;
            } 
          }).finally(function() {
            scope.loading = false;
          });
      }

      loadData();

      scope.api = {
        refresh: loadData
      }
      
      $translate(scope.itemKey).then(function(translation) {
        scope.noTableDataValues = {
          item: $translate.instant(translation)
        }
      });
    },
    controller: ['$scope', '$translate', function($scope, $translate) {
      $scope.limit = 10;
      $scope.page = 1;

      $scope.showAdd = angular.isDefined($scope.addFunc) && angular.isDefined($scope.addLabelKey);

      $scope.add = function() {
        return $scope.addFunc();
      };

      $scope.openMenu = function($mdMenu, ev) {
        $mdMenu.open(ev);
      };

      $scope.$watch('filter', function() {
        $scope.page = 1;
      }, true);
    }]
  }
}])

.filter('tableFilter', ['$filter', function($filter) {
  return function(list, columns, filter) {
    if (!filter) {
      return list;
    }

    var filteredList = [];

    angular.forEach(list, function(item) {
      var match = false;

      angular.forEach(columns, function(column) {
        match = match || column.getValue(item).toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      });

      if (match) {
        filteredList.push(item);
      }
    });

    return filteredList;
  }
}]);