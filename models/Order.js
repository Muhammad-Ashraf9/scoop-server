const mongoose = require("mongoose");

const addressSchema = require("./Address");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        product: { type: Object, required: true }, //if product is deleted, updated, we can still have the product details in the order
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity can not be less then 1."],
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userNote: { type: String },
    address: addressSchema,
    status: { type: String, default: "pending" },
    total: { type: Number, required: true },

    payment: {
      method: { type: String, required: true },
      status: { type: String, default: "pending" },
    },
    delivery: {
      method: { type: String, required: true },
      status: { type: String, default: "pending" },
    },
  },
  { timestamps: true }
);

model.exports = mongoose.model("Order", orderSchema);
