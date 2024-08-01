import express from "express";
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from "./verifyToken.js";
import Order from "../models/Order.js";
const router = express.Router();

//Create
router.post("/",verifyToken,async (req,res)=>{
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})


//Get User Order
router.get("/find/:UserId",verifyTokenAndAuthorization,async (req,res)=>{
    try {
      const currentOrders = await Order.find({userId:req.params.id});
      res.status(200).json(currentOrders);
    } catch (error) {
      res.status(500).json(error);
    }
})

//Get all
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
})
//Update
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{ $set:req.body },{new:true});
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  
//Delete 
router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;