const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    });

module.exports = mongoose.model("SubCategory", subcategorySchema);