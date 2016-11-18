(function () {
	'use strict';

	angular.module('wasatchSports')
		.controller('EditCtrl', EditCtrl);

		EditCtrl.$inject = ['equipmentService', '$state', '$stateParams'];

		function EditCtrl(equipmentService, $state, $stateParams) {
			var editCtrl = this;

			editCtrl.addRepair = addRepair;
			editCtrl.checkIn = checkIn;
			editCtrl.checkOut = checkOut;
			editCtrl.remove = remove;
			editCtrl.text = 'E D I T   E Q U I P M E N T';
			editCtrl.update = update;

			activate();

			////////////////

			function activate() {
				return equipmentService.getEquipById($stateParams.id).then(function(results) {
					editCtrl.equipToEdit = results;
				});
			}

			function addRepair(equipId, repairObj) {
				equipmentService.addEquipRepair(equipId, repairObj).then(function(result) {
					$state.reload('edit-equipment');
				});
			}

			function checkIn(id) {
				equipmentService.checkInEquip(id).then(function(result) {
					$state.reload('edit-equipment');
				});
			}

			function checkOut(id) {
				equipmentService.checkOutEquip(id).then(function(result) {
					$state.reload('edit-equipment');
				});
			}

		  function remove(id) {
		    equipmentService.deleteEquip(id).then(function(result) {
		      $state.go('view-equipment');
		    });
		  }

			function update(obj) {
				equipmentService.updateEquip(obj).then(function(result) {
					$state.go('view-equipment');
				});
			}

		}

})();
