const Customer = require("../entities/customers/models/mongodb/Customer");
const { registerCustomer } = require("../entities/customers/models/customersAccessDataService");

const initialCustomersData = [
    {
        "_id": "6730a9f4e281caf51816c395",
        "name": {
            "first": "business",
            "last": "business",
        },
        "phone": "0545555555",
        "email": "business@email.com",
        "password": "Business123!@#",
        "image": {
            "url": "https://media.istockphoto.com/id/954805524/vector/gear-icon-vector-male-user-person-profile-avatar-symbol-on-cog-wheel-for-settings-and.jpg?s=612x612&w=0&k=20&c=-3RDhk49KIK3XUwbjB9P6UkQ0NLWRgBdnB7hrieR-pA=",
            "alt": "Business Icon",
        },
        "address": {
            "city": "Business City",
            "street": "Business Street",
            "houseNumber": 1,
            "zip": 10000,
        },
        "orders": ["6730ad549415b88ae4beaf80"],
        "isBusiness": true,
        "cart": [],
        "messages": [],
    },
    {
        "_id": "6730a9f4e281caf51816c399",
        "name": {
            "first": "regular",
            "last": "regular",
        },
        "phone": "0545555555",
        "email": "regular@email.com",
        "password": "Regular123!@#",
        "image": {
            "url": "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
            "alt": "reqular Icon",
        },
        "address": {
            "city": "Regular City",
            "street": "Regular Street",
            "houseNumber": 1,
            "zip": 10000,
        },
        "orders": ["6730ad549415b88ae4beaf83"],
        "isBusiness": false,
        "cart": [],
        "messages": [],
    },
];

const addInitialCustomers = async () => {
    try {
        const customers = await Customer.find();
        const existingEmails = customers.map(customer => customer.email);

        for (const initialCustomer of initialCustomersData) {
            if (!existingEmails.includes(initialCustomer.email)) {
                await registerCustomer(initialCustomer);
            }
        }

    } catch (err) {
        console.error("Error adding initial customers:", err);
    }
};

module.exports = addInitialCustomers;
