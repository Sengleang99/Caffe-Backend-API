const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoute = require("./src/routes/user.route.js");
const productRoute = require("./src/routes/product.route.js");
const orderRoute = require("./src/routes/order.route.js");
const categoryRoute = require("./src/routes/category.route.js");

// Initialize express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/category", categoryRoute);

// Error handler
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

 // Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("database connect successfull");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
