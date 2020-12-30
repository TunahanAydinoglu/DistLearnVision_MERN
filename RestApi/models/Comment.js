const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lesson = require("./Lesson");

const CommentSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [1, "Please provide content at least 1 characters"],
  },
  mark: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
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
  dislikeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  dislikes: [
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
  lesson: {
    type: mongoose.Schema.ObjectId,
    ref: "Lesson",
    required: true,
  },
});

// Pre Save Method
CommentSchema.pre("save", async function (next) {
  if (!this.isModified("content") || !this.isModified("mark")) {
    next();
  } else {
    try {
      const lesson = await Lesson.findById(this.lesson).populate([
        {
          path: "user",
          select: "name profile_image",
        },
        {
          path: "comments",
          select: "mark",
        },
      ]);
      lesson.comments.push(this.id);
      lesson.commentCount += 1;
      let total = [];
      // const average = await lesson.comments.map(comment => total = total+comment.mark) / lesson.commentCount;
      lesson.comments.map((comment) => total.push(comment.mark));
      let sum = 0;
      let i = 0;
      for (i = 0; i < total.length - 1; i++) {
        sum = sum + total[i];
      }
      sum = sum + this.mark;
      const average =  sum / total.length;
      lesson.markAverage = await average;
      console.log(total.length);
      await lesson.save();
      next();
    } catch (err) {
      console.log(err);
    }
  }
});
CommentSchema.post("remove", async function () {
  const lesson = await Lesson.findById(this.lesson);

  lesson.comments.splice(lesson.comments.indexOf(this._id), 1);
  lesson.commentCount -= 1;

  await lesson.save();
});

CommentSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});
CommentSchema.virtual("DislikesCount").get(function () {
  return this.dislikes.length;
});

module.exports = mongoose.model("Comment", CommentSchema);
