const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  productionCenter: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Form", formSchema);
