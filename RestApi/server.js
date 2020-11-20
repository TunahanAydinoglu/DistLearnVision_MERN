const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers/index");

dotenv.config({
  path: "./config/env/config.env",
});

connectDatabase();

const app = express();

const PORT = process.env.PORT;

app.use("/api", routers);


app.listen(PORT, () => {
  console.log("proje port numarasi : " + PORT);
});
