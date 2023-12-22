const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
} = require("../controller/ProductsController");




const {
  verifyToken,


  verifyUser,


  verifyAdmin,



} = require("../utils/VerifyToken");






router.put("/:id", addProduct)
router.get("/:id", getProducts);


module.exports = router;
