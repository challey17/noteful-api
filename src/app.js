require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const foldersRouter = require("./folders/folders-router");
//const NotesRouter = require("./notes/notes-router");
const app = express();
//set up env variables for local and heroku
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/api/folders", foldersRouter);
//app.use("/api/notes", NotesRouter);

// ERROR HANDLING: SHOW DETAILED ERRORS IN DEVELOPMENT,
// NON DETAILED MESSAGES IN PRODUCTION FOR SECURITY
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

app.use("/", foldersRouter);

module.exports = app;
