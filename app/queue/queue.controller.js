(function () {
'use strict';

angular.module('wasatchSports')
  .controller('QueueController', QueueController);

  QueueController.$inject = ['reservationService', '$state', 'socketFactory'];

  function QueueController(reservationService, $state, socketFactory) {
    var queueController = this;

    queueController.removeFromQueue = removeFromQueue;
    queueController.text = 'Q U E U E';

    activate();

    ////////////////

    function activate() {
      socketFactory.on('queue', function(reservation) {
        queueController.reservations.push(reservation);
      });
      socketFactory.on('q_update', function(reservation) {
        $state.reload();
      });

      reservationService.getQueue().then(function(res) {
        queueController.reservations = res;
      });
    }

    function removeFromQueue(id) {
      reservationService.removeFromQueue(id)
        .then(function(res) {
          $state.reload();
        });
    }

  }

})();
