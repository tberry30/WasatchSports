(function () {
'use strict';

angular.module('wasatchSports')
  .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['AuthFactory', '$state', 'reservationService'];

  function AccountCtrl(AuthFactory, $state, reservationService) {
    var accountCtrl = this;

    accountCtrl.create = create;
    accountCtrl.text = 'M Y   A C C O U N T';

    activate();

    ////////////////

    function activate() {
      reservationService.getReservationsByUser(AuthFactory.getUser().id).then(function(reservations) {
        var pastReservations = [];
        var currentReservations = [];

        reservations.forEach(function(res) {
          if (res.status === 'completed' || res.status === 'canceled') {
            pastReservations.push(res);
          } else {
            currentReservations.push(res);
          }
        });

        accountCtrl.pastReservations = pastReservations;
        accountCtrl.currentReservations = currentReservations;
      });
    }

    function create(newUser) {
      AuthFactory.register(newUser)
      .then(function(response) {
        $state.go('account')
        toastr.success(response.message);
      }, function() {
        toastr.success('Something went wrong!');
      });
    }

  }

})();
