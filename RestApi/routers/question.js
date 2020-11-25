const express = require("express");
const { askNewQuestion, getAllQuestions,getSingleQuestion } = require("../controllers/question");
const { getAccessToRoutes } = require("../middlewares/authorization/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");

// api/questions
const router = express.Router();

// router.get("/", (req, res) => {
//   //   res.send("<h1>Question Home Page<h1>");
//   res.status(200).json({
//     success: true,
//   });
// });

router.get("/", getAllQuestions);
router.get("/:id",checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccessToRoutes, askNewQuestion);

module.exports = router;
