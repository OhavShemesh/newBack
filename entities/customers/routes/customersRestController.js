const express = require("express");

const router = express.Router();
const { registerCustomer, loginCustomer, getAllCustomers, getCustomerById, addToCart, updateBusiness, sendContactMessage, deleteContactMessage, likeProduct, updateCustomer } = require("../models/customersAccessDataService");
const { handleError } = require("../../../utils/handleErrors");
const chalk = require("chalk");
const { transporter } = require("../emailHandler/emailFunctions");
const auth = require("../../../auth/authService");


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
router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can get all users info"
            );
        }

        const AllCustomers = await getAllCustomers()
        res.send(AllCustomers)

    } catch (err) {
        req.errorMessage = err.message || "Failed to login";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})

router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;


        if (userInfo._id !== id && !userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the same customer or business customer can get customer info"
            );
        }


        const customer = await getCustomerById(id)
        res.send(customer)
    } catch (err) {
        console.log(err);

    }
})

router.put("/updateCustomer", auth, async (req, res) => {
    try {
        const { id } = req.body
        const infoAfterChange = req.body

        const userInfo = req.user

        if (userInfo._id !== id && !userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the same customer or business customer can update customer details"
            );
        }
        const customer = await updateCustomer(id, infoAfterChange)
        res.send(customer)

    } catch (err) {
        console.log(err);

    }
})

router.patch("/updateBusiness", auth, async (req, res) => {
    try {

        const { customerId } = req.body;
        const userInfo = req.user;


        if (userInfo._id !== customerId && !userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the same customer or business customer can get customer info"
            );
        }


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
router.patch("/deleteMessage", auth, async (req, res) => {
    try {
        const { customerId } = req.body;
        const { message } = req.body;
        const userInfo = req.user;

        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can get all users info"
            );
        }


        const customer = await deleteContactMessage(message, customerId);
        res.send(customer);
    } catch (err) {
        console.log(err);
    }
});
router.patch("/likeProduct", async (req, res) => {
    try {
        const { customerId } = req.body;
        const { productId } = req.body;

        const customer = await likeProduct(productId, customerId);
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
