const User = require("../models/UserModel");

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("it is deleted!");
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    // const user = await User.findById(req.params.id);
    const user = await User.findOne({token: req.params.id})
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


module.exports = {
    updateUser,
    deleteUser,
    getUser,
  };
  