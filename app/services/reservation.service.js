(function () {
'use strict';

angular.module('wasatchSports')
  .service('reservationService', reservationService);

  reservationService.$inject = ['$http', '$q'];

  function reservationService($http, $q) {
    var reservationService = this;

    reservationService.addToQueue = addToQueue;
    reservationService.createRes = createRes;
    reservationService.getQueue = getQueue;
    reservationService.getReservations = getReservations;
    reservationService.getReservationById = getReservationById;
    reservationService.getReservationsByUser = getReservationsByUser;
    reservationService.markCanceled = markCanceled;
    reservationService.markComplete = markComplete;
    reservationService.removeFromQueue = removeFromQueue;

    ////////////////

    function addToQueue(id) {
      var deferred = $q.defer()
      $http
        .put('/api/addToQueue/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data);
        });
      return deferred.promise;
    }

    function createRes(newReservation) {
      var deferred = $q.defer()
      $http
        .post('/api/reservations', newReservation)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    }

    function getQueue() {
      var deferred = $q.defer()
      $http
        .get('/api/queue')
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    }

    function getReservations() {
      var deferred = $q.defer()
      $http
        .get('/api/reservations')
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    }

    function getReservationById(id) {
      var deferred = $q.defer()
      $http
        .get('/api/reservation/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    }

    function getReservationsByUser(userId) {
      var deferred = $q.defer()
      $http
        .get('/api/reservations/' + userId)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data.message);
        });
      return deferred.promise;
    }

    function markCanceled(id) {
      var deferred = $q.defer()
      $http
        .put('/api/markReservationCanceled/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data);
        });
      return deferred.promise;
    }

    function markComplete(id) {
      var deferred = $q.defer()
      $http
        .put('/api/markReservationComplete/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data);
        });
      return deferred.promise;
    }

    function removeFromQueue(id) {
      var deferred = $q.defer()
      $http
        .put('/api/removeFromQueue/' + id)
        .then(function(res) {
          return deferred.resolve(res.data);
        }, function(res) {
          return deferred.reject(res.data);
        });
      return deferred.promise;
    }

  }

})();
