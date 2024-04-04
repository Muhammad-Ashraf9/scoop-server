const express = require("express");

const {
  productValidation,
} = require("../middlewares/validation/productValidation");

const { addProduct, getProducts } = require("../controllers/productController");

const validator = require("../middlewares/validation/validator");
const { authorize } = require("../middlewares/authorizationMW");
const authenticate = require("../middlewares/authenticationMW");

const router = express.Router();

router.route("/").get(getProducts);
router.use(authenticate, authorize("admin"));
router.route("/").post(productValidation(), validator, addProduct);

module.exports = router;
