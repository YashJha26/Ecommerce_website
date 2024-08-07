import express from "express";
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from "./verifyToken.js";
import Product from "../models/Product.js"
const router = express.Router();

//Create
router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Read products
router.get("/find/:id",async (req,res)=>{
    try {
        const currentProduct = await Product.findById(req.params.id);
        res.status(200).json(currentProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})


//Read all products
router.get("/",async (req,res)=>{
    const qNew = req.query.new;
    const qCategory= req.query.category;
    try {
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(5);
        }else if(qCategory){
            products = await Product.find({
                categories:{
                    $in: [qCategory],
                },
            });
        }else{
            products = await Product.find();
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error);
    }
})
//Update
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{ $set:req.body },{new:true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Delete 
router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
})
export default router;