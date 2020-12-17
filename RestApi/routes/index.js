const express = require("express");
const cors = require("cors");

const auth = require("./auth");
const admin = require("./admin");
const user = require("./user");
const lesson = require("./lesson");
const contact = require("./contact");
const category = require("./category");
const question = require("./question");

const router = express.Router();

router.use(cors());
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/users", user);
router.use("/contact", contact);
router.use("/questions", question);
router.use("/lessons", lesson);
router.use("/categories", category);

module.exports = router;
