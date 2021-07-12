const mongoose = require("mongoose");

const MONGO_URL = "mongodb://localhost/RestaurantDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DataBase Connection established");
  } catch (err) {
    console.log("DataBase is not connected");
  }
};

module.exports = connectDB;
