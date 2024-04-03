const express = require("express");
const { signin, signup } = require("../controller/authController");
const {
  signinValidation, signupValidation,
} = require("../Middlewares/validation/authValidation");
const validator = require("../Middlewares/validation/validator");

const router = express.Router();

router.post("/signup", signupValidation(), validator, signup);
router.post("/signin", signinValidation(), validator, signin);

module.exports = router;
