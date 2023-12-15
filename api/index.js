const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const AuthRoute = require("./routes/AuthRoute");
const UserRoute = require("./routes/UserRoute");

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
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);

app.listen(process.env.PORT, () => {
  connect();
  console.log("Server connected succesfully!");
});
