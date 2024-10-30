const express = require("express");
const router = express.Router();

const { handleError } = require("../../../utils/handleErrors");
const { placeOrder, getAllOrders } = require("../models/ordersAccessDataService");

router.post("/", async (req, res) => {
    try {
        let order = await placeOrder(req.body)
        res.send(order)
    } catch (err) {
        req.errorMessage = err.message || "Failed to create new order"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.get("/", async (req, res) => {
    try {
        let allOrders = await getAllOrders()
        res.send(allOrders)
    } catch (err) {
        req.errorMessage = err.message || "Failed to create new order"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})

module.exports = router;
