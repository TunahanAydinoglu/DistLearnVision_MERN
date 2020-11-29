const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");
const cors = require("cors");

//Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});

//MongoDb Connection
connectDatabase();

//localhost:5000//api/questions
const app = express();

//Express - Body Middleware
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors());

// Routers Middleware
app.use("/api", routers);
//ErrorHandler
app.use(customErrorHandler);
//Static Files
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`App started on:${PORT} : ${process.env.NODE_ENV}`);
});
