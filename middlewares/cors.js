const cors = require("cors");

const corsMiddleware = cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://192.168.1.148:5173",
    "http://10.244.128.148:5173",
    "https://newfinalproject-j2rp.onrender.com",
    "http://192.168.68.100:5173",
  ],
});

module.exports = corsMiddleware;
