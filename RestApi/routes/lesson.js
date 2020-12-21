const express = require("express");
const question = require("./question");
const episode = require("./episode");
const Lesson = require("../models/Lesson");

const {
  checkLessonExist,
} = require("../middlewares/database/databaseErrorHelpers");

const {
  addNewLesson,
  getAllLesson,
  getSingleLesson,
  editLesson,
  deleteLesson,
  likeLesson,
  undoLikeLesson,
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

router.get("/:id/like", [getAccessToRoute, checkLessonExist], likeLesson);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkLessonExist],
  undoLikeLesson
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