const express = require("express");
const customersRouterController = require("../entities/customers/routes/customersRestController");
const productsRouterController = require("../entities/products/routes/productsRestController");
const ordersRouterController = require("../entities/orders/routes/ordersRestController");

const router = express.Router();

router.use("/customers", customersRouterController);
router.use("/products", productsRouterController);
router.use("/orders", ordersRouterController);

module.exports = router;
