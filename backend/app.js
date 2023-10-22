const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

//set up cors
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "https://alkubra.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); 
});

// Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoutes");
const productionCenter = require("./routes/centerRoutes");
const form = require("./routes/formRoutes");
const contactUs = require("./routes/contactUsMessage");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", productionCenter);
app.use("/api/v1", form);
app.use("/api/v1", contactUs);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
