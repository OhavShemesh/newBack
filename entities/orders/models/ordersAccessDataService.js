const { createError } = require("../../../utils/handleErrors")
const Order = require("./mongodb/Order")

const placeOrder = async (orderDetails) => {
    try {
        let order = new Order(orderDetails)
        order = await order.save()
        return order
    } catch (err) {
        return createError("Mongoose", err)
    }
}
const getAllOrders = async () => {
    try {
        let allOrders = Order.find()
        return allOrders
    } catch (err) {
        return createError("Mongoose", err)

    }
}

const getOrderById = async (id) => {
    try {
        let order = Order.findById(id)
        return order
    } catch (err) {
        return createError("Mongoose", err)

    }

}

const updateOrderStatus = async (id, newStatus) => {
    try {

        const order = await Order.findById(id);
        if (!order) {
            const error = new Error(
                "A order with this ID cannot be found in the database"
            );
            error.status = 404;
            return console.log("Mongoose", error);
        }
        order.status = newStatus

        await order.save();
        return order
    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};



module.exports = { placeOrder, getAllOrders, getOrderById, updateOrderStatus }