import express from "express";
import bodyParser from "body-parser"; //อ่านข้อมูลที่อยู่ใน body
import mongoose from "mongoose"; // ใช้เชื่อมต่อกับ mongo db
import productRouter from "./routes/product.js";
import dotenv from 'dotenv';
import cors from "cors"; //เพิ่ม cors
dotenv.config();

//Create server
const app = express();
 
//Use Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true })); //ทำให้สามารถอ่าน json ได้
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cors()); //เพิ่ม cors

 
// Use Router
app.use("/api", productRouter);
 
const CONNECTION_URL =process.env.MONGODB_URL; //การกำหนดช่องทางในการเชื่อมต่อ
 
const PORT = process.env.PORT || 5000; //port  ที่ต้องการใช้
 
//Connect to MongDB
mongoose
  .connect(CONNECTION_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
     })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) //ถ้าเชื่อมต่อได้
  )
  .catch((error) => console.log(error.message));