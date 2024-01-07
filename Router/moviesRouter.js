const express = require("express");
const Router = express.Router();
const {
  getAllMovies,
  getMoviesById,
  addNewMovie,
  updateMovies,
  validateBody,
  movieStat,
  deleteMovie
} = require("../Controller/moviesController");
const { protect } = require("../Controller/userController");

Router.route("/")
  .get(protect,getAllMovies)
  .post(protect, validateBody, addNewMovie);
Router.route("/stats").get(movieStat);
Router.route("/:id").get(getMoviesById).put(updateMovies).delete(deleteMovie);
module.exports = Router;
