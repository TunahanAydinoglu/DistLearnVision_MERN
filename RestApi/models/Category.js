const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const CategorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minlength: [3, "Please provide title at least 3 characters"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Please provide a image"],
    minlength: [3, "Please provide image at least 3 characters"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  lessonCount: {
    type: Number,
    default: 0,
  },
  lesson: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Lesson",
    },
  ],
});

// Pre Save Method
CategorySchema.pre("save", function (next) {
  if (!this.isModified("title")) next();

  this.slug = this.makeSlug();
  next();
});

CategorySchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("Category", CategorySchema);
