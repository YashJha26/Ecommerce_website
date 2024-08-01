import express from "express";
import User from "../models/User.js"
//import CryptoJs from "crypto-js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
async function hashPassword(password) {
    const saltRounds = 10; // Adjust this value as needed (higher = more secure)
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

const router = express.Router();

//Register 
router.post("/register", async (req,res)=>{
    const username =req.body.username;
    console.log(req.body.password);
    
    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password:await hashPassword(req.body.password),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login 
router.post("/login", async (req,res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        !user && res.status(401).json("Wrong credentials");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
          }
          const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
          },process.env.JWT_SECRET_KEY,
          {expiresIn:"1d"}
        )
          res.status(200).json({user,accessToken});
    } catch (error) {
        res.status(500).json(err);
    }
});

export default router;