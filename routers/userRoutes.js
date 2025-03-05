const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.post("/register", userController.registerUser);
router.get("/", userController.getAllUsers);
router.get("/register", userController.getRegister);
router.get("/login", userController.getLogin);
router.get("/:id", userController.getUserById);

module.exports = router;
