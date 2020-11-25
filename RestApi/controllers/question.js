const Question = require("../models/Question");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  const questions = await Question.find();

  return res.status(200).json({
    success: true,
    data: questions,
  });
});

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;
  const question = await Question.create({
    // title:information.title,
    // content:information.content,
    ...information, // yukardaki yerine object model aktarirken kullanilabilir
    user: req.user.id,
  });
  res.status(200).json({ success: true, data: question });
});

const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question = await req.myCheckData;

  return res.status(200).json({ success: true, data: question });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
};
