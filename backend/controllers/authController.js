const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn:
      process.env.JWT_EXPIRE
    }
  );

};

exports.register = async (
  req,
  res
) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    const existingUser =
    await User.findOne({
      email
    });

    if(existingUser){

      return res.status(400)
      .json({
        success:false,
        message:
        "User already exists"
      });

    }

    const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

    const user =
    await User.create({

      username,
      email,

      password:
      hashedPassword

    });

    const token =
    generateToken(
      user._id
    );

    res.status(201)
    .json({
      success:true,
      token,
      user
    });

  } catch(error){

    res.status(500)
    .json({
      success:false,
      message:error.message
    });

  }

};

exports.login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
    await User.findOne({
      email
    });

    if(!user){

      return res.status(401)
      .json({
        success:false,
        message:
        "Invalid credentials"
      });

    }

    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){

      return res.status(401)
      .json({
        success:false,
        message:
        "Invalid credentials"
      });

    }

    const token =
    generateToken(
      user._id
    );

    res.json({
      success:true,
      token,
      user
    });

  } catch(error){

    res.status(500)
    .json({
      success:false,
      message:error.message
    });

  }

};