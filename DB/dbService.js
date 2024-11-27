const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDb = require("./mongodb/connectToAtlas");
require("dotenv").config();

const config = require(`../config/${process.env.NODE_ENV.trim()}`);

const ENVIRONMENT = config.ENVIRONMENT;



const connectToDb = async () => {
  if (ENVIRONMENT === "development") {
    await connectToLocalDb();
  }
  if (ENVIRONMENT === "production") {
    await connectToAtlasDb();
  }
};

module.exports = connectToDb;
