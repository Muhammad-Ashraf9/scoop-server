const express = require("express");

const {
  productValidation,
} = require("../middlewares/validation/productValidation");

const { addProduct } = require("../controllers/productController");

const validator = require("../middlewares/validation/validator");

const router = express.Router();

router.route("/").post(productValidation(), validator, addProduct);

module.exports = router;
