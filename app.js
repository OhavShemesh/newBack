const express = require("express");
const chalk = require("chalk");
require("dotenv").config();
const connectToDb = require("./DB/dbService");
const router = require("./routes/router");
const corsMiddleware = require("./middlewares/cors");
const addInitialCustomers = require("./initialEntities/initialCustomers");
const addInitialOrders = require("./initialEntities/initialOrders");
const addInitialProducts = require("./initialEntities/initialProducts");

const app = express();
const PORT = process.env.PORT || 8181;

app.use(corsMiddleware);
app.use(express.json());

app.use(router);

app.listen(PORT, async () => {
    console.log(chalk.yellow("app is listening to port " + PORT));
    await connectToDb();
    await addInitialProducts()
    await addInitialCustomers()
    await addInitialOrders()
});
