const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    image: { type: String, required: true },
    quote: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
