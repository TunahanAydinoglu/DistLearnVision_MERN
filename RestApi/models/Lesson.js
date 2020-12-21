const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const LessonSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minlength: [5, "Please provide title at least 5 characters"],
    unique: true,
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [10, "Please provide content at least 10 characters"],
  },
  instructor:{
    type: String,
    required: [true, "Please provide a instructor"],
    minlength: [5, "Please provide instructor at least 5 characters"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [5, "Please provide content at least 5 characters"],
  },
  url: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [5, "Please provide content at least 20 characters"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  questionCount: {
    type: Number,
    default: 0,
  },

  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  question: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
  ],
  episode: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Episode",
    },
  ],
});

// Pre Save Method
LessonSchema.pre("save", function (next) {
  if (!this.isModified("title")) next();

  this.slug = this.makeSlug();
  next();
});

LessonSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

LessonSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("Lesson", LessonSchema);
