const mongoose=require("mongoose")
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required filed please provide the movie name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description of the movie is required"],
  },
  duration: {
    type: Number,
  },
  ratings: {
    type: Number,
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  genres: {
    type: [String],
  },
  directors: {
    type: [String],
  },
  coverImage: {
    type: String,
  },
  actors: {
    type: [String],
  },
  price:{
    type:Number
  }
});
const movieModel = mongoose.model("movies", movieSchema);
module.exports = movieModel;