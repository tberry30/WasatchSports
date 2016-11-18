(function () {
'use strict';

angular.module('wasatchSports')
  .controller('UpdateCtrl', UpdateCtrl);

  UpdateCtrl.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthFactory', '$scope'];

  function UpdateCtrl($rootScope, AUTH_EVENTS, AuthFactory, $scope) {
    var updateCtrl = this;

    updateCtrl.closeLogin = closeLogin;
    updateCtrl.credentials = { oldPassword: '', newPassword: ''};
    updateCtrl.updatePassword = updatePassword;

    ///////////////

    function closeLogin() {
      $scope.visible_updatePass = false;
    }

    function updatePassword(credentials) {
      AuthFactory.updatePassword(credentials).then(function(response) {
        $scope.visible_updatePass = false;
        toastr.success(response.message);
      }, function(response) {
        toastr.error(response);
      });
    }

  }

})();
