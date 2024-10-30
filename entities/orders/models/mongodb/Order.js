const { default: mongoose } = require("mongoose");
const { PHONE } = require("../../../../helpers/mongodb/mongooseValidators");
const Address = require("../../../../helpers/mongodb/Address");

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    phone: PHONE,
    address: Address,
    productsAndQuantity: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
