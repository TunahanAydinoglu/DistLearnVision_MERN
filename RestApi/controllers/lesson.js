const Lesson = require("../models/Lesson");

const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");

// const getAllLesson = errorWrapper(async (req, res, next) => {
//   return res.status(200).json(res.advanceQueryResults);
// });

const getAllLesson = errorWrapper(async (req, res, next) => {
  const lessons = await Lesson.find().populate({
    path:"comments",
    select:"mark"
  });

  return res.status(200).json({
    success: true,
    data: lessons,
  });
});

const getLessonByCategoryId = errorWrapper(async (req, res, next) => {
  const { category_id } = req.params;
  const lessons = await Lesson.find({ category: category_id }).populate({
    path: "category",
    select: "title",
  });

  res.status(200).json({
    success: true,
    data: lessons,
  });
});

const getLessonByUserId = errorWrapper(async (req, res, next) => {
  const { user_id } = req.params;
  const lessons = await Lesson.find({ user: user_id });

  res.status(200).json({
    success: true,
    data: lessons,
  });
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
  const lesson_id = req.params.id || req.params.lesson_id;
  const lesson = await Lesson.findById(lesson_id).populate([{
    path: "user",
    select: "name profile_image",
  },{
    path:"comments",
    select:"mark"
  }]);

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

const editLesson = errorWrapper(async (req, res, next) => {
  const lesson_id = req.params.id || req.params.lesson_id;
  const { title, content, url, instructor, image, category } = req.body;

  let lesson = await Lesson.findById(lesson_id);
  lesson.title = title;
  lesson.content = content;
  lesson.url = url;
  lesson.instructor = instructor;
  lesson.category = category;
  lesson.image = image;

  lesson = await lesson.save();

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

const deleteLesson = errorWrapper(async (req, res, next) => {
  const lesson_id = req.params.id || req.params.lesson_id;

  await Lesson.findByIdAndRemove(lesson_id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
const likeLesson = errorWrapper(async (req, res, next) => {
  const lesson_id = req.params.id || req.params.lesson_id;
  const lesson = await Lesson.findById(lesson_id);

  if (lesson.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this lesson", 400));
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
  const lesson_id = req.params.id || req.params.lesson_id;
  const lesson = await Lesson.findById(lesson_id);

  if (!lesson.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this lesson", 400)
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
const dislikeLesson = errorWrapper(async (req, res, next) => {
  const lesson_id = req.params.id || req.params.lesson_id;
  const lesson = await Lesson.findById(lesson_id);

  if (lesson.dislikes.includes(req.user.id)) {
    return next(new CustomError("You already liked this lesson", 400));
  }
  lesson.dislikes.push(req.user.id);
  lesson.dislikeCount += 1;

  await lesson.save();

  return res.status(200).json({
    success: true,
    data: lesson,
  });
});

const undoDislikeLesson = errorWrapper(async (req, res, next) => {
  const lesson_id = req.params.id || req.params.lesson_id;
  const lesson = await Lesson.findById(lesson_id);

  if (!lesson.dislikes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this lesson", 400)
    );
  }
  const index = lesson.dislikes.indexOf(req.user.id);

  lesson.dislikes.splice(index, 1);
  lesson.dislikeCount -= 1;

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
  dislikeLesson,
  undoDislikeLesson,
  getLessonByCategoryId,
  getLessonByUserId,
};
