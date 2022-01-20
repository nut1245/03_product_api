import express from "express";
import Product from "../models/product.js";

const router = express.Router();


 
router.get("/", (req, res) => {
  res.send("RestfulAPI");
});

 //Get all
 //http://localhost:5000/api/products
router.get("/products", async (req, res) => {
    const products = await Product.find({})//ถ้ามีเงื่อนไขให้ใส่ในปีกกา
    res.json(products);
});

 //Get By Id
 //http://localhost:5000/api/products/61cd694df0fd8c40cfe8d8bb
router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
});

 //Create new product
 //http://localhost:5000/api/products
router.post("/products", async (req, res) => {
    const payload = req.body;
    const product = new Product(payload);
    await product.save();
    res.json({message:"Product added !!"})
});

 //Update Product by Id
 //http://localhost:5000/api/products/61cd69e6f0fd8c40cfe8d8bd
router.put("/products/:id",async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const product = await Product.findByIdAndUpdate(id, { $set: payload });
    res.json({message: `Product Id ${id} is updated`});
});

 //Delete Product by Id
 //http://localhost:5000/api/products/61cd694df0fd8c40cfe8d8bb
router.delete("/products/:id",async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({message: `Product Id ${id} is deleted`});
});

export default router;
