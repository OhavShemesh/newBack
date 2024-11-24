const { createError } = require("../../../utils/handleErrors")
const Order = require("./mongodb/Order")
const fs = require("fs")
const path = require("path")

const placeOrder = async (orderDetails) => {
    try {
        let order = new Order(orderDetails)

        order = await order.save()

        const logsFolderPath = path.resolve(__dirname, '../../../logs/orders');
        const newOrdersFolderPath = path.join(logsFolderPath, 'New Orders');
        const newOrdersFilePath = path.join(newOrdersFolderPath, `${order._id}.txt`);

        function formatTimestamp(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }

        const TimeStamp = { CreatedAt: formatTimestamp(new Date()) };
        fs.mkdirSync(newOrdersFolderPath, { recursive: true });
        fs.writeFileSync(newOrdersFilePath, JSON.stringify(orderDetails, null, 2));
        fs.appendFileSync(newOrdersFilePath, `\n${JSON.stringify(TimeStamp, null, 2)}`);




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

const deleteOrder = async (id) => {
    try {

        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            const error = new Error(
                "A order with this ID cannot be found in the database"
            );
            error.status = 404;
            return console.log("Mongoose", error);
        }

        return order
    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};



module.exports = { placeOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder }