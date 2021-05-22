const Comment = require("../models/Comment");
const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");

const getAllCommentsForAdmin = errorWrapper(async (req, res, next) => {
  let comments = await Comment.find();

  comments = comments.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  res.status(200).json({
    success: true,
    commentCount: comments.length,
    data: comments,
  });
});

const getAllComments = errorWrapper(async (req, res, next) => {
  const { lesson_id } = req.params;

  const lesson = await Lesson.findById(lesson_id).populate("comments");

  let comments = lesson.comments.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });

  res.status(200).json({
    success: true,
    commentCount: comments.length,
    data: comments,
  });
});

const addNewComment = errorWrapper(async (req, res, next) => {
  const user_id = req.user.id;
  const { lesson_id } = req.params;
  const information = req.body;

  const comment = await Comment.create({
    ...information,
    lesson: lesson_id,
    user: user_id,
  });
  res.status(200).json({
    success: true,
    data: comment,
  });
});

const getSingleComment = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  return res.status(200).json({
    success: true,
    data: comment,
  });
});

const editComment = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { content, mark } = req.body;
  let comment = await Comment.findById(id);

  comment.mark = mark;
  comment.content = content;

  comment = await comment.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});
const deleteComment = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Comment.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
const likeComment = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (comment.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this comment", 400));
  }
  comment.likes.push(req.user.id);
  comment.likeCount += 1;

  await comment.save();

  return res.status(200).json({
    success: true,
    data: comment,
  });
});
const undoLikeComment = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this comment", 400)
    );
  }
  const index = comment.likes.indexOf(req.user.id);

  comment.likes.splice(index, 1);
  comment.likeCount -= 1;

  await comment.save();

  res.status(200).json({
    success: false,
    data: comment,
  });
});
const dislikeComment = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (comment.dislikes.includes(req.user.id)) {
    return next(new CustomError("You already liked this comment", 400));
  }
  comment.dislikes.push(req.user.id);
  comment.dislikeCount += 1;

  await comment.save();

  return res.status(200).json({
    success: true,
    data: comment,
  });
});
const undoDislikeComment = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment.dislikes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this comment", 400)
    );
  }
  const index = comment.dislikes.indexOf(req.user.id);

  comment.dislikes.splice(index, 1);
  comment.dislikeCount -= 1;

  await comment.save();

  res.status(200).json({
    success: false,
    data: comment,
  });
});

module.exports = {
  addNewComment,
  getAllComments,
  getSingleComment,
  editComment,
  deleteComment,
  likeComment,
  undoLikeComment,
  dislikeComment,
  undoDislikeComment,
  getAllCommentsForAdmin,
};
