import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import productRouter from "./routes/product.js"
import orderRouter from "./routes/order.js"
import cartRouter from "./routes/cart.js"
import stripeRouter from "./routes/stripe.js"
import cors from "cors";
dotenv.config();
const app=express();

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Connection success"))
.catch((err)=>{
    console.log(err);
})
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/checkout",stripeRouter);

app.listen(process.env.PORT||5000,()=>{
    console.log(`backend server running in ${process.env.PORT}`)
})