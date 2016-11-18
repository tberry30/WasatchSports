(function () {
'use strict';

angular.module('wasatchSports')
  .controller('ReservationCtrl', ReservationCtrl);

  ReservationCtrl.$inject = ['renterService', 'reservationService', 'AuthFactory', '$state'];

  function ReservationCtrl(renterService, reservationService, AuthFactory, $state) {
    var reservationCtrl = this;

    var tabIndex = 0;
    var tabs = ['tab1', 'tab2']; // ADD MORE TABS IF NEEDED
    refreshTab();

    reservationCtrl.addRenter = addRenter;
    reservationCtrl.back = back;
    reservationCtrl.createRes = createRes;
    reservationCtrl.forward = forward;
    reservationCtrl.newReservation = { dateOut: '', dateIn: '', renters: [] };
    reservationCtrl.renters = [];
    reservationCtrl.text = 'Create Reservation';

    ////////////////

    function addRenter(newRenter) {
      renterService.addRenter(newRenter)
        .then(function(res) {
          reservationCtrl.renters.push(res);
          reservationCtrl.newReservation.renters.push(res._id);
          reservationCtrl.newRenter = '';
          toastr.success('Renter added successfully.');
        }, function(res) {
          toastr.error(res);
        });
    }

    function back() {
      reservationCtrl[tabs[tabIndex]] = false;
      tabIndex -= 1;
      refreshTab();
    }

    function createRes(newReservation) {
      var reservationOwner = AuthFactory.getUser().id;
      newReservation.createdBy = reservationOwner;
      reservationService.createRes(newReservation)
        .then(function(res) {
          toastr.success('Reservation created successfully');
          $state.go('account');
        }, function(res) {
          toastr.error(res);
        });
    }

    function forward() {
      reservationCtrl.newReservation.dateOut = new Date(reservationCtrl.dateOut);
      reservationCtrl.newReservation.dateIn = new Date(reservationCtrl.dateIn);
      reservationCtrl[tabs[tabIndex]] = false;
      tabIndex = tabIndex + 1;
      refreshTab();
    }

    function refreshTab() {
      reservationCtrl[tabs[tabIndex]] = true;
    }

  }

})();
