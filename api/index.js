const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");

dotenv.config();

// database connect
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to Database Successfully!");
  } catch (error) {
    console.log("When connect to Database find an error!");
    console.log();
    console.log(error);
  }
};
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb Disconnected :("); 
})














app.listen(process.env.PORT, () => {
    connect();
    console.log("Server connected succesfully!");
} ) 