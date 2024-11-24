const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDb = require("./mongodb/connectToAtlas");
require("dotenv").config();

const config = require(`../config/${process.env.NODE_ENV.trim()}`);

const ENVIRONMENT = config.ENVIRONMENT;
console.log(ENVIRONMENT);



const connectToDb = async () => {
  if (ENVIRONMENT === "development") {
    console.log("ENVIRONMENT is development");

    await connectToLocalDb();
  }
  if (ENVIRONMENT === "production") {
    console.log("ENVIRONMENT is production");

    await connectToAtlasDb();
  }
};

module.exports = connectToDb;
