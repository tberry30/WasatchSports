(function () {
'use strict';

angular.module('wasatchSports')
  .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['reservationService', '$state', 'socketFactory'];

  function DashboardCtrl(reservationService, $state, socketFactory) {
    var dashboardCtrl = this;

    dashboardCtrl.addToQueue = addToQueue;
    dashboardCtrl.text = 'D A S H B O A R D';

    activate();

    ////////////////

    function activate() {
      socketFactory.on('dashboard', function(reservation) {
        dashboardCtrl.reservations.push(reservation);
      });
      socketFactory.on('db_update', function(reservation) {
        $state.reload();
      });

      reservationService.getReservations().then(function(res) {
        dashboardCtrl.reservations = res;
      });
    }

    function addToQueue(id) {
      reservationService.addToQueue(id)
        .then(function(res) {
          $state.reload();
        });
    }

  }

})();
