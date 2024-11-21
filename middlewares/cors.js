const cors = require("cors");

const corsMiddleware = cors({
  origin: [
    "https://newfinalproject-j2rp.onrender.com"
  ],
});

module.exports = corsMiddleware;
