const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const routes = require("./routes/route");
const stripe = require("stripe");
app.use(cors());

const PORT = process.env.PORT || 9000;

connectDB();
app.use(express.json());
app.use("/api", routes);
const SECRET_KEY =
  "sk_test";

const stripeapi = new stripe(SECRET_KEY, {
  apiVersion: "2020-08-27",
});

app.post("/api/createPayment", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripeapi.customers.create();
  const ephemeralKey = await stripeapi.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );

  const paymentIntent = await stripeapi.paymentIntents.create({
    amount: req.body.totalPrice * 100,
    currency: "INR",
    customer: customer.id,
    payment_method_types: ["card"],
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
