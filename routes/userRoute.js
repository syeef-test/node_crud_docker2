const express = require("express");

const router = express.Router();

const userController = require("../controllers/userControllers");

//CRUD routes user

router.get("/", userController.getUsers);
router.get("/userId", userController.getUser);
router.post("/", userController.createUser);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
