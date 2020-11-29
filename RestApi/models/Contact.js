const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },
  email: {
    type: String,
    required: [true, "Please provide a email."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject."],
  },
  content: {
    type: String,
    required: [true, "Please provide a content."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Contact",ContactSchema);