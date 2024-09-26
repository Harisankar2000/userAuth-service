const { bcryptPassword , comparePassword} = require("../helper/authHelper");
const db = require("../models/db");
const JWT = require('jsonwebtoken')

const User = db.users;

//sign up a user
module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password) {
      return res.json({ error: "Password is required" });
    }
    const existingUser = await User.findOne({
      where: {
        email: email
      } 
    });

    //existing user
    if (existingUser) {
      res.json( {
        "message":"Email is already registered. Please login or use a different email.",
        success: false
      })
      
    }
     // Register user
    const hashedPassword = await bcryptPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
    })
    return res.status(201).send({
      success: true,
      message: "User registration sccessfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Registration Failed!",
      success: false,
    });
  }
};

//user login
module.exports.login = async(req,res) => {
  try {
    const {email,password} = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({
      where: {
      email: email
    } 
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    
    const token = await JWT.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        email: user.email,
        password:user.password
      },
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Failed to Login!",
      success: false,
    });
  }

};
