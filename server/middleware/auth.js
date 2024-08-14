/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

const AuthenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified; 
    next(); 
  } catch (error) {
    console.error("Invalid Token:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default AuthenticateToken;

