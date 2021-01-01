const Category = require("../models/Category");

const errorWrapper = require("../helpers/error/errorWrapper");

const getAllCategories = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
});
const addNewCategory = errorWrapper(async (req, res, next) => {
  const user_id = req.user.id;

  const information = req.body;

  const category = await Category.create({
    ...information,
    user: user_id,
  });
  res.status(200).json({
    success: true,
    data: category,
  });
});

const getSingleCategory = errorWrapper(async (req, res, next) => {
  const category = req.myCategory;

  return res.status(200).json({ success: true, data: category });
});
const editCategory = errorWrapper(async (req, res, next) => {
  const { title } = req.body;
  let category = req.myCategory;

  category.title = title;

  category = await category.save();

  res.status(200).json({
    success: true,
    data: category,
  });
});
const deleteCategory = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Category.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  addNewCategory,
  getAllCategories,
  getSingleCategory,
  editCategory,
  deleteCategory,
};
