const mongoose = require("mongoose");

const connectToAtlasDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://OhavShemesh:JlRml1QCAuSxiBn9@mystoreserver.agqp8.mongodb.net/?retryWrites=true&w=majority&appName=MyStoreServer");
    console.log("Connected to MongoDB in atlas");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
};

module.exports = connectToAtlasDb;
