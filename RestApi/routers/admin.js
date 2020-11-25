const express = require("express");
const {
  getAccessToRoutes,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");
const { blockUser, deleteUser } = require("../controllers/admin");

const router = express.Router();

//Block User
//Delete User

router.use([getAccessToRoutes, getAdminAccess]);
router.get("/block/:id", checkUserExist, blockUser);
router.delete("/delete/:id", checkUserExist, deleteUser);

module.exports = router;
