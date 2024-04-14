const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

exports.addCategory = async (req, res, next) => {
  try {
    const { name, description, subcategories = [] } = req.body;
    const lowercaseName = name.toLowerCase();

    const existingCategory = await Category.findOne({ name: lowercaseName });
    if (existingCategory) {
      const error = new Error("Category already exists");
      error.statusCode = 409; 
      return next(error);
    }

    const subcategoriesIds = await Promise.all(
      subcategories.map(async (subcategory) => {
        const lowercaseSubcategoryName = subcategory.name.toLowerCase();
        const newSubcategory = new SubCategory({
          name: lowercaseSubcategoryName,
        });
        const savedSubcategory = await newSubcategory.save();
        return savedSubcategory._id;
      })
    );

    const newCategory = new Category({
      name: lowercaseName,
      description,
      subcategories: subcategoriesIds,
    });
    const savedCategory = await newCategory.save();

    res.status(201).json({ category: savedCategory });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).populate("subcategories");
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};
