const User = require("../../models/User");
const Question = require("../../models/Question");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/errors/CustomError");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no such user with that id", 400));
  }
  req.myCheckData = user;
  next();
});

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);
  if (!question) {
    return next(new CustomError("There is no such question with that id", 400));
  }
  req.myCheckData = question;
  next();
});

module.exports = { checkUserExist, checkQuestionExist };
