var Equipment = require('./equipment.model');

module.exports = {

  getEquipment: function(req, res) {
    Equipment.find({}, function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  },

  getEquipmentById: function(req, res) {
    Equipment.findById(req.params.id).populate('repairs.createdBy').exec(function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  },


  readOne: function(req, res) {
    Rental.findById(req.params.id).populate('repairs.createdBy').exec(function(err, rental) {
      if (err) res.send(err);
      else res.json(rental);
    });
  },

  addEquipment: function(req, res) {
    var newEquipment = new Equipment(req.body);

    newEquipment.save(function(err, equip) {
      if (err) res.status(400).send(err);
      else res.status(200).json(equip);
    });
  },

  editEquipment: function(req, res) {
    Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  },

  removeEquipment: function(req, res) {
    Equipment.findByIdAndRemove(req.params.id, function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  },

  addRepair: function(req, res) {
    var repairObj = {};
    repairObj.type = req.body.repair.type;
    repairObj.notes = req.body.repair.notes;
    repairObj.createdBy = req.user.id;

    Equipment.findByIdAndUpdate(req.params.id, { $push: {repairs: repairObj}, $inc: {timesRepaired: 1} }, function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
  },

  checkOut: function(req, res) {
    Equipment.findByIdAndUpdate(req.params.id, {checkedOut: true, $inc: {timesRented: 1}}, function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
  },

  checkIn: function(req, res) {
    Equipment.findByIdAndUpdate(req.params.id, {checkedOut: false}, function(err, result) {
      if (err) res.send(err);
      else res.send(result);
    });
  }

};
