const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token not found. Please log in again." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Invalid token. Please log in again." });
  }
};

module.exports = authMiddleware;