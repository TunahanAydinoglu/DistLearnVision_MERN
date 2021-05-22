const User = require("../models/User");
const Comment = require("../models/Comment");
const errorWrapper = require("../helpers/error/errorWrapper");

const getAllUsers = errorWrapper(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    data: users,
  });
});
const getSingleUser = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});
const deleteUser = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  await user.remove();

  return res.status(200).json({
    success: true,
    data: {},
  });
});

const getBlockUser = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  await User.updateOne({ _id: user._id }, { blocked: !user.blocked });

  let message = user.blocked ? "User unblocked successfully" : "User blocked successfully";
  return res.status(200).json({
    success: true,
    message: message,
  });
});

const getFindUserByUserName = errorWrapper(async (req, res, next) => {
  const { name } = req.query;

  var regex = new RegExp(name, "i");
  const users = await User.find({ name: regex });

  return res.status(200).json({
    success: true,
    data: users,
  });
});

const putUserUpdateById = errorWrapper(async (req, res, next) => {
  const updateData = req.body;

  const user = await User.findByIdAndUpdate(req.user_id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Details Updated",
    data: user,
  });
});

const getCommentsByContent = errorWrapper(async (req, res, next) => {
  const { content } = req.query;

  var regex = new RegExp(content, "i");
  const comments = await Comment.find({ content: regex });

  return res.status(200).json({
    success: true,
    data: comments,
  });
});

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  getBlockUser,
  getFindUserByUserName,
  putUserUpdateById,
  getCommentsByContent,
};
