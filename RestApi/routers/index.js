const express = require("express");
const cors = require("cors");
const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");

// /api
const router = express.Router();

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
router.use("/questions", question);
router.use("/auth", auth);
router.use("/users", user);
router.use("/admin", admin);

module.exports = router;
