const { Schema, model } = require("mongoose");

const UserModel = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    namesurname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    products: [
      {
        barcode: Number,
        productName: String,
        price: Number,
      }
    ]
  },
  { timestamps: true }
);

module.exports = model("User", UserModel);
