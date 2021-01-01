const express = require("express");

const {
  checkCommentExist,
} = require("../middlewares/database/databaseErrorHelpers");

const {
  addNewComment,
  getAllComments,
  getSingleComment,
  editComment,
  deleteComment,
  likeComment,
  undoLikeComment,
  dislikeComment,
  undoDislikeComment,
} = require("../controllers/comment");

const {
  getAccessToRoute,
  getCommentOwnerAccess,
} = require("../middlewares/authorization/auth");


const router = express.Router({ mergeParams: true });

router.get("/", getAllComments);

router.get("/:id", checkCommentExist, getSingleComment);
router.get("/:id/like", [getAccessToRoute, checkCommentExist], likeComment);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkCommentExist],
  undoLikeComment
);
router.get(
  "/:id/dislike",
  [getAccessToRoute, checkCommentExist],
  dislikeComment
);
router.get(
  "/:id/undo_dislike",
  [getAccessToRoute, checkCommentExist],
  undoDislikeComment
);

router.post("/add", getAccessToRoute, addNewComment);

router.put(
  "/:id/edit",
  [getAccessToRoute, checkCommentExist, getCommentOwnerAccess],
  editComment
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkCommentExist, getCommentOwnerAccess],
  deleteComment
);

module.exports = router;
