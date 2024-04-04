const express = require("express");
const { signin, signup } = require("../controllers/authController");
const {
  signinValidation, signupValidation,
} = require("../Middlewares/validation/authValidation");
const validator = require("../middlewares/validation/validator");

const router = express.Router();

router.post("/signup", signupValidation(), validator, signup);
router.post("/signin", signinValidation(), validator, signin);

module.exports = router;
