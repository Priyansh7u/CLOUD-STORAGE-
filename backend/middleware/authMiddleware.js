const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {

      return res.status(401).json({
        success: false,
        message: "Not Authorized"
      });

    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user =
      await User.findById(
        decoded.id
      );

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Token Invalid"
    });

  }

};