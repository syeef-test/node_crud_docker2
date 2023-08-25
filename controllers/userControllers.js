const userModel = require("../models/userModel");

//CRUD Controllers

//GET ALL USERS
exports.getUsers = async (req, res, next) => {
  try {
    const userDetails = userModel.findAll();
    if (userDetails) {
      res.status(200).json({ users: userDetails });
    }
  } catch (err) {
    console.log(err);
  }
};

//GET USER BY ID
exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userDetails = userModel.findByPk(userId);
    if (userDetails) {
      res.status(200).json({ user: userDetails });
    } else {
      res.status(400).json({ message: "No User Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//Create User

exports.createUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const userDetails = userModel.create({ name: name, email: email });
    if (userDetails) {
      res
        .status(201)
        .json({ message: "User Created Succesfully", user: userDetails });
    }
  } catch (err) {
    console.log(err);
  }
};

//Update User

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const name = req.body.name;
    const email = req.body.email;

    const user = userModel.findByPk(userId);
    if (user) {
      const userDetails = userModel.update(
        { name: name, email: email },
        { where: { id: userId } }
      );
      if (userDetails) {
        res.status(200).json({
          message: "User Upadted Succesfully",
          user: userDetails,
        });
      }
    } else {
      res.status(401).json({
        message: "No User Found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//DELETE USER

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = userModel.findByPk(userId);
    if (!user) {
      res.status(401).json({
        message: "No User Found",
      });
    } else {
      const user = await userModel.destroy({ where: { id: userId } });
      if (user) {
        res.status(200).json({
          message: "User Deleted",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
