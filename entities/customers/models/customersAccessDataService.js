const { generateAuthToken } = require("../../../auth/providers/jwt");
const { generateUserPassword, comaprePasswords } = require("../helpers/bcrypt");
const Customer = require("./mongodb/Customer")


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
    console.log(password);

    try {
        const findCustomer = await Customer.findOne({ email })

        if (!findCustomer) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return error
        }

        if (!comaprePasswords(password, findCustomer.password)) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return error
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

module.exports = { registerCustomer, loginCustomer, getAllCustomers, getCustomerById, addToCart, updateBusiness }