import express from "express";
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from "./verifyToken.js";
import Cart from "../models/Cart.js";
const router = express.Router();

//Create
router.post("/",verifyToken,async (req,res)=>{
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})


//Get User Cart
router.get("/find/:UserId",verifyTokenAndAuthorization,async (req,res)=>{
    try {
      const currentCart = await Cart.findOne({userId:req.params.id});
      res.status(200).json(currentCart);
    } catch (error) {
      res.status(500).json(error);
    }
})

//Get all
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
})
//Update
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try {
      const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{ $set:req.body },{new:true});
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  
  //Delete 
  router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
      try {
          await Cart.findByIdAndDelete(req.params.id);
          res.status(200).json("Product has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    })
export default router;