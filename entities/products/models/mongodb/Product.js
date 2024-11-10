const mongoose = require("mongoose");
const Image = require("../../../../helpers/mongodb/Image");
const { DEFAULT_VALIDATION, URL } = require("../../../../helpers/mongodb/mongooseValidators");

const productsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId();
        }
    },
    name: DEFAULT_VALIDATION,
    description: DEFAULT_VALIDATION,
    price: {
        type: Number,
        required: true,
        match: {
            validator: (value) => {
                return RegExp(/^(\d+)\.(\d{2})$/).test(value);
            },
            message: 'Price must be in the format of a number with exactly two decimal places (e.g., 13.00).'
        }
    },
    image: {
        url: { ...URL, required: true },
        alt: DEFAULT_VALIDATION
    },
    inStock: {
        type: Number,
        min: 0,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Tools', 'Garden', 'Furniture'],
        message: '{VALUE} is not a valid category'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model("products", productsSchema);

module.exports = Product;
