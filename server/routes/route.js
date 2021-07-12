const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/userController");
const { newOrder, orderList } = require("../controller/orderController");
router.post("/register", register);
router.post("/login", login);
router.post("/neworder", newOrder);
router.get("/orderlist/:email", orderList);

module.exports = router;
