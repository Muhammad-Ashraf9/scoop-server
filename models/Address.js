const mongoose = require("mongoose");

 const addressSchema = new mongoose.Schema(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  { _id: false }
);

module.exports = addressSchema;