var errorToastTemplate = require('./errorToast.html');
var errorTemplate = require('./dialogError.html');
var confirmTemplate = require('./confirm.html');
var notificationTemplate = require('./dialogNotification.html');

angular.module('app.helpers').factory('DialogHelpers', [
  '$mdDialog', '$translate', '$mdToast',
  function($mdDialog, $translate, $mdToast) {
    return {
      showError: function(message, errors) {
        if (errors && errors.length > 0) {
          $mdDialog.show({
            templateUrl: errorTemplate,
            locals: {
              message: message,
              errors: errors
            },
            parent: angular.element(document.body),
            controller: ['$scope', '$mdDialog', 'errors', 'message', function($scope, $mdDialog, errors, message) {
              $scope.message = message;
              $scope.errors = errors;
              $scope.closeDialog = $mdDialog.hide;
            }]
          });
        } else {
          $mdToast.show({
            templateUrl: errorToastTemplate,
            locals: {
              message: message
            },
            position: 'bottom right',
            hideDelay: 5000,
            controller: [
              '$scope', 'message',
              function($scope, message) {
                $scope.message = message;
              }
            ]
          });
        }
      },

      showAlert: function(title, content) {
        $translate("CLOSE").then(function(translation) {
          alert = $mdDialog.alert({
            title: title,
            textContent: content,
            ok: translation
          });

          $mdDialog.show(alert).finally(function() {
            alert = undefined;
          });
        });
      },

      showConfirm: function(title, message, data, templateUrl) {
        return $mdDialog.show({
          templateUrl: templateUrl || confirmTemplate,
          locals: {
            title: title,
            message: message,
            data: data
          },
          parent: angular.element(document.body),
          controller: [
            '$scope', '$mdDialog', 'title', 'message', 'data',
            function($scope, $mdDialog, title, message, data) {
              $scope.title = title;
              $scope.message = message;
              $scope.data = data;

              $scope.confirm = function() {
                $mdDialog.hide();
              };

              $scope.cancel = function() {
                $mdDialog.cancel();
              };
            }
          ]
        });
      },

      showNotification: function(message, timeout) {
        $mdToast.show({
          template: '<md-toast><div class="md-toast-content jz-success-toast"><md-icon layout-margin>check_circle</md-icon>' + message + '</md-icon></div></md-toast>',
          position: 'bottom right',
          hideDelay: timeout || 2000
        });
      },

      showDialog: function(templateUrl, data, controller, callback) {
        $mdDialog.show({
          templateUrl: templateUrl,
          locals: {
            data: data,
            callback: callback
          },
          parent: angular.element(document.body),
          controller: controller
        });
      },

      hide: function() {
        $mdDialog.hide();
      }
    }
  }
]);