const Order = require("../entities/orders/models/mongodb/Order");
const { placeOrder } = require("../entities/orders/models/ordersAccessDataService");

const initialOrdersData = [
    {
        "_id": "6730ad549415b88ae4beaf80",
        "customer_id": "6730a9f4e281caf51816c395",
        "phone": "0545555555",
        "address": {
            "city": "business city",
            "street": "business street",
            "houseNumber": 1,
            "zip": 10000
        },
        "productsAndQuantity": [
            {
                "id": "66fffb4b850e9d483d87093d",
                "quantity": 2
            },
            {
                "id": "66fffb4f850e9d483d87093f",
                "quantity": 2
            }
        ],
        "status": "Pending",
    },
    {
        "_id": "6730ad549415b88ae4beaf83",
        "customer_id": "6730a9f4e281caf51816c399",
        "phone": "0545555555",
        "address": {
            "city": "Regular City",
            "street": "Regular Street",
            "houseNumber": 1,
            "zip": 10000,
        },
        "productsAndQuantity": [
            {
                "id": "66fffb61850e9d483d870947",
                "quantity": 2
            },
            {
                "id": "66fffb66850e9d483d87094c",
                "quantity": 2
            }
        ],
        "status": "Pending",
    }
];

const addInitialOrders = async () => {
    try {
        for (const orderData of initialOrdersData) {
            const existingOrder = await Order.findOne({ customer_id: orderData.customer_id });

            if (!existingOrder) {
                await placeOrder(orderData);
            }
        }

    } catch (err) {
        console.error("Error adding initial orders:", err);
    }
};

module.exports = addInitialOrders;
