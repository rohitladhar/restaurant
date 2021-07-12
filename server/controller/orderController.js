const Order = require("../models/orders");

exports.newOrder = async (req, res) => {
  try {
    const shipping = req.body.deliveryCharges;
    if (shipping === "Free") {
      const shippingCharges = "Free";
      const newOrderSave = new Order({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        date: req.body.date,
        itemsPrice: req.body.itemsPrice,
        deliveryCharges: shippingCharges,
        totalPrice: req.body.totalPrice,
        modeOfPayment: req.body.modeOfPayment,
        cartItems: req.body.cartItems,
      });
      const saveNewOrder = await newOrderSave.save();
      if (saveNewOrder) {
        res.status(200).json({ success: "Order Placed" });
      } else {
        res.status(401);
      }
    } else {
      const shippingCharges = "₹ " + shipping;
      const newOrderSave = new Order({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        date: req.body.date,
        itemsPrice: req.body.itemsPrice,
        deliveryCharges: shippingCharges,
        totalPrice: req.body.totalPrice,
        modeOfPayment: req.body.modeOfPayment,
        cartItems: req.body.cartItems,
      });
      const saveNewOrder = await newOrderSave.save();
      if (saveNewOrder) {
        res.status(200).json({ success: "Order Placed" });
      } else {
        res.status(401);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.orderList = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Order.find({ email: email });
    const resultObject = Object.keys(result).length;

    if (resultObject !== 0) {
      res.json({ results: result });
    } else if (resultObject === 0) {
      res.status(400).json({ errors: "No Orders Placed Yet" });
    } else {
      res.status(404).send({ errors: "Not Found" });
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
