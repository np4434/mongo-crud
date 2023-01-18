const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  firstName: { type: String, default: null },

  lastName: { type: String, default: null },

  companyName: { type: String },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: { type: String, require: true },

  phone: { type: Number, default: null },

  token: { type: String },
});

module.exports = mongoose.model("Employee", empSchema);
