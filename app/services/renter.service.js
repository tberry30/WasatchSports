(function () {
'use strict';

angular.module('wasatchSports')
  .service('renterService', renterService);

  renterService.$inject = ['$http', '$q'];

  function renterService($http, $q) {
    var renterService = this;

    renterService.addRenter = addRenter;
    renterService.editRenter = editRenter;
    renterService.getRenter = getRenter;
    renterService.removeRenter = removeRenter;

    ////////////////

    function addRenter(newRenter) {
      var deferred = $q.defer()
      $http
        .post('/api/renters', newRenter)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    }

    function editRenter(renter) {
      var deferred = $q.defer()
      $http
        .put('/api/renters/' + renter._id, renter)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    }

    function getRenter(id) {
      return $http
        .get('/api/renters/' + id)
        .then(function(res) {
          return res.data;
        });
    }

    function removeRenter(id) {
      return $http
        .delete('/api/renters/' + id)
        .then(function(res) {
          return res.data;
        }, function(res) {
          return res.data;
        });
    }

  }

})();
