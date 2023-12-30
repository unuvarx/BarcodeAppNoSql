const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  addSalesHistory,
  updatePrice,
  updateProduct,
  deleteProduct,
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
router.put("/update-product/:id/:productIdToUpdate", updateProduct);
router.delete("/delete-product/:id/:productIdToDelete", deleteProduct);


module.exports = router;
