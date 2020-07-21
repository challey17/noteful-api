const path = require("path");
const express = require("express");
const xss = require("xss");
const FoldersService = require("./folders-service");

const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = (folder) => ({
  id: folder.id,
  name: xss(folder.name),
});

foldersRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FoldersService.getAllFolders(knexInstance)
      .then((folders) => {
        res.json(folders.map(serializeFolder));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    //DO THESE VARIABLES NEED TO MATCH MY DB? AS IN folder_name
    const { folder_name } = req.body;
    const newFolder = { folder_name };

    if (!folder_name) {
      return res.status(400).json({
        error: { message: "Folder name is required." },
      });
    }
  });
