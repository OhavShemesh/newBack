const Product = require("../entities/products/models/mongodb/product");
const { createProduct } = require("../entities/products/models/productsAccessDataService");

const initialProductsData = [
    {
        "_id": "66fffb4b850e9d483d87093d",
        "name": "pliers",
        "description": "Versatile pliers for gripping and cutting.",
        "price": 9.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1471548792/vector/pliers-tool-icon-flat-style-illustration-of-pliers-tool-vector-icon-for-web-design.jpg?s=2048x2048&w=is&k=20&c=9unlqn1KOYN0vVm_92ybwAj7JmkOf36IqNOEvvlc3Uk=",
            "alt": "pliers"
        },
        "inStock": 10,
        "category": "Tools",
    },
    {
        "_id": "66fffb4f850e9d483d87093f",
        "name": "garden hose",
        "description": "Durable garden hose for watering plants.",
        "price": 34.99,
        "image": {
            "url": "https://media.istockphoto.com/id/2135706187/vector/green-garden-hose-for-watering-vector-flat-illustration.jpg?s=2048x2048&w=is&k=20&c=Ubr1_OKN_G913coxMcyuPblRTL2azu4dgbzQVKeJFVI=",
            "alt": "garden hose"
        },
        "inStock": 10,
        "category": "Garden",
    },

    {
        "_id": "66fffb5a850e9d483d870940",
        "name": "smartphone",
        "description": "High-end smartphone with large display.",
        "price": 799.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1582651421/vector/phone-screen.jpg?s=612x612&w=0&k=20&c=QaQt23boVGwBX4jLEKvzp3qhC7JiQ6JeJwd5ANYYfLI=",
            "alt": "smartphone"
        },
        "inStock": 10,
        "category": "Electronics",
    },
    {
        "_id": "66fffb5b850e9d483d870941",
        "name": "laptop",
        "description": "Lightweight laptop for everyday use.",
        "price": 1199.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1792849392/vector/laptop-with-transparent-screen-laptop-mockup-stock-royalty-free.jpg?s=612x612&w=0&k=20&c=OaebRShjJRr1JHN0kWdbl4jzd6m8V9oJ26QWP4Vs7Og=",
            "alt": "laptop"
        },
        "inStock": 10,
        "category": "Electronics",
    },
    {
        "_id": "66fffb5c850e9d483d870942",
        "name": "tablet",
        "description": "Portable tablet with 10-inch screen.",
        "price": 399.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1862623955/vector/new-tablet-screen-tablet-side-vertical-position.jpg?s=612x612&w=0&k=20&c=2AOzbAjzxewmy7wte1U7l_6fK7l93PsSbEd11SOTUU0=",
            "alt": "tablet"
        },
        "inStock": 10,
        "category": "Electronics",
    },
    {
        "_id": "66fffb5d850e9d483d870943",
        "name": "smartwatch",
        "description": "Smartwatch with fitness tracking.",
        "price": 199.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1660574150/vector/smart-watch-fitness-tracker-heart-rate-monitor-on-smart-watch.jpg?s=612x612&w=0&k=20&c=0fczqFmg484qAx6PJwXEgbsd7FxCZGmisd-ZCqEoVBA=",
            "alt": "smartwatch"
        },
        "inStock": 10,
        "category": "Electronics",
    },
    {
        "_id": "66fffb5e850e9d483d870944",
        "name": "wireless earbuds",
        "description": "Noise-canceling wireless earbuds.",
        "price": 149.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1830748184/photo/bluetooth-earbuds-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=a6HqqpQVJn5AcYYx3dqjs2amJsI8PTvTegDJgNGkfgA=",
            "alt": "wireless earbuds"
        },
        "inStock": 10,
        "category": "Electronics",
    },

    {
        "_id": "66fffb5f850e9d483d870945",
        "name": "hammer",
        "description": "Sturdy hammer for general use.",
        "price": 12.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1283087255/vector/hammer-icon-on-transparent-background.jpg?s=612x612&w=0&k=20&c=Ea0CYEUGgO5II4l6WlKGRvqE3Gt2V8YvLT-1mn5_0HE=",
            "alt": "hammer"
        },
        "inStock": 10,
        "category": "Tools",
    },
    {
        "_id": "66fffb60850e9d483d870946",
        "name": "screwdriver set",
        "description": "Set of precision screwdrivers.",
        "price": 15.99,
        "image": {
            "url": "https://media.istockphoto.com/id/173417294/photo/screwdrivers-work-tools-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=PZV4tG4nFfZXp9T---v3_jDQrccH-G-Lcbdqt7K9q0o=",
            "alt": "screwdriver set"
        },
        "inStock": 10,
        "category": "Tools",
    },
    {
        "_id": "66fffb61850e9d483d870947",
        "name": "wrench",
        "description": "Adjustable wrench for bolts.",
        "price": 8.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1410602221/vector/wrench-icon-flat-design.jpg?s=612x612&w=0&k=20&c=yshk1RAdtSkLQjmAHIC_6tJnf_UM0bwXo6jufRCTzMI=",
            "alt": "wrench"
        },
        "inStock": 10,
        "category": "Tools",
    },
    {
        "_id": "66fffb62850e9d483d870948",
        "name": "drill",
        "description": "Cordless drill with multiple speeds.",
        "price": 49.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1264194363/vector/electric-drill-solid-icon-house-repair-concept-drill-sign-on-white-background-electric-hand.jpg?s=612x612&w=0&k=20&c=IwPNBfahvfz-kABZ2S5dWQt76Fn22AH0OKraNx-nVGI=",
            "alt": "cordless drill"
        },
        "inStock": 10,
        "category": "Tools",
    },
    {
        "_id": "66fffb63850e9d483d870949",
        "name": "saw",
        "description": "Handsaw for woodworking.",
        "price": 14.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1277470472/vector/hand-saw-line-and-solid-icon-garden-and-gardening-concept-hacksaw-sign-on-white-background.jpg?s=612x612&w=0&k=20&c=0W_iS4CSNF7MGt40VHmIGjqrVJnzo4ns0Qqh7lfv9MY=",
            "alt": "handsaw"
        },
        "inStock": 10,
        "category": "Tools",
    },

    {
        "_id": "66fffb64850e9d483d87094a",
        "name": "rake",
        "description": "Garden rake for gathering leaves.",
        "price": 12.99,
        "image": {
            "url": "https://media.istockphoto.com/id/164268382/photo/leaf-rake-with-clipping-path.jpg?s=612x612&w=0&k=20&c=wg7fDK2gwv_kC-7jqJXO2TXohZnzxK8lZaBhWtmlHTQ=",
            "alt": "garden rake"
        },
        "inStock": 10,
        "category": "Garden",
    },
    {
        "_id": "66fffb65850e9d483d87094b",
        "name": "shovel",
        "description": "Sturdy shovel for digging.",
        "price": 18.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1983021280/photo/hand-tools-shovel-3d.jpg?s=612x612&w=0&k=20&c=eS4WTO_wRPirXUS_gUBtwkkS5BdnIoAHwHDalcZ5_eI=",
            "alt": "garden shovel"
        },
        "inStock": 10,
        "category": "Garden",
    },
    {
        "_id": "66fffb66850e9d483d87094c",
        "name": "watering can",
        "description": "Metal watering can for plants.",
        "price": 9.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1648523249/vector/watering-can-semi-flat-colour-vector-object.jpg?s=612x612&w=0&k=20&c=XXBBO9HyLRlI-KgwirLwT2sZ-eEDwI0OOYIejuxEs24=",
            "alt": "watering can"
        },
        "inStock": 10,
        "category": "Garden",
    },
    {
        "_id": "66fffb67850e9d483d87094d",
        "name": "lawnmower",
        "description": "Electric lawnmower for small lawns.",
        "price": 129.99,
        "image": {
            "url": "https://media.istockphoto.com/id/183538130/photo/a-brand-new-green-electric-power-lawn-mower.jpg?s=612x612&w=0&k=20&c=wM1K68kuX3Y76NFLRicio53uE9VHFXBldELuyZUNXDQ=",
            "alt": "lawnmower"
        },
        "inStock": 10,
        "category": "Garden",
    },
    {
        "_id": "66fffb68850e9d483d87094e",
        "name": "pruners",
        "description": "Garden pruners for trimming plants.",
        "price": 15.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1491975102/photo/gardening-tool-equipment-single-steel-garden-scissor-with-green-plastic-grip-for-pruned-or.jpg?s=612x612&w=0&k=20&c=50gBRgSHTWfRk2R1P43yzwsY6BKOrWc36j_PZALUYLU=",
            "alt": "garden pruners"
        },
        "inStock": 10,
        "category": "Garden",
    },

    {
        "_id": "66fffb69850e9d483d87094f",
        "name": "sofa",
        "description": "Comfortable three-seater sofa.",
        "price": 599.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1992807266/vector/3d-set-of-colorful-modern-sofas-for-the-office-home-waiting-area-and-customer-service-design.jpg?s=612x612&w=0&k=20&c=F6hjjg3RMpSMobk4OCqn1IWIL-8trP4TzIIf7vWi0IE=",
            "alt": "sofa"
        },
        "inStock": 10,
        "category": "Furniture",
    },
    {
        "_id": "66fffb6a850e9d483d870950",
        "name": "dining table",
        "description": "Wooden dining table for six.",
        "price": 299.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1491794935/photo/black-chairs-and-wooden-dining-table-against-of-classic-white-paneling-wall-interior-design.jpg?s=612x612&w=0&k=20&c=6WCYJp_S3CPbnfUicUWmWme4kzgI16a9x6boSNSeuCU=",
            "alt": "dining table"
        },
        "inStock": 10,
        "category": "Furniture",
    },
    {
        "_id": "66fffb6b850e9d483d870951",
        "name": "armchair",
        "description": "Leather armchair with recliner.",
        "price": 199.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1490325659/photo/armchair.jpg?s=612x612&w=0&k=20&c=qIN0Gni0GstSVh6ong1rFApT_f7N-30HXn6DPU5rnQ8=",
            "alt": "armchair"
        },
        "inStock": 10,
        "category": "Furniture",
    },
    {
        "_id": "66fffb6c850e9d483d870952",
        "name": "bookshelf",
        "description": "Tall bookshelf with five shelves.",
        "price": 89.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1807026988/vector/kitten-sleeping-in-the-book-cabinet.jpg?s=612x612&w=0&k=20&c=0kigYhGxpAiLGyGaN9ZaeYvP138ooMHPBza1dLJfMgs=",
            "alt": "bookshelf"
        },
        "inStock": 10,
        "category": "Furniture",
    },
    {
        "_id": "66fffb6d850e9d483d870953",
        "name": "bed frame",
        "description": "King-size wooden bed frame.",
        "price": 399.99,
        "image": {
            "url": "https://media.istockphoto.com/id/1404705316/photo/bed-frame.jpg?s=612x612&w=0&k=20&c=CUWyiQFt9Q4diT2TrmwD4umFeRgAoP-TYlyL-aUBU9I=",
            "alt": "bed frame"
        },
        "inStock": 10,
        "category": "Furniture",
    }
];

const addInitialProducts = async () => {
    try {
        for (const productData of initialProductsData) {
            const existingProduct = await Product.findById(productData._id);

            if (!existingProduct) {
                await createProduct(productData);
            }
        }

    } catch (err) {
        console.error("Error adding initial products:", err);
    }
};

module.exports = addInitialProducts;
