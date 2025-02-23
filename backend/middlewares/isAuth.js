const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // Get the token from the headers
  const headerObj = req.headers;
  // Take the token from the Header Object from the authorization key
  const token = headerObj?.authorization?.split(" ")[1];
  // Verify the token using jwt
  const verifyToken = jwt.verify(token, "akhil", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
  if (verifyToken) {
    // Save the User req object
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token expired, login again");
    next(err);
  }
};

module.exports = isAuthenticated;