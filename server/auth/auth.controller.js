var jwt = require('jsonwebtoken');
var config = require('../config/config');

var User = require('../users/user.model');

module.exports = {

  register: function(req, res) {
    var newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.username = req.body.username;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.email = req.body.email;

    newUser.save(function(err, user) {
      if (err)
        res.send(err);
      else {
        // var expires = moment().add(3, 'days').format('x');
        var token = jwt.sign({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }, config.secretKey, { expiresIn: 3600 }); // { expiresIn: 600 } expires in 10 minutesa
        res.status(200).json({
          token: token,
          message: 'Registration successful'
        });
      }
    });
  },

  login: function(req, res) {
    User.findOne({ username : req.body.username }, function(err, user) {
      if (user) {
        if (!user.validPassword(req.body.password))
          res.status(400).send('Wrong password. Try again');
        else {
          var token = jwt.sign({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          }, config.secretKey, { expiresIn: 3600 });
          res.status(200).json({
            token: token,
            message: 'Login successful'
          });
        }
      }
      else res.status(401).send('User not found');
    });
  },

  update: function(req, res) {
    console.log(User);
    User.findById(req.user.id, function(err, user) {
      if (user) {
        if (!user.validPassword(req.body.oldPassword))
          res.status(400).send('Old password incorrect. Try again');
        else {
          var newHash = user.generateHash(req.body.newPassword);
          User.findByIdAndUpdate(user.id, { $set: { password: newHash }}, { new: true }, function(err, equip) {
            if (err) res.send(err);
            else {
              res.status(200).json({
                message: 'Update successful.'
              });
            }
          });
        }
      }
      else {
        res.status(401).send('User not found');
      }
    });
  }

};
