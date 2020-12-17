const express = require("express");
const Episode = require("../models/Episode");

const {
  checkEpisodeExist,
} = require("../middlewares/database/databaseErrorHelpers");

const {
  addNewEpisode,
  getAllEpisodes,
  getSingleEpisode,
  editEpisode,
  deleteEpisode,
} = require("../controllers/episode");

const {
  getAccessToRoute,
  getEpisodeOwnerAccess,
} = require("../middlewares/authorization/auth");

const episodeQueryMiddleware = require("../middlewares/query/episodeQueryMiddleware");

const router = express.Router();

// Permissions - Only Logged In Users
router.get(
  "/",
  episodeQueryMiddleware(Episode, {
    population: [
      {
        path: "user",
        select: "name profile_image",
      },
      {
        path: "lesson",
        select: "title url",
      },
    ],
  }),
  getAllEpisodes
);

router.get("/:id", checkEpisodeExist, getSingleEpisode);

router.post("/add", getAccessToRoute, addNewEpisode);

router.put(
  "/:id/edit",
  [getAccessToRoute, checkEpisodeExist, getEpisodeOwnerAccess],
  editEpisode
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkEpisodeExist, getEpisodeOwnerAccess],
  deleteEpisode
);

module.exports = router;
