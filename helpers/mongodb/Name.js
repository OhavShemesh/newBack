const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Name = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: {
    ...DEFAULT_VALIDATION,
    required: false,
    validate: {
      validator: function (v) {
        return v === undefined || v.length >= 2;
      },
      message: props => `${props.value} is shorter than the minimum allowed length (2).`,
    },
  },
  last: DEFAULT_VALIDATION,
  _id: false
});

module.exports = Name;
