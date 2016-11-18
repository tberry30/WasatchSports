(function () {
'use strict';

angular.module('wasatchSports')
  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthFactory', '$scope'];

  function LoginCtrl($rootScope, AUTH_EVENTS, AuthFactory, $scope) {
    var loginCtrl = this;

    loginCtrl.closeLogin = closeLogin;
    loginCtrl.credentials = { username: '', password: ''};
    loginCtrl.login = login;

    ///////////////

    function closeLogin(credentials) {
      $scope.visible = false;
    }

    function login(credentials) {
      AuthFactory.login(credentials).then(function(response) {
        // loginCtrl.visible = false;
        toastr.success(response.message + '.<br>Welcome, ' + response.user.firstName + '!');
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function(response) {
        toastr.error(response);
        // $rootScope.broadcast(AUTH_EVENTS.loginFailed);
      });
    }

  }

})();
