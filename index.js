// server.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import booksRoute from "./routes/books.js";
import transactionsRoute from "./routes/transactions.js";
import UserRoute from "./routes/user.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/books", booksRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/user", UserRoute);


// demo 
app.get("/", (req,res) =>{
  res.send({
    success:true,
    Message:"Server is working fine"
  })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
