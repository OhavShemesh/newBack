const express = require("express");
const customersRouterController = require("../entities/customers/routes/customersRestController");
const productsRouterController = require("../entities/products/routes/productsRestController");

const router = express.Router();

router.use("/customers", customersRouterController);
router.use("/products", productsRouterController);


module.exports = router;
