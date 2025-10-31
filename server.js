import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import UserRouter from "./src/routes/auth.route.js";
import ProductRouter from "./src/routes/product.route.js";
import CartRouter from "./src/routes/cart.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", UserRouter);
app.use("/api/products", ProductRouter);

const connectDB = mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT || 5000, async () => {
  try {
    await connectDB;
    console.log("Connected to the database");
  } catch (error) {
    console.log("Database connection failed", error);
  }
});