const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidators");

const Image = new mongoose.Schema({
  url: {
    ...URL,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  alt: {
    ...DEFAULT_VALIDATION,
    required: false,
    default: "User Image"
  },
  _id: false

});

module.exports = Image;
