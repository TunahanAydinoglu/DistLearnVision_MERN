const express = require("express");
const User = require("../models/User");

const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  getBlockUser,
  getCommentsByContent,
  getFindUserByUserName,
  putUserUpdateById,
} = require("../controllers/admin");

const {
  getAllCommentsForAdmin,
  editComment,
  deleteComment,
} = require("../controllers/comment");

const userQueryMiddleware = require("../middlewares/query/userQueryMiddleware");

const {
  checkCommentExist,
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

// users,user, delete,block

router.use([getAccessToRoute, getAdminAccess]);

router.get("/users", getAllUsers);
router.get("/users/:id", checkUserExist, getSingleUser);
router.get("/users/:id/block", checkUserExist, getBlockUser);
router.delete("/user/:id", checkUserExist, deleteUser);

router.get("/search/users", getFindUserByUserName);
router.put("/users/:user_id", checkUserExist, putUserUpdateById);

router.get("/comments", getAllCommentsForAdmin);
router.put("/comments/:id/edit", checkCommentExist, editComment);

router.get("/search/comments", getCommentsByContent);

router.delete("/comments/:id/delete", checkCommentExist, deleteComment);

module.exports = router;
