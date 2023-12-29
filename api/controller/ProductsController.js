const User = require("../models/UserModel");

const addProduct = async (req, res, next) => {
  try {
    let product = req.body;
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
const updatePrice = async (req, res, next) => {
  try {
    const updatedPrice = req.body.price;
    const user = await User.findById(req.params.id);
    const products = user.products;

    const indexToUpdate = products.findIndex(item => item._id.equals(req.params.productIdToUpdate));
    if (indexToUpdate === -1) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    products[indexToUpdate].price = updatedPrice;
    await user.save();
    res.status(200).json(products[indexToUpdate]);
  } catch (error) {
    next(error);
  }
};


const getProducts = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const products = user.products;
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const addSalesHistory = async (req, res, next) => {
  try {
    let history = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          salesHistory: history,
        },
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  addSalesHistory,
  updatePrice,
};
