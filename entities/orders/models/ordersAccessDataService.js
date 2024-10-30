const { createError } = require("../../../utils/handleErrors")
const Order = require("./mongodb/Order")

const placeOrder = async (orderDetails) => {
    try {
        let order = new Order(orderDetails)
        order = await order.save()
    } catch (err) {
        return createError("Mongoose", err)
    }
}
const getAllOrders = async () => {
    try {
        let allOrders = Order.find()
        return allOrders
    } catch (err) {
        console.log(err);

    }
}

module.exports = { placeOrder, getAllOrders }