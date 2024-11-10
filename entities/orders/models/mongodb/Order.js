const { default: mongoose } = require("mongoose");
const { PHONE } = require("../../../../helpers/mongodb/mongooseValidators");
const Address = require("../../../../helpers/mongodb/Address");

const orderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId();
        }
    },
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
        },
        _id: false
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
