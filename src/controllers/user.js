const controller = {}

//imports
const { User } = require('../models').sequelizeModels;

controller.list = async () => {
  try {
    const response = await User.findAll()
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

//get user by id
controller.get = async (params) => {
  try {
    const { id } = params;

    const response = await User.findOne({
      where: { id: id }

    })
    return response

  } catch (e) {
    console.log(e);
    throw e;
  }
}

//delete user
controller.delete = async (params) => {
  try {

    const { id } = params;

    const response = await User.destroy({
      where: { id: id }
    })
    return response;

  } catch (e) {
    console.log(e);
    throw e;
  }
}

//update user
controller.update = async (params) => {

  try {

    const { id, name, email, password } = params;

    const response = await User.update({
      name: name,
      email: email,
      password: password

    }, {
      where: { id: id }
    })
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}




module.exports = controller;