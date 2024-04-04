const express = require("express");

const {
  productValidation,
} = require("../middlewares/validation/productValidation");

const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const validator = require("../middlewares/validation/validator");
const { authorize } = require("../middlewares/authorizationMW");
const authenticate = require("../middlewares/authenticationMW");

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);

router.use(authenticate, authorize("admin"));

router.route("/").post(productValidation(), validator, addProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
