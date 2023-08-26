const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/user/add-user", userController.addUser);

router.get("/user/get-user", userController.getUser);

router.put("/user/edit-user/:id", userController.editUser);

router.delete("/user/delete-user/:id", userController.deleteUser);

module.exports = router;