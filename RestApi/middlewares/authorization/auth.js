const jwt = require("jsonwebtoken");
const errorWrapper = require("../../helpers/error/errorWrapper");
const User = require("../../models/User");
const Question = require("../../models/Question");
const Episode = require("../../models/Episode");
const Answer = require("../../models/Answer");

const CustomError = require("../../helpers/error/customError");

const getAccessToRoute = errorWrapper(async (req, res, next) => {
  // Is Token Included
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this page", 403)
    );
  }

  // Get Token From Header

  const accessToken = getAccessTokenFromHeader(req);

  // Control If Token Valid
  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this page", 401)
      );
    }
    req.user = {
      id: decodedToken.id,
      name: decodedToken.name,
    };
    next();
  });
});
const getAdminAccess = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role !== "admin") {
    return next(new CustomError("Only admins can access this route", 403));
  }
  return next();
});
const getTeacherAccess = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role !== "teacher") {
    return next(new CustomError("Only teacher can access this route", 403));
  }
  return next();
});
const getLessonOwnerAccess = errorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const lessonId = req.params.id;

  const lesson = req.myLesson;
  if (lesson.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  return next();
});
const getEpisodeOwnerAccess = errorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const episodeId = req.params.id;

  const episode = await Episode.findById(episodeId);

  if (episode.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  return next();
});
const getQuestionOwnerAccess = errorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  const question = await Question.findById(questionId);

  if (question.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  return next();
});

const getAnswerOwnerAccess = errorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const answerId = req.params.answer_id;

  const answer = await Answer.findById(answerId);

  if (answer.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  return next();
});

const getAccessTokenFromHeader = (req) => {
  const accessToken = req.headers.authorization;

  return accessToken;
};
const isTokenIncluded = (req) => {
  return req.headers.authorization;
};

module.exports = {
  getAccessToRoute,
  getAdminAccess,
  getTeacherAccess,
  getLessonOwnerAccess,
  getQuestionOwnerAccess,
  getAnswerOwnerAccess,
  getEpisodeOwnerAccess,
};
