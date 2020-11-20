const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/auth");

router.get("/", getUsers);

module.exports = router;
