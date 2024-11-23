const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDb = require("./mongodb/connectToAtlas");

const ENVIRONMENT = process.env.ENVIRONMENT || "development";
console.log("ENVIRONMENT-", ENVIRONMENT);

const connectToDb = async () => {
  if (ENVIRONMENT === "development") {
    console.log("Connecting to local database...");
    await connectToLocalDb();
  }
  if (ENVIRONMENT === "production") {
    console.log("Connecting to production database...");
    await connectToAtlasDb();
  }
};

module.exports = connectToDb;
