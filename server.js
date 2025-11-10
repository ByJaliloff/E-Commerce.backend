import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import UserRouter from "./src/routes/auth.route.js";
import ProductRouter from "./src/routes/product.route.js";
import CartRoute from "./src/routes/cart.route.js";
import CategoryRouter from "./src/routes/category.route.js"
import FavRoute from "./src/routes/fav.route.js"
import OrderRouter from "./src/routes/order.route.js";
import cluster from "cluster";
import os from "os";

const cpuCoreCount = os.cpus().length;
console.log(cpuCoreCount);


dotenv.config();

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Starting ${cpuCoreCount} workers..`);
  
  
  for (let i = 0; i < cpuCoreCount; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log(`Starting a new worker`);
    cluster.fork();
    
  })
}
  else {
    const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", UserRouter);
app.use("/api/products", ProductRouter);
app.use('/api/categories', CategoryRouter)
app.use('/api/cart', CartRoute)
app.use('/api/fav', FavRoute)
app.use('/api/orders', OrderRouter)

const connectDB = mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT || 5000, async () => {
  try {
    await connectDB;
    console.log("Connected to the database");
  } catch (error) {
    console.log("Database connection failed", error);
  }
});
  }

