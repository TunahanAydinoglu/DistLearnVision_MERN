const express = require("express");
const cors = require("cors");
const {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  editDetails,
} = require("../controllers/auth");
const { getAccessToRoutes } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

// api/auth
const router = express.Router();

router.use(cors());
router.post("/register", register);
router.get("/profile", getAccessToRoutes, getUser);
router.post("/login", login);
router.get("/logout", getAccessToRoutes, logout);
router.post(
  "/upload",
  [getAccessToRoutes, profileImageUpload.single("profile_image")],
  imageUpload
);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);
router.put("/edit/:id", editDetails);

module.exports = router;
