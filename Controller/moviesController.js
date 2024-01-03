const express = require("express");
const Movies = require("../Models/movieModel");
const data = require("../movies.json");

exports.validateBody = (req, res, next) => {
  let { name, releaseYear } = req.body;
  if (!name || !releaseYear) {
    return res.status(400).send("bad request");
  }
  next();
};

exports.getAllMovies = async (req, res) => {
  try {
    let filterTheMovies = req.query;
    let querystr = JSON.stringify(filterTheMovies);
    querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(querystr);

    let query = Movies.find(queryObj);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    if (req.query.fields) {
      const seletFiled = req.query.fields.split(",").join(" ");
      query = query.select(seletFiled);
    }

    let limit = req.query.limit * 1 || 10;

    let page = req.query.page * 1 || 1;

    let skipping = limit * (page - 1);

    query = query.skip(skipping).limit(limit);

    const movies = await query;
    res.send(movies);
  } catch (error) {
    res.send({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getMoviesById = async(req, res) => {
  try {
    const movie=await Movies.findById(req.params.id)
    res.send(movie);
  } catch (error) {
    res.send({
      status: "failed",
      message: error.message,
    });
  }
};

exports.addNewMovie = async (req, res) => {
  try {
    const newMovie = req.body;
    const movie = new Movies(newMovie);
    await movie.save();
    res.send(newMovie);
  } catch (error) {
    res.send({
      status: "failed",
      message: error.message,
    });
  }
};

exports.updateMovies = (req, res) => {
  try {
    let id = parseInt(req.params.id);
    movieToUpdate = data.find((el) => el.id === id);
    if (!movieToUpdate) {
      res.status(404).send("there is no movies to update" + id);
    }
    let movieIndex = data.indexOf(movieToUpdate);
    updatedMovie = Object.assign(movieToUpdate, req.body);
    data[movieIndex] = updatedMovie;
    res.send(updatedMovie);
  } catch (error) {
    res.send({
      status:"failed",
      message:error.message
    });
  }
};

exports.movieStat = async (req, res) => {
  try {
    const movie = await Movies.aggregate([
      { $match: { ratings: { $gte: 4.5 } } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$ratings" },
          minRating: { $min: "$ratings" },
          maxRating: { $max: "$ratings" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" }
        },
      },
    ]);
    res.send(movie);
  } catch (error) {
    res.send({
      status: "failed",
      message: error.message,
    });
  }
};
