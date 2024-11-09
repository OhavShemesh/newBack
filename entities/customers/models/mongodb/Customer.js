const mongoose = require("mongoose");
const Image = require("../../../../helpers/mongodb/Image");
const Name = require("../../../../helpers/mongodb/Name");
const { PHONE, EMAIL, DEFAULT_VALIDATION } = require("../../../../helpers/mongodb/mongooseValidators");
const Address = require("../../../../helpers/mongodb/Address");

const customerSchema = new mongoose.Schema({
    name: Name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: Image,
    address: Address,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    cart: [{
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

    orders: {
        type: [String]
    },
    messages: [{
        message: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isBusiness: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
