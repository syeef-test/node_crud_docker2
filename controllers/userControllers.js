const userModel = require("../models/userModel");

//CRUD Controllers

//GET ALL USERS
exports.getUsers = async (req, res, next) => {
  try {
    const userDetails = await userModel.findAll();
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
    const userDetails = await userModel.findByPk(userId);
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
    console.log(name, email);
    const userDetails = await userModel.create({ name: name, email: email });
    if (userDetails) {
      res
        .status(201)
        .json({ message: "User Created Succesfully", user: userDetails });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid input data" });
  }
};

//Update User

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const name = req.body.name;
    const email = req.body.email;

    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }

    const userDetails = await user.update({ name: name, email: email });

    res.status(200).json({ message: "User Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid input data" });
  }
};

//DELETE USER

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.findByPk(userId);
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
