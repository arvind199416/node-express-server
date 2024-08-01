const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");
const userController = require("../controllers/userController");



// Protect all routes after this middleware
router.use(authController.protect);

router.get("/", userController.getProfile);

module.exports = router;
