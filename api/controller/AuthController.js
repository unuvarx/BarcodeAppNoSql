const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

function generateSecretKey(length = 64) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const secretKey = generateSecretKey();
    const newUser = new User({
      ...req.body,
      password: hash,
      token: secretKey,
    });

    await newUser.save();
    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  // Kullanıcının çıkış yapmasını sağlamak için çerezin süresini geçmiş bir tarihle ayarla
  res
    .cookie("access_token", "", {
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Logout successful." });
};

module.exports = { register, login, logout };
