const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    });

exports.SubCategory = mongoose.model("SubCategory", subcategorySchema);