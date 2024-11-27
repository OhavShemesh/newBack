const express = require("express");
const router = express.Router();
const { registerCustomer, loginCustomer, getAllCustomers, getCustomerById, addToCart, updateBusiness, sendContactMessage, deleteContactMessage, likeProduct, updateCustomer, deleteOrderFromCustomer, getCusotmerByEmail, handleChangePassword } = require("../models/customersAccessDataService");
const { handleError } = require("../../../utils/handleErrors");
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

router.patch("/changePassword", async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const customer = await handleChangePassword(email, newPassword)
        res.send(customer)

    } catch (err) {
        req.errorMessage = err.message || "Failed changing password";
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
        req.errorMessage = err.message || "Failed fetching all customers";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})


router.get("/getCustomerByEmail", async (req, res) => {
    try {
        const { email } = req.query;

        const customer = await getCusotmerByEmail(email)
        if (customer) {
            res.send(customer)
        }
        if (!customer) {
            res.send("Email doesn't exist")
        }
    } catch (err) {
        req.errorMessage = err.message || "Failed sending email";
        return handleError(res, err.status || 400, req.errorMessage);
    }
});

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
        req.errorMessage = err.message || "Failed fetching customer";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})


router.put("/updateCustomer", auth, async (req, res) => {
    try {
        const { id, infoAfterChange } = req.body;


        const userInfo = req.user;

        if (userInfo._id !== id && !userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the same customer or business customer can get customer info"
            );
        }


        const customer = await updateCustomer(id, infoAfterChange);
        res.send(customer);
    } catch (err) {
        req.errorMessage = err.message || "Failed updating customer";
        return handleError(res, err.status || 400, req.errorMessage);
    }
});

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
        req.errorMessage = err.message || "Failed updating customer status";
        return handleError(res, err.status || 400, req.errorMessage);
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
        req.errorMessage = err.message || "Failed deleting message";
        return handleError(res, err.status || 400, req.errorMessage);
    }
});
router.patch("/likeProduct", async (req, res) => {
    try {
        const { customerId } = req.body;
        const { productId } = req.body;

        const customer = await likeProduct(productId, customerId);
        res.send(customer);
    } catch (err) {
        req.errorMessage = err.message || "Failed liking product";
        return handleError(res, err.status || 400, req.errorMessage);
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

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully");
    } catch (err) {
        req.errorMessage = err.message || "Failed sending email";
        return handleError(res, err.status || 400, req.errorMessage);
    }
});
router.patch("/deleteOrderFromCustomer", auth, async (req, res) => {
    try {
        const { orderId } = req.body;
        const { customerId } = req.body;

        const userInfo = req.user;

        if (userInfo._id !== customerId && !userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the same customer or business customer can delete order"
            );
        }

        const customer = await deleteOrderFromCustomer(customerId, orderId)
        res.send(customer);
    } catch (err) {
        req.errorMessage = err.message || "Failed deleting order from customer";
        return handleError(res, err.status || 400, req.errorMessage);
    }
});

router.patch("/:customerId", async (req, res) => {
    try {
        const { customerId } = req.params;
        const itemToCart = req.body;
        const customer = await addToCart(customerId, itemToCart);
        res.send(customer);
    } catch (err) {
        req.errorMessage = err.message || "Failed adding to cart";
        return handleError(res, err.status || 400, req.errorMessage);
    }
});






module.exports = router;
