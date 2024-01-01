const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
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
    price: {
      type: Number,
    },
    createdBy: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
movieSchema.virtual("durationInHours").get(function () {
  return this.duration / 60;
});

//this middleware will be called before the saving the data into database
movieSchema.pre("save", function (next) {
  this.createdBy = "Ramesh S B";
  next();
});

movieSchema.pre("find", function (next) {
  this.find({ releaseDate: { $lte: Date.now() } });
  this.startTime = Date.now();
  next();
});
movieSchema.post("find", function (next) {
  this.endTime = Date.now();
  console.log(
    `time taken to fetch the data ${this.endTIme - this.startTime} milliseconds`
  );
 
});
const movieModel = mongoose.model("movies", movieSchema);
module.exports = movieModel;
