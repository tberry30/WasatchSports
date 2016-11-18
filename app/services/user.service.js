(function () {
'use strict';

angular.module('wasatchSports')
  .service('userService', userService);

  userService.$inject = ['$http'];

  function userService($http) {
    var userService = this;

    userService.getUser = getUser;
    userService.getUsers = getUsers;
    userService.remove = remove;
    userService.update = update;

    ////////////////

    function getUser(id) {
      return $http
        .get('/api/users/' + id)
        .then(function(res) {
          return res.data;
        });
    }

    function getUsers() {
      return $http
        .get('/api/users')
        .then(function(res) {
          var users = res.data;
          return users;
        });
    }

    function remove(id) {
      return $http
        .delete('/api/users/' + id)
        .then(function(res) {
          return res.data;
        }, function(res) {
          return res.data;
        });
    }

    function update(userToEdit) {
      return $http
        .put('/api/users/' + userToEdit._id, userToEdit)
        .then(function(res) {
          return res.data;
        });
    }

  }

})();
