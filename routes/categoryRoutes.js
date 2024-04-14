const express = require("express");
const {
  addCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticationMW");
const { authorize } = require("../middlewares/authorizationMW");
const { ADMIN } = require("../utils/common/roles");
const router = express.Router();

router.route("/").get(getAllCategories);
router.use(authenticate, authorize(ADMIN));
router.route("/").post(addCategory);

module.exports = router;
