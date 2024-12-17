const express = require("express");
const chalk = require("chalk");
const fs = require("fs")
const path = require("path")
const connectToDb = require("./DB/dbService");
const router = require("./routes/router");
const corsMiddleware = require("./middlewares/cors");
const addInitialCustomers = require("./initialEntities/initialCustomers");
const addInitialOrders = require("./initialEntities/initialOrders");
const addInitialProducts = require("./initialEntities/initialProducts");

const app = express();
const PORT = 8181;

app.use(corsMiddleware);
app.use(express.json());

app.use(router);

app.listen(PORT, async () => {
    console.log(chalk.yellow("App is listening on port " + PORT));
    fs.mkdirSync('logs', { recursive: true });
    await connectToDb();
    await addInitialProducts();
    await addInitialCustomers();
    await addInitialOrders();
});
