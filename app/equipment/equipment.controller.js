(function () {
'use strict';

angular.module('wasatchSports')
	.controller('EquipmentCtrl', EquipmentCtrl);

	EquipmentCtrl.$inject = ['equipmentService'];

	function EquipmentCtrl(equipmentService) {
    var equipmentCtrl = this;

		equipmentCtrl.focus = 'id';
		equipmentCtrl.order = order;
		equipmentCtrl.reverse = true;
		equipmentCtrl.text = 'E Q U I P M E N T';

		activate();

		////////////////

		function activate() {
			return equipmentService.getEquipment().then(function(equip) {
				equipmentCtrl.equipment = equip;
				equipmentCtrl.types = _.groupBy(equip, 'type');
			});
		}

		function order(focus) {
	    equipmentCtrl.reverse = (equipmentCtrl.focus === focus) ? !equipmentCtrl.reverse : false;
	    equipmentCtrl.focus = focus;
	  }

	}

})();
