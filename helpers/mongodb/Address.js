const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Address = new mongoose.Schema({
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  zip: {
    type: Number,
    default: 0,
  },
  _id: false

});

module.exports = Address;
