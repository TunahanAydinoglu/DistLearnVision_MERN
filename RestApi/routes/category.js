const express = require("express");
const Category = require("../models/Category");

const {
  checkCategoryExist,
} = require("../middlewares/database/databaseErrorHelpers");

const {
    addNewCategory,
    getAllCategories,
    getSingleCategory,
    editCategory,
    deleteCategory,
} = require("../controllers/category");

const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");

const categoryQueryMiddleware = require("../middlewares/query/categoryQueryMiddleware");
const lessonQueryMiddleware = require("../middlewares/query/lessonQueryMiddleware");

const router = express.Router();

// Ask New Question
// Permissions - Only Logged In Users

router.get(
  "/",
  categoryQueryMiddleware(Category, {
    population: {
      path: "lesson",
      select: "title content url",
    },
  }),
  getAllCategories
);

router.get(
  "/:id",
  [
    checkCategoryExist,
    lessonQueryMiddleware(Category, {
      array: "lessons",
      populate: [
        {
          path: "user",
          select: "name profile_image",
        },
        {
          path: "lessons",
          populate: {
            path: "user",
          },

          select: "title content url",
        },
      ],
    }),
  ],
  getSingleCategory
);
router.post("/add", getAccessToRoute, addNewCategory);

router.put(
  "/:id/edit",
  [getAccessToRoute, checkCategoryExist, getAdminAccess],
  editCategory
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkCategoryExist, getAdminAccess],
  deleteCategory
);

module.exports = router;
