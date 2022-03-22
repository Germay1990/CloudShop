const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  addProduct,
} = require("../controllers/products");

//Get all products
router.get("/", getAllProducts);

//Add product
router.post("/", addProduct);

module.exports = router;
