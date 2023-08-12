const mongoose = require("mongoose");

const centerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Production center Name"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please Enter Production center location"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Production center Description"],
  },
  numberOfWorkers: {
    type: Number,
    required: [true, "Please Enter Number of Workers at the Production center"],
  },
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  cardImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  displayImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Center", centerSchema);
