const express = require("express");
const cors = require("cors");
const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");
const contact = require("./contact");

// /api
const router = express.Router();

router.use(cors());
router.use("/questions", question);
router.use("/auth", auth);
router.use("/users", user);
router.use("/admin", admin);
router.use("/contact", contact);

module.exports = router;
