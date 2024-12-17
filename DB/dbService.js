const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDb = require("./mongodb/connectToAtlas");

const ENVIRONMENT = "production"



const connectToDb = async () => {
  if (ENVIRONMENT === "development") {
    await connectToLocalDb();
  }
  if (ENVIRONMENT === "production") {
    await connectToAtlasDb();
  }
};

module.exports = connectToDb;
