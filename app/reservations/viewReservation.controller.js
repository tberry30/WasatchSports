(function () {
'use strict';

angular.module('wasatchSports')
  .controller('ViewReservationCtrl', ViewReservationCtrl);

  ViewReservationCtrl.$inject = ['reservationService', '$stateParams', '$state', 'renterService', 'AuthFactory'];

  function ViewReservationCtrl(reservationService, $stateParams, $state, renterService, AuthFactory) {
    var viewReservationCtrl = this;

    viewReservationCtrl.markCanceled = markCanceled;
    viewReservationCtrl.markComplete = markComplete;
    viewReservationCtrl.text = 'V I E W   R E S E R V A T I O N';

    activate();

    ////////////////

    function activate() {
      return reservationService.getReservationById($stateParams.id).then(function(reservation) {
        viewReservationCtrl.reservation = reservation;
      });
    }

    function markCanceled(id) {
      reservationService.markCanceled(id)
        .then(function(res) {
          var user = AuthFactory.getUser();
          if (user.role === 'customer' ) {
            $state.go('account');
          } else {
            $state.go('queue');
          }
          toastr.success('Reservation canceled');
        }, function() {
          toastr.success('Reservation failed');
        });
    }

    function markComplete(id) {
      reservationService.markComplete(id)
        .then(function(res) {
          toastr.success('Reservation complete');
          $state.go('queue');
        }, function() {
          toastr.success('Reservation failed');
        });
    }

  }

})();
