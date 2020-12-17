const Lesson = require("../models/Lesson");

const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");

const getAllLesson = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
});

const addNewLesson = errorWrapper(async (req, res, next) => {
  const information = req.body;

  const lesson = await Lesson.create({
    ...information,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: lesson,
  });
});

const getSingleLesson = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const lesson = req.myLesson.populate({
    path: "user",
    select: "name profile_image",
  });
  res.status(200).json({
    success: true,
    data: lesson,
  });
});

const editLesson = errorWrapper(async (req, res, next) => {
  const { title, content, url } = req.body;

  let lesson = req.myLesson;

  lesson.title = title;
  lesson.content = content;
  lesson.url = url;

  lesson = await lesson.save();

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

const deleteLesson = errorWrapper(async (req, res, next) => {
  const { id } = req.myLesson;

  await Lesson.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
const likeLesson = errorWrapper(async (req, res, next) => {
  
  const lesson = req.myLesson;

  if (lesson.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this question", 400));
  }
  lesson.likes.push(req.user.id);
  lesson.likeCount += 1;

  await lesson.save();

  return res.status(200).json({
    success: true,
    data: lesson,
  });
});

const undoLikeLesson = errorWrapper(async (req, res, next) => {

  const lesson = req.myLesson;

  if (!lesson.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this question", 400)
    );
  }
  const index = lesson.likes.indexOf(req.user.id);

  lesson.likes.splice(index, 1);
  lesson.likeCount -= 1;

  await lesson.save();

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

module.exports = {
  addNewLesson,
  getAllLesson,
  getSingleLesson,
  editLesson,
  deleteLesson,
  likeLesson,
  undoLikeLesson,
};
