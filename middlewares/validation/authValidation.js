const { body, param, check } = require("express-validator");

exports.signinValidation = () => [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 6 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character"
    ),
];
exports.signupValidation = () => [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 6 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character"
    ),
];
