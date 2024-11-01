const express = require("express");
const router = express.Router();

const { handleError } = require("../../../utils/handleErrors");
const { placeOrder, getAllOrders, getOrderById, updateOrderStatus } = require("../models/ordersAccessDataService");
const { updateOrders } = require("../../customers/models/customersAccessDataService");

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
router.patch("/updateOrderStatus", async (req, res) => {
    try {
        const { orderId } = req.body
        const { newStatus } = req.body
        let updatedCustomerWithOrders = await updateOrderStatus(orderId, newStatus)
        res.send(updatedCustomerWithOrders)
    } catch (err) {
        req.errorMessage = err.message || "Failed fetching order or update order status"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.patch("/updateOrders", async (req, res) => {
    try {
        const { customerId } = req.body
        const { orderId } = req.body
        let updatedCustomerWithOrders = await updateOrders(customerId, orderId)
        res.send(updatedCustomerWithOrders)
    } catch (err) {
        req.errorMessage = err.message || "Failed fetching customer or saving order id in customer"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        let order = getOrderById(id)
        res.send(order)
    } catch (err) {
        req.errorMessage = err.message || "Failed fetching order"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})

module.exports = router;
