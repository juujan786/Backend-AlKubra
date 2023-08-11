const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

//set up cors

app.use(cors());

// Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoutes");

const productionCenter = require("./routes/centerRoutes");
const form = require("./routes/formRoutes");



app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use("/api/v1", productionCenter);
app.use("/api/v1", form);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
