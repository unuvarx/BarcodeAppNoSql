const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/UserController");

const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/VerifyToken");

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello admin, you are logged in and you can delete all accounts");
});
router.get("/:id", getUser);

module.exports = router;
