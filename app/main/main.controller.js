(function () {
'use strict';

angular.module('wasatchSports')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$http'];

  function MainCtrl($http) {
    var mainCtrl = this;

    mainCtrl.text = 'Welcome to Wasatch Sports!';
    mainCtrl.rentals = 'R E N T A L S';
    mainCtrl.tickets = 'T I C K E T S'
    mainCtrl.location = 'L O C A T I O N S'

    ////////////////

  }

})();
