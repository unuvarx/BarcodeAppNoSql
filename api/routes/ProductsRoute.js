const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  addSalesHistory,
  updatePrice,
} = require("../controller/ProductsController");




const {
  verifyToken,


  verifyUser,


  verifyAdmin,



} = require("../utils/VerifyToken");






router.put("/:id", addProduct)
router.get("/:id", getProducts);
router.put("/history/:id", addSalesHistory),
router.put("/update-price/:id/:productIdToUpdate", updatePrice);


module.exports = router;
