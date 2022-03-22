const { ProductModel } = require("../models/product");

module.exports = {
  getAllProducts: async (req, res) => {
    let products = await ProductModel.find();
    res.send(products);
  },
  addProduct: async (req, res) => {
    //Check if product with this brand name already exist in DB
    let { id, title, price, description, category, image, rating } = req.body;
    let product = await ProductModel.findOne({
      id,
    });

    // if product !==null => meaning: product exist
    if (product !== null) {
      return res.status(400).send("product already exist!");
      // return res.status(400).send({ message: "product already exist!" });
    }
    // if product not exist create new product model and save him to DB
    product = new ProductModel({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    let result = await product.save();
    return res.send(result);
  },
};
