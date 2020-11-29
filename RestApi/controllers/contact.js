const Contact = require("../models/Contact");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const contact = asyncErrorWrapper(async (req, res, next) => {
  const data = req.body;

  const { name, email, subject, content } = data;

  const contact = await Contact.create({
    name,
    email,
    subject,
    content,
  });

  res.status(200).json({
    success: "true",
    data: contact,
  });
});

module.exports = contact;
