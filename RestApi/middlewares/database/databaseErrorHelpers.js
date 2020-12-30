const path = require("path");
const Category = require("../../models/Category");
const root = path.dirname(require.main.filename);

const Answer = require(root + "/models/Answer");
const Question = require(root + "/models/Question");
const Lesson = require(root + "/models/Lesson");
const User = require(root + "/models/User");
const Comment = require(root + "/models/Comment");
const Episode = require(root + "/models/Episode");

const errorWrapper = require(root + "/helpers/error/errorWrapper");
const CustomError = require(root + "/helpers/error/customError");

const checkQuestionExist = errorWrapper(async (req, res, next) => {
  const question_id = req.params.id || req.params.question_id;

  const question = await Question.findById(question_id);

  if (!question) {
    return next(
      new CustomError(`Question Not Found with Id : ${question_id}`, 404)
    );
  }
  next();
});
const checkCommentExist = errorWrapper(async (req, res, next) => {
  const comment_id = req.params.id || req.params.comment_id;

  const comment = await Comment.findById(question_id);

  if (!comment) {
    return next(
      new CustomError(`Comment Not Found with Id : ${comment_id}`, 404)
    );
  }
  next();
});
const checkCategoryExist = errorWrapper(async (req, res, next) => {
  const category_id = req.params.id || req.params.category_id;

  const category = await Category.findById(category_id).populate({
    path: "user",
    select: "name profile_image",
  });

  if (!category) {
    return next(
      new CustomError(`Category Not Found with Id : ${category_id}`, 404)
    );
  }
  req.myCategory = category;
  next();
});
const checkEpisodeExist = errorWrapper(async (req, res, next) => {
  const episode_id = req.params.id || req.params.episode_id;

  const episode = await Episode.findById(episode_id).populate({
    path: "user",
    select: "name profile_image",
  });
  if (!episode) {
    return next(
      new CustomError(`Episode Not Found with Id : ${episode_id}`, 404)
    );
  }
  req.myEpisode = episode;
  next();
});

const checkLessonExist = errorWrapper(async (req, res, next) => {
  const lesson_id = req.params.id || req.params.lesson_id;
  const lesson = await Lesson.findById(lesson_id);

  if (!lesson) {
    return next(
      new CustomError(`Lesson Not Found with Id : ${lesson_id}`, 404)
    );
  }
  next();
});

const checkQuestionAndAnswerExist = errorWrapper(async (req, res, next) => {
  const { answer_id, question_id } = req.params;

  const answer = await Answer.findOne({
    _id: answer_id,
    question: question_id,
  });

  if (!answer) {
    return next(
      new CustomError(
        `Answer Not Found with Answer Id : ${answer_id} Associated With This Question`,
        404
      )
    );
  }
  next();
});
const checkLessonAndQuestionExist = errorWrapper(async (req, res, next) => {
  const { question_id, lesson_id } = req.params;

  const question = await Question.findOne({
    _id: question_id,
    lesson: lesson_id,
  });

  if (!question) {
    return next(
      new CustomError(
        `Question Not Found with Answer Id : ${question_id} Associated With This Lesson`,
        404
      )
    );
  }
  next();
});
const checkUserExist = errorWrapper(async (req, res, next) => {
  const user_id = req.params.id || req.params.user_id;

  const user = await User.findById(user_id);

  if (!user) {
    return next(new CustomError(`User Not Found with Id : ${user_id}`, 404));
  }
  next();
});

module.exports = {
  checkQuestionAndAnswerExist,
  checkLessonAndQuestionExist,
  checkLessonExist,
  checkQuestionExist,
  checkEpisodeExist,
  checkUserExist,
  checkCategoryExist,
  checkCommentExist,
};
