const express = require("express");

const router = express.Router();
const { registerCustomer, loginCustomer, getAllCustomers, getCustomerById, addToCart, updateBusiness, sendContactMessage, deleteContactMessage } = require("../models/customersAccessDataService");
const { handleError } = require("../../../utils/handleErrors");
const chalk = require("chalk");
const { transporter } = require("../emailHandler/emailFunctions");


router.post("/", async (req, res) => {
    try {
        const customer = await registerCustomer(req.body)
        res.send(customer)

    } catch (err) {
        req.errorMessage = err.message || "Failed to register";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const customer = await loginCustomer(email, password)
        res.send(customer)

    } catch (err) {
        req.errorMessage = err.message || "Failed to login";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.get("/", async (req, res) => {
    try {
        const AllCustomers = await getAllCustomers()
        res.send(AllCustomers)

    } catch (err) {
        req.errorMessage = err.message || "Failed to login";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await getCustomerById(id)
        res.send(customer)
    } catch (err) {
        console.log(err);

    }
})

router.patch("/updateBusiness", async (req, res) => {
    try {
        const { customerId } = req.body;
        console.log("customerId", customerId);

        const customer = await updateBusiness(customerId);
        res.send(customer);
    } catch (err) {
        console.log(err);
    }
});
router.patch("/contactMessage", async (req, res) => {
    try {
        const { customerId } = req.body;
        const { message } = req.body;

        const customer = await sendContactMessage(message, customerId);
        res.send(customer);
    } catch (err) {
        console.log(err);
    }
});
router.patch("/deleteMessage", async (req, res) => {
    try {
        const { customerId } = req.body;
        const { message } = req.body;

        const customer = await deleteContactMessage(message, customerId);
        res.send(customer);
    } catch (err) {
        console.log(err);
    }
});


router.post("/sendMail", async (req, res) => {
    const { recipient, subject, body } = req.body;

    const mailOptions = {
        from: "your-email@gmail.com",
        to: recipient,
        subject: subject,
        text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(chalk.red(error));

            return res.status(500).send("Error sending email");
        }
        res.status(200).send("Email sent successfully");
    });
});


router.patch("/:customerId", async (req, res) => {
    try {
        const { customerId } = req.params;
        const itemToCart = req.body;
        const customer = await addToCart(customerId, itemToCart);
        res.send(customer);
    } catch (err) {
        console.log(err);
    }
});




module.exports = router;
