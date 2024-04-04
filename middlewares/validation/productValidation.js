const { body } = require("express-validator");

exports.productValidation = () => [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("description")
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage("Description must be between 2 and 500 characters"),
  body("category")
    .trim()
    .isMongoId()
    .withMessage("Category must be a valid MongoDB ID"),
  body("subcategory")
    .trim()
    .isMongoId()
    .withMessage("Subcategory must be a valid MongoDB ID"),
  //price is required and must be a number more than 0
  body("price")
    .trim()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
  //discountedPrice is optional and must be a number more than 0 less than price
  body("discountedPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Discounted price must be a number greater than 0")
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error("Discounted price must be less than price");
      }
      return true;
    }),
  //images is optional and must be an array of strings
  body("images")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Images must be an array of strings"),
  //sizes is optional and must be an array of strings
  body("sizes")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Sizes must be an array of strings"),
  //flavors is optional and must be an array of strings
  body("flavors")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Flavors must be an array of strings"),
  //inventory is required and must be a number more than 0
  body("inventory")
    .trim()
    .isInt({ min: 0 })
    .withMessage("Inventory must be a number greater than or equal to 0"),
  //tags is optional and must be an array of strings
  body("tags")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Tags must be an array of strings"),
];
