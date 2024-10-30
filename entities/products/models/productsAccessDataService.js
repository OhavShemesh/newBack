const { createError } = require("../../../utils/handleErrors");
const Product = require("./mongodb/product");

const createProduct = async (productDetails) => {
    try {
        let product = new Product(productDetails)
        product = await product.save()
        return product
    } catch (err) {
        return createError("Mongoose", err);

    }

}

const getAllProducts = async () => {
    try {
        let allProducts = await Product.find()
        return allProducts

    } catch (err) {
        return createError("Mongoose", err);

    }
}

const getProductById = async (id) => {
    try {
        let product = await Product.findById(id)
        return product
    } catch (err) {
        return createError("Mongoose", err);
    }
}

const updateProduct = async (id, details) => {
    try {
        let product = await Product.findByIdAndUpdate(id, details)
        return product

    } catch (err) {
        return createError("Mongoose", err);

    }
}
const deleteProduct = async (id) => {
    try {
        let product = await Product.findByIdAndDelete(id)
        return product

    } catch (err) {
        return createError("Mongoose", err);

    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }