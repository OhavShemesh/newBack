const { generateAuthToken } = require("../../../auth/providers/jwt");
const formatTimestamp = require("../../../helpers/TimeStamp");
const { generateUserPassword, comaprePasswords } = require("../helpers/bcrypt");
const { findObjectDifferences } = require("../helpers/findChangesFunction");
const Customer = require("./mongodb/Customer")
const fs = require("fs")
const path = require("path")


const registerCustomer = async (customerDetails) => {
    try {
        customerDetails.password = generateUserPassword(customerDetails.password);
        let customer = new Customer(customerDetails)
        customer = await customer.save()
        const email = customerDetails.email
        let customerFromDB = await Customer.findOne({ email })
        let token = generateAuthToken(customerFromDB)

        const logsFolderPath = path.resolve(__dirname, '../../../logs/customers');
        const registrationFolderPath = path.join(logsFolderPath, 'registration');
        const registrationFilePath = path.join(registrationFolderPath, `NewUser - ${customerDetails?.email}.txt`);
        fs.mkdirSync(registrationFolderPath, { recursive: true });
        fs.writeFileSync(registrationFilePath, JSON.stringify(customerDetails, null, 2));

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

        const logsFolderPath = path.resolve(__dirname, '../../../logs/customers');
        const loginsFolderPath = path.join(logsFolderPath, 'logins');
        const loginsFilePath = path.join(loginsFolderPath, `${email}.txt`);


        const loginTimestamp = { LastLogin: formatTimestamp(new Date()) };
        fs.mkdirSync(loginsFolderPath, { recursive: true });
        fs.writeFileSync(loginsFilePath, JSON.stringify(findCustomer, null, 2));
        fs.appendFileSync(loginsFilePath, `\n${JSON.stringify(loginTimestamp, null, 2)}`);


        return token

    } catch (err) {
        console.log(err);
        throw err

    }
}

const handleChangePassword = async (email, newPassword) => {
    try {
        const customer = await Customer.findOne({ email: email })

        customer.password = generateUserPassword(JSON.stringify(newPassword))
        customer.save()
        return customer
    } catch (err) {
        console.log(err);

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

const getCusotmerByEmail = async (email) => {
    try {
        const customer = await Customer.findOne({ email: email });
        return customer
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

const updateCustomer = async (id, infoAfterChange) => {
    try {
        const customerBeforeChange = await Customer.findById(id);
        const customer = await Customer.findByIdAndUpdate(
            id,
            infoAfterChange,
            { new: true, runValidators: true }
        );

        const logsFolderPath = path.resolve(__dirname, '../../../logs/customers');
        const loginsFolderPath = path.join(logsFolderPath, 'Customers Detail Changes');
        const loginsFilePath = path.join(loginsFolderPath, `${id}.txt`);

        const Timestamp = formatTimestamp(new Date());

        fs.mkdirSync(loginsFolderPath, { recursive: true });

        const differences = findObjectDifferences(customerBeforeChange, infoAfterChange);

        const logEntries = differences.changes.map(change => {
            return `${Timestamp} - ${change}`;
        }).join("\n");

        if (fs.existsSync(loginsFilePath)) {
            fs.appendFileSync(loginsFilePath, `\n-----------------------------------------------------------------------------------\n${logEntries}\n`);
        } else {
            fs.writeFileSync(loginsFilePath, logEntries + "\n");
        }

        await customer.save();
        return customer;
    } catch (error) {
        console.log("Mongoose", error);
        throw error;
    }
};


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

        customer.isBusiness = !customer.isBusiness;

        await customer.save();
        let token = generateAuthToken(customer)

        const logsFolderPath = path.resolve(__dirname, '../../../logs/customers');
        const loginsFolderPath = path.join(logsFolderPath, 'Status Changes');
        const loginsFilePath = path.join(loginsFolderPath, `${id}.txt`);


        const Timestamp = formatTimestamp(new Date());

        const logMessage = `${Timestamp} - ${customer.name.first} ${customer.name.middle} ${customer.name.last} status has changed to Business`;

        fs.mkdirSync(loginsFolderPath, { recursive: true });

        fs.writeFileSync(loginsFilePath, logMessage);

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

const deleteOrderFromCustomer = async (customerId, orderId) => {
    try {
        let customer = await Customer.findById(customerId);

        const orderIndex = customer.orders.findIndex(order => order.toString() === orderId.toString());

        if (orderIndex !== -1) {
            customer.orders.splice(orderIndex, 1);
            await customer.save();
        } else {
            console.log('Order not found');
        }
    } catch (err) {
        console.log("Mongoose", error);
        throw error;
    }
};


module.exports = { registerCustomer, loginCustomer, getAllCustomers, getCustomerById, addToCart, updateBusiness, updateOrders, sendContactMessage, deleteContactMessage, likeProduct, updateCustomer, deleteOrderFromCustomer, getCusotmerByEmail, handleChangePassword }