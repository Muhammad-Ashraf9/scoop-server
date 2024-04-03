// require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ message: "logged in successfully", token });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    // instead we can send an email to the user with a link to verify their email

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res
      .status(201)
      .json({ message: "customer created successfully", token });
  } catch (err) {
    next(err);
  }
};
