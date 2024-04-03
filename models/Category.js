const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
