// user.js
import express from "express";
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from "./verifyToken.js";
import bcrypt from "bcrypt";
import User from "../models/User.js"

const router = express.Router();
async function hashPassword(password) {
  const saltRounds = 10; // Adjust this value as needed (higher = more secure)
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
//Read
router.get("/find/:id",verifyTokenAndAdmin,async (req,res)=>{
  try {
    const currentUser = await User.findById(req.params.id);
    const {password,...others} = currentUser._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
})
//Read all Users
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
  try {
    const currentUsers = await User.find();
    const {password,...others} = currentUser._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
})
//Update 
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
  console.log("yes");
  if(req.body.password){
    req.body.password=await hashPassword(req.body.password)
  }
  try {
    const updatedUser= await User.findByIdAndUpdate(req.params.id,{ $set:req.body },{new:true});
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
})

//Delete
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
})
router.get("/usertest", (req, res) => {
  res.send("YASSSSS");
});
router.post("/userPostTest",(req,res)=>{
    const username= req.body.username;
    console.log(username);
    res.send(`Your User name is ${username}`);
})


export default router;
