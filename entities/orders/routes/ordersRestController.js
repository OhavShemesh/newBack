const express = require("express");
const router = express.Router();

const { handleError } = require("../../../utils/handleErrors");
const { placeOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../models/ordersAccessDataService");
const { updateOrders } = require("../../customers/models/customersAccessDataService");
const auth = require("../../../auth/authService");

router.post("/", async (req, res) => {
    try {
        let order = await placeOrder(req.body)
        res.send(order)
    } catch (err) {
        req.errorMessage = err.message || "Failed to create new order"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;

        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can get all users info"
            );
        }

        let allOrders = await getAllOrders()
        res.send(allOrders)
    } catch (err) {
        req.errorMessage = err.message || "Failed to create new order"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.patch("/updateOrderStatus", auth, async (req, res) => {
    try {
        const { orderId } = req.body
        const { newStatus } = req.body
        const userInfo = req.user;

        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can get all users info"
            );
        }

        let updatedCustomerWithOrders = await updateOrderStatus(orderId, newStatus)
        res.send(updatedCustomerWithOrders)
    } catch (err) {
        req.errorMessage = err.message || "Failed updating order status"
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
        req.errorMessage = err.message || "Failed updating customer orders"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.get("/:id", auth, async (req, res) => {
    try {

        const { id } = req.params

        let order = await getOrderById(id)
        res.send(order)
    } catch (err) {
        req.errorMessage = err.message || "Failed fetching order"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params

        let order = deleteOrder(id)
        res.send(order)
    } catch (err) {
        req.errorMessage = err.message || "Failed deleting order"
        return handleError(res, err.status || 400, req.errorMessage);

    }
})

module.exports = router;
