const User = require("../models/users");
const bcyrpt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      res.status(401).json({ error: "Email is already register" });
    } else {
      const passwordHash = await bcyrpt.hash(req.body.password, 12);
      const userSave = new User({
        name: req.body.name,
        password: passwordHash,
        email: req.body.email,
        phone: req.body.phone,
      });
      const newUser = await userSave.save();
      if (newUser) {
        res.status(201).json({ success: "User Created" });
      } else {
        res.status(401);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const match = await bcyrpt.compare(req.body.password, user.password);
      if (match) {
        res.status(200).json({ success: "login successful" });
      } else {
        res.status(401).json({ error: "Wrong Password" });
      }
    } else {
      res.status(401).json({ error: "Invalid Creditionals" });
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
