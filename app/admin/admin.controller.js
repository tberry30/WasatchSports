(function () {
'use strict';

angular.module('wasatchSports')
  .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['userService'];

  function AdminCtrl(userService) {
    var adminCtrl = this;

    adminCtrl.getUser = getUser;
    adminCtrl.text = 'A D M I N';

    activate();

    ////////////////

    function activate() {
      return userService.getUsers().then(function(users) {
        adminCtrl.users = users;
      });
    }

    function getUser() {
      userService.getUser(id)
        .then(function(users) {
          adminCtrl.user = user;
        });
    }

  }
  
})();
