import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import cors from "cors";

dotenv.config();

let port = process.env.PORT || 6000;
//express app
let app = express();
//cookie parser middleware
app.use(cookieParser());
//json middleware
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

app.use("/api/auth",authRoutes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
})