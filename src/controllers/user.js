const controller = {}

//imports
const { User } = require('../models').sequelizeModels;

controller.list = async () => {
  try {
    const response = await User.findAll()
    return response;
  } catch (e) {
    throw e;
  }
}

//get user by id
controller.get = async (id) => {
  try {
    const response = await User.findOne({
      where: { id: id }

    })
    return response

  } catch (e) {
    throw e;
  }
}

//delete user
controller.delete = async (id) => {
  try {
    const response = await User.destroy({
      where: { id: id }
    })
    return response;

  } catch (e) {
    throw e;
  }
}

//update user
controller.update = async (id, data) => {

  try {

    const { name } = data;

    const response = await User.update({
      name,
    }, {
      where: { id: id }
    })
    return response;
  } catch (e) {
    throw e;
  }
}




module.exports = controller;