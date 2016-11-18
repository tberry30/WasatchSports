(function () {
'use strict';

angular.module('wasatchSports')
  .directive('updatePasswordModal', updatePasswordModal);

  updatePasswordModal.$inject = ['AUTH_EVENTS'];

  function updatePasswordModal(AUTH_EVENTS) {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: './login/update.template.html',
      controller: 'UpdateCtrl',
      controllerAs: 'updateCtrl',
      // bindToController: 'true',
      link: function (scope) {
        var showDialog = function () {
          scope.visible_updatePass = true;
        };
        var hideDialog = function () {
          scope.visible_updatePass = false;
        };
        scope.visible_updatePass = false;

        scope.$on(AUTH_EVENTS.updatePasswordRequest, showDialog);
      }
    }
  }

})();
