const controller = {}

var { User } = require('../models').sequelizeModels;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Debugger = require('debug')

const debug = Debugger('api:controller:auth')

controller.signup = async (params) => {
  try {
    debug('params', params)
    let { name, email, password } = params;

    const existinUser = await User.findOne({
      where: { email: email }
    })
    debug('existinUser', existinUser)
    if (existinUser) {
      console.log("User Alredy Exist")
      throw new Error("User Alredy Exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    debug('hashedPassword', hashedPassword)

    const result = await User.create({
      name: name,
      password: hashedPassword,
      email: email
    });

    debug('createdUser', result)


    const token = jwt.sign({ Id: result.id, email: result.email },
      process.env.API_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    delete result.dataValues.password
    return { user: result, token };
  }
  catch (e) {
    console.log(e);
    throw e;
  }
}

controller.signin = async (params) => {
  try {
    let { email, password } = params;

    const existinUser = await User.findOne({
      where: { email: email }
    })
    if (!existinUser) {
      console.log("User Not Found")
      throw new Error("User Not Found")
    }

    const matchPassword = await bcrypt.compare(password, existinUser.password);
    if (!matchPassword) {
      console.log("Wrong Password")
      throw new Error("Wrong Password")
    }

    const token = jwt.sign({ Id: existinUser.id, email: existinUser.email },
      process.env.API_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    delete existinUser.dataValues.password
    return { user: existinUser, token: token };
  }
  catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = controller;