const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  addSalesHistory,
} = require("../controller/ProductsController");




const {
  verifyToken,


  verifyUser,


  verifyAdmin,



} = require("../utils/VerifyToken");






router.put("/:id", addProduct)
router.get("/:id", getProducts);
router.put("/history/:id", addSalesHistory),


module.exports = router;
