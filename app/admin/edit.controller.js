(function () {
'use strict';

angular.module('wasatchSports')
  .controller('EditUserCtrl', EditUserCtrl);

  EditUserCtrl.$inject = ['userService', '$stateParams', '$state'];

  function EditUserCtrl(userService, $stateParams, $state) {
    var editUserCtrl = this;

    editUserCtrl.remove = remove;
    editUserCtrl.text = 'E D I T   U S E R';
    editUserCtrl.update = update;

    activate();

    ////////////////

    function activate() {
      return userService.getUser($stateParams.id).then(function(user) {
        editUserCtrl.userToEdit = user;
      });
    }

    function remove(id) {
      userService.remove(id)
        .then(function(res) {
          toastr.success('User deleted');
        }, function() {
          console.log('oops');
        });
    }

    function update(userToEdit) {
      userService.update(userToEdit)
        .then(function(res) {
          toastr.success('User updated');
          $state.go('admin')
        }, function() {
          console.log('oops');
        });
    }

  }

})();
