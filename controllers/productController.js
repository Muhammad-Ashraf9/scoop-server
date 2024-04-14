const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/SubCategory");

exports.addProduct = async (req, res, next) => {
  try {
    const { category, subcategory } = req.body;

    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    if (subcategory && !foundCategory.subcategories.includes(subcategory)) {
      const error = new Error("Subcategory not found");
      error.statusCode = 404;
      throw error;
    }

    const product = await Product.create(req.body);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const {
      category,
      subcategory,
      page = 1,
      pageSize = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;
    const filter = {};

    if (category && !(await Category.findById(category))) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    } else if (category) {
      filter.category = category;
    }
    if (subcategory && !(await Subcategory.findById(subcategory))) {
      const error = new Error("Subcategory not found");
      error.statusCode = 404;
      throw error;
    } else if (subcategory) {
      filter.subcategory = subcategory;
    }


    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .sort({ [sort]: order })
        .limit(Number(pageSize))
        .skip((Number(page) - 1) * Number(pageSize))
        .populate("category")
        .populate("subcategory"),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({ products, totalCount });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
