const jwt = require("jsonwebtoken");

const SECRET_WORD = "SECRET";

const generateAuthToken = (user) => {
  const payload = {
    _id: user._id,
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, SECRET_WORD);
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const payload = jwt.verify(tokenFromClient, SECRET_WORD);
    return payload;
  } catch (error) {
    return null;
  }
};

module.exports = { generateAuthToken, verifyToken };
