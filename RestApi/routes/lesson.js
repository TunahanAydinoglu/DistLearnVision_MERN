const express = require("express");
const question = require("./question");
const episode = require("./episode");
const Lesson = require("../models/Lesson");

const {
  checkLessonExist, checkCategoryExist,
} = require("../middlewares/database/databaseErrorHelpers");

const {
  addNewLesson,
  getAllLesson,
  getSingleLesson,
  editLesson,
  deleteLesson,
  likeLesson,
  dislikeLesson,
  undoLikeLesson,
  undoDislikeLesson,
  getLessonByCategoryId
} = require("../controllers/lesson");

const {
  getAccessToRoute,
  getLessonOwnerAccess,
} = require("../middlewares/authorization/auth");

const lessonQueryMiddleware = require("../middlewares/query/lessonQueryMiddleware");

const router = express.Router();

router.get(
  "/",
  lessonQueryMiddleware(Lesson, {
    population: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllLesson
);

router.get("/:id", checkLessonExist, getSingleLesson);
router.get("/category/:category_id",checkCategoryExist,getLessonByCategoryId);
router.get("/:id/like", [getAccessToRoute, checkLessonExist], likeLesson);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkLessonExist],
  undoLikeLesson
);
router.get("/:id/dislike", [getAccessToRoute, checkLessonExist], dislikeLesson);
router.get(
  "/:id/undo_dislike",
  [getAccessToRoute, checkLessonExist],
  undoDislikeLesson
);

router.post("/add", getAccessToRoute, addNewLesson);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkLessonExist, getLessonOwnerAccess],
  editLesson
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkLessonExist, getLessonOwnerAccess],
  deleteLesson
);

router.use("/:lesson_id/questions", checkLessonExist, question);
router.use("/:lesson_id/episodes", checkLessonExist, episode);

module.exports = router;
