const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDb Connection Success");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
