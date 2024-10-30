const mongoose = require("mongoose");
const Address = require("../../../../helpers/mongodb/Address");
const { PHONE } = require("../../../../helpers/mongodb/mongooseValidators");

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
    productsInOrder: {
        type: Number,
        required: true
    },
    quantityInOrder: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
