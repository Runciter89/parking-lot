const user = {}

//imports
var Users = require('../Models/Users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//singup
user.singup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    const existinUser = await Users.findOne({
      where: { email: email }
    })
    console.log(existinUser)
    if (existinUser) {
      return res.status(400).json({ messaje: "User Alredy Exist" });

    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await Users.create({
      name: name,
      password: hashedPassword,
      email: email
    });

    const token = jwt.sign({ Id: response.id, email: response.email },
      process.env.API_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    res.status(201).json({ user: response, token: token });

  }
  catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//login
user.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const existinUser = await Users.findOne({
      where: { email: email }
    })

    if (!existinUser) {
      return res.status(404).json({ messaje: "User Not Found" });

    }

    const matchPassword = await bcrypt.compare(password, existinUser.password);
    if (!matchPassword) {
      return res.status(400).json({ messaje: "Wrong Password" });
    }
    const token = jwt.sign({ Id: existinUser.id, email: existinUser.email },
      process.env.API_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    res.status(201).json({ user: existinUser, token: token });

  }
  catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//users list
user.list = async (req, res) => {
  try {
    const response = await Users.findAll({


    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//get user by id
user.get = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Users.findOne({
      where: { id: id }

    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//delete user
user.delete = async (req, res) => {
  try {

    const { id } = req.params;

    const response = await Users.destroy({
      where: { id: id }
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//update user
user.update = async (req, res) => {

  try {

    const { id, name, email, password } = req.body;

    const response = await Users.update({
      name: name,
      email: email,
      password: password

    }, {
      where: { id: id }
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}




module.exports = user;