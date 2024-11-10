const { generateAuthToken } = require("../../../auth/providers/jwt");
const { generateUserPassword, comaprePasswords } = require("../helpers/bcrypt");
const Customer = require("./mongodb/Customer")
const chalk = require("chalk");



const registerCustomer = async (customerDetails) => {
    try {
        customerDetails.password = generateUserPassword(customerDetails.password);
        let customer = new Customer(customerDetails)
        customer = await customer.save()
        const email = customerDetails.email
        let customerFromDB = await Customer.findOne({ email })
        let token = generateAuthToken(customerFromDB)
        return token
    } catch (err) {
        console.log(err);
        throw err
    }
}

const loginCustomer = async (email, password) => {
    try {
        const findCustomer = await Customer.findOne({ email })


        if (!findCustomer) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return false
        }

        if (!comaprePasswords(password, findCustomer.password)) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return false
        }


        let token = generateAuthToken(findCustomer)

        return token

    } catch (err) {
        console.log(err);
        throw err

    }
}
const getAllCustomers = async () => {
    try {
        const customers = await Customer.find()
        return customers
    } catch (err) {
        console.log(err);

    }
}

const getCustomerById = async (id) => {
    try {
        const customer = await Customer.findById(id)
        return customer
    } catch (err) {
        console.log(err);

    }
}
const addToCart = async (id, itemToCart) => {
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            const error = new Error(
                "A customer with this ID cannot be found in the database"
            );
            error.status = 404;
            return console.log("Mongoose", error);
        }

        customer.cart = itemToCart.product

        await customer.save();
        return customer;
    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};
const updateBusiness = async (id) => {
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            const error = new Error(
                "A customer with this ID cannot be found in the database"
            );
            error.status = 404;
            return console.log("Mongoose", error);
        }

        customer.isBusiness = true

        await customer.save();
        let token = generateAuthToken(customer)
        return token;
    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};
const updateOrders = async (customerId, orderId) => {
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            const error = new Error(
                "A customer with this ID cannot be found in the database"
            );
            error.status = 404;
            return console.log("Mongoose", error);
        }

        const orderIndex = customer.orders.indexOf(orderId);

        if (orderIndex > -1) {
            customer.orders.splice(orderIndex, 1);
        } else {
            customer.orders.push(orderId);
        }

        await customer.save();
        return customer
    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};
const sendContactMessage = async (message, customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            const error = new Error(
                "A customer with this ID cannot be found in the database"
            );
            error.status = 404;
            return console.log("Mongoose", error);
        }
        customer.messages.push({ message: message })
        await customer.save()
        return customer

    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
}
const deleteContactMessage = async (message, customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            const error = new Error("A customer with this ID cannot be found in the database");
            error.status = 404;
            return console.log("Mongoose", error);
        }

        const messageIndex = customer.messages.findIndex(
            (msg) => msg.message === message
        );

        if (messageIndex === -1) {
            const error = new Error("Message not found in customer's messages");
            error.status = 404;
            return console.log("Mongoose", error);
        }

        customer.messages.splice(messageIndex, 1);
        await customer.save();

        return customer;

    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};
const likeProduct = async (productId, customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            const error = new Error("A customer with this ID cannot be found in the database");
            error.status = 404;
            return console.log("Mongoose", error);
        }

        const productIndex = customer.likes.indexOf(productId);

        if (productIndex === -1) {
            customer.likes.push(productId);
        } else {
            customer.likes.splice(productIndex, 1);
        }

        await customer.save();

        return customer;

    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};

module.exports = { registerCustomer, loginCustomer, getAllCustomers, getCustomerById, addToCart, updateBusiness, updateOrders, sendContactMessage, deleteContactMessage, likeProduct }