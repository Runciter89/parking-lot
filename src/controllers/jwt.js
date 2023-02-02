const controller = {}

var { User } = require('../models').sequelizeModels;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Debugger = require('debug');
const { Error } = require('sequelize');

const debug = Debugger('api:controller:jwt')

controller.validateToken = async (authHeader) => {
  debug('validateToken', authHeader)
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer') throw new Error('invalid format. Bearer token expected')
  const user = await jwt.verify(token, process.env.JWT_SECRET)
  return user
}


module.exports = controller;