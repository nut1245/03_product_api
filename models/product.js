import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    tags: [String],
    imageURL: String,
});
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;