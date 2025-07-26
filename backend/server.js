import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";
import path from "path";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cors({ origin: "https://product-store-k1qm.onrender.com" }));

app.use(express.json()); //middleware to parse the incoming data from requests.

app.use("/products", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on Port: ${port}`);
    });
  } catch (error) {
    console.error("Database Connection failed: ", error.message);
  }
};

startServer();
