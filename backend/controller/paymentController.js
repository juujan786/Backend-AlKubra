const catchAssyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51LDk21IV6nJL6ZE37VUupBOIHEAmGZQ1u8O5AvyTGZkoYsLooupUfUUffhmrI8R9e74s4FSZWo2QIiDYbqDRbbmS00yBWn6z7m"
);

exports.processPayment = catchAssyncErrors(async (req, res, next) => {
  const amount = req.body.amount;
  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    metadata: {
      company: "Al-Kubra",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAssyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
