const mongoose = require("mongoose");
const addressSchema = require("./Address");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Name can not exceed 50 characters"],
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: [addressSchema],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    role: { type: String, default: "customer", enum: ["customer", "admin"] },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], //handle product deletion
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
