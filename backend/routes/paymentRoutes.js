const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController");

router.route("/process/payment").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;
