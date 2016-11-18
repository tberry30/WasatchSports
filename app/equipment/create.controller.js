(function () {
	'use strict';

	angular.module('wasatchSports')
		.controller('CreateCtrl', CreateCtrl);

		CreateCtrl.$inject = ['equipmentService', '$state'];

		function CreateCtrl(equipmentService, $state) {
			var createCtrl = this;

			createCtrl.create = create;
			createCtrl.text = 'C R E A T E   E Q U I P M E N T';

			////////////////

			function create(obj) {
				console.log(obj);
		    equipmentService.createEquip(obj).then(function(result) {
		      $state.go('view-equipment');
		    });
			}

		}

})();
