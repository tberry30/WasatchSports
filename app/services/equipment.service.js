(function () {
'use strict';

angular.module('wasatchSports')
  .service('equipmentService', equipmentService);

  equipmentService.$inject = ['$http', '$q'];

  function equipmentService($http, $q) {
    var equipmentService = this;

    equipmentService.addEquipRepair = addEquipRepair;
    equipmentService.addEquipToRenter = addEquipToRenter;
    equipmentService.checkInEquip = checkInEquip;
    equipmentService.checkOutEquip = checkOutEquip;
    equipmentService.createEquip = createEquip;
    equipmentService.deleteEquip = deleteEquip;
    equipmentService.getEquipById = getEquipById;
    equipmentService.getEquipment = getEquipment;
    equipmentService.removeEquipFromRenter = removeEquipFromRenter;
    equipmentService.updateEquip = updateEquip;

    ////////////////

    function addEquipRepair(equipId, repairObj) {
      return $http
        .post('/api/equipment/' + equipId, {
          id: equipId,
          repair: repairObj
        }).then(function(res) {
          return res.data;
        });
    }

    function addEquipToRenter(renterId, equipId) {
      return $http
        .put('/api/addEquipToRenter/' + renterId, { "equipId" : equipId })
        .then(function(res) {
          return res.data;
        });
    }

    function checkInEquip(id) {
      return $http
        .put('/api/equipment/checkin/' + id)
        .then(function(res) {
          return res.data;
        });
    }

    function checkOutEquip(id) {
      return $http
        .put('/api/equipment/checkout/' + id)
        .then(function(res) {
          return res.data;
        });
    }

    function createEquip(newEquipment) {
      return $http
        .post('/api/equipment', newEquipment)
        .then(function(res) {
          return res;
        });
    }

    function deleteEquip(id) {
      return $http
        .delete('/api/equipment/' + id)
        .then(function(res) {
          return res.data;
        });
    }

    function getEquipById(id) {
      return $http
        .get('/api/equipment/' + id)
        .then(function(res) {
          return res.data;
        });
    }

    function getEquipment() {
      return $http
        .get('/api/equipment')
        .then(function(res) {
          return res.data;
        });
    }

    function removeEquipFromRenter(renterId, equipId) {
      return $http
        .put('/api/removeEquipFromRenter/' + renterId, { "equipId" : equipId })
        .then(function(res) {
          return res.data;
        });
    }

    function updateEquip(equipment) {
      return $http
        .put('/api/equipment/' + equipment._id, equipment)
        .then(function(res) {
          return res.data;
        });
    }

  }

})();
