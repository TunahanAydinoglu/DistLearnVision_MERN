const Episode = require("../models/Episode");

const errorWrapper = require("../helpers/error/errorWrapper");

const getAllEpisodes = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
});
const addNewEpisode = errorWrapper(async (req, res, next) => {
  const { lesson_id } = req.params;
  const user_id = req.user.id;
  lesson = lesson_id || req.myLesson;
  const information = req.body;

  const episode = await Episode.create({
    ...information,
    lesson: lesson,
    user: user_id,
  });
  res.status(200).json({
    success: true,
    data: episode,
  });
});

const getSingleEpisode = errorWrapper(async (req, res, next) => {
  const episode = req.myEpisode;
  res.status(200).json({
    success: true,
    data: episode,
  });
});

const editEpisode = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, url } = req.body;
  let episode = await Episode.findById(id);

  episode.title = title;
  episode.content = content;
  episode.url = url;

  episode = await episode.save();

  res.status(200).json({
    success: true,
    data: episode,
  });
});
const deleteEpisode = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Episode.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  addNewEpisode,
  getAllEpisodes,
  getSingleEpisode,
  editEpisode,
  deleteEpisode,
};
