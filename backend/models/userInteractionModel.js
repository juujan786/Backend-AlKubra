const mongoose = require("mongoose");

const userInteractionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  productIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

module.exports = mongoose.model("UserInteraction", userInteractionSchema);
