const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Name = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: {},
  last: DEFAULT_VALIDATION,
  _id: false
});

module.exports = Name;
