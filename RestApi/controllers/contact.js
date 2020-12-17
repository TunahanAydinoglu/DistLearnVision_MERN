const Contact = require("../models/Contact");
const errorWrapper = require("../helpers/error/errorWrapper");

const contact = errorWrapper(async (req, res, next) => {
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
