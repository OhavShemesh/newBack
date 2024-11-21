const mongoose = require("mongoose");
require("dotenv").config();

const connectToAtlasDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://OhavShemesh:ITITeDyIghiECLO5@mystoreserver.agqp8.mongodb.net/MyStoreServer?retryWrites=true&w=majority");
    console.log("Connected to MongoDB in atlas");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
};

module.exports = connectToAtlasDb;
