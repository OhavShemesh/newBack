const { createError } = require("../../../utils/handleErrors");
const Product = require("./mongodb/Product");
const fs = require("fs")
const path = require("path")

const createProduct = async (productDetails) => {
    try {
        let product = new Product(productDetails)
        product = await product.save()

        const logsFolderPath = path.resolve(__dirname, '../../../logs/products');
        const NewProductsFolderPath = path.join(logsFolderPath, 'New Products');
        const NewProductsFilePath = path.join(NewProductsFolderPath, `NewProduct - ${productDetails?.name}.txt`);
        function formatTimestamp(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }

        const TimeStamp = { CreatedAt: formatTimestamp(new Date()) }; fs.mkdirSync(NewProductsFolderPath, { recursive: true });

        fs.mkdirSync(NewProductsFolderPath, { recursive: true });
        fs.writeFileSync(NewProductsFilePath, JSON.stringify(productDetails, null, 2));
        fs.appendFileSync(NewProductsFilePath, `\n${JSON.stringify(TimeStamp, null, 2)}`);





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
        product = await product.save()
        return product

    } catch (err) {
        return createError("Mongoose", err);

    }
}
const deleteProduct = async (id) => {
    try {
        let product = await Product.findByIdAndDelete(id)

        const logsFolderPath = path.resolve(__dirname, '../../../logs/products');
        const NewProductsFolderPath = path.join(logsFolderPath, 'Deleted Products');
        const NewProductsFilePath = path.join(NewProductsFolderPath, `DeletedProduct - ${product?.name}.txt`);
        function formatTimestamp(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }

        const loginTimestamp = { DeletedAt: formatTimestamp(new Date()) }; fs.mkdirSync(NewProductsFolderPath, { recursive: true });

        fs.mkdirSync(NewProductsFolderPath, { recursive: true });
        fs.writeFileSync(NewProductsFilePath, JSON.stringify(product, null, 2));
        fs.appendFileSync(NewProductsFilePath, `\n${JSON.stringify(loginTimestamp, null, 2)}`);





        return product

    } catch (err) {
        return createError("Mongoose", err);

    }
}
const updateInStock = async (id, newStock) => {
    try {
        let product = await Product.findById(id)
        product.inStock = newStock
        product = await product.save()
        return product

    } catch (err) {
        return createError("Mongoose", err);

    }
}
const updateStockAfterOrder = async (id, subFromStock) => {
    try {
        let product = await Product.findById(id)
        product.inStock = product.inStock - subFromStock
        product = await product.save()
        return product

    } catch (err) {
        return createError("Mongoose", err);

    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, updateInStock, updateStockAfterOrder }