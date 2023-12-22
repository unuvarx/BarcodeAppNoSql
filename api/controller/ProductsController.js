const User = require("../models/UserModel");

const addProduct = async (req, res, next) => {
  try {
    let product = req.body;
    console.log(product);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          products: product,
        },
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const products = user.products;
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getProducts,

};
