const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDb = require("./mongodb/connectToAtlas");

const config = require("config");
console.log(config);

const ENVIRONMENT = config.get("ENVIRONMENT");
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
