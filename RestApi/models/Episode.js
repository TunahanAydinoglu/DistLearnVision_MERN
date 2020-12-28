const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lesson = require("./Lesson");

const EpisodeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minlength: [3, "Please provide title at least 3 characters"],
  },
  url: {
    type: String,
    required: [true, "Please provide a url"],
    minlength: [5, "Please provide url at least 5 characters"],
  },
  ranking: {
    type: Number,
    required: [true, "Please provide a ranking"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
EpisodeSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    next();
  } else {
    try {
      let lesson_id = this.lesson;
      const lesson = await Lesson.findById(lesson_id);
      lesson.episodes.push(this.id);
      lesson.episodeCount += 1;
      await lesson.save();
      next();
    } catch (err) {
      next(err);
    }
  }
});

EpisodeSchema.post("remove", async function () {
  const lesson = await Lesson.findById(this.lesson);

  lesson.episodes.splice(lesson.episodes.indexOf(this._id), 1);
  lesson.episodeCount -= 1;

  await lesson.save();
});

module.exports = mongoose.model("Episode", EpisodeSchema);
