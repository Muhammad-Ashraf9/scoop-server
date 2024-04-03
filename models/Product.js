const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    images: [{ type: String }],
    sizes: [{ type: String }],
    flavors: [{ type: String }],
    inventory: { type: Number, required: true },
    tags: [{ type: String }],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
