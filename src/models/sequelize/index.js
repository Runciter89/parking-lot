const User = require('./user')
const Vehicle = require('./vehicle')
const Register = require('./register')
const { literal, Op } = require('sequelize');
module.exports = {
  User,
  Vehicle,
  Register,
  util: {
    literal,
    Op
  }
}