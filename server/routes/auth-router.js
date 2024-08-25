const AuthController = require("../controllers/auth-controller");
const express = require("express");

const router = express.Router();


// existing user login requests
router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

// Handles password reset requests
router.post('/reset-password', AuthController.resetPassword);


module.exports = router
