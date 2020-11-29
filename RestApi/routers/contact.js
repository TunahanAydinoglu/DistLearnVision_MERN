const express = require("express");
const contact = require("../controllers/contact");

const router = express.Router();

router.post("/new", contact);

module.exports = router;
