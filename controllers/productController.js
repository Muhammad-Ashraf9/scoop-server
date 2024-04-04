const Product = require("../models/Product");

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};
