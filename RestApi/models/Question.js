const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: "string",
    required: [true, "Please provide a title"],
    minlength: [10, "Please provide a title minumum length 10 characters"],
    unique: true,
  },
  content: {
    type: "string",
    required: [true, "Please provide a content"],
    minlength: [10, "Please provide a content minumum length 10 characters"],
  },
  slug: {
    type: "string",
  },
  createdAt: {
    type: "date",
    default: Date.now(),
  },
  user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
});

QuestionSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});
QuestionSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("Question", QuestionSchema);
