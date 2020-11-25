const express = require("express");
const router = express.Router();
const { getSingleUser, getAllUsers } = require("../controllers/user");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");

router.get("/", getAllUsers);
router.get("/:id", checkUserExist, getSingleUser);

module.exports = router;
