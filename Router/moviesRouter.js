const express = require("express");
const Router = express.Router();
const {
  getAllMovies,
  getMoviesById,
  addNewMovie,
  updateMovies,
  validateBody,
  movieStat,
} = require("../Controller/moviesController");

Router.route("/").get(getAllMovies).post(validateBody, addNewMovie);
Router.route("/stats").get(movieStat);
Router.route("/:id").get(getMoviesById).put(updateMovies);
module.exports = Router;
