const express = require("express");
const Router = express.Router();
const {
  getAllMovies,
  getMoviesById,
  addNewMovie,
  updateMovies,
  validateBody,
} = require("../Controller/moviesController");

Router.route("/").get(getAllMovies).post(validateBody,addNewMovie);
Router.route("/:id").get(getMoviesById).put(updateMovies);
module.exports = Router;
