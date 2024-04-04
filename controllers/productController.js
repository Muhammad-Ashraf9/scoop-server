const Product = require("../models/Product");

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
}
