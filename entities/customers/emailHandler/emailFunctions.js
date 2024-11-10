const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mystore.web.reactproject@gmail.com",
        pass: "ocdb bsyg buzh kadz",
    },
});

module.exports = { transporter }