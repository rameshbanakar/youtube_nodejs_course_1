const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./db");
const moviesRouter = require("./Router/moviesRouter");
dotenv.config({ path: "./config/config.env" });
connectDb();
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/movies", moviesRouter);
app.all("*", (req, res, next) => {
    //res.status(404).send("404 Error page not found");
    const err=new Error("cann't find the page")
    err.statusCode=404;
    next(err);
});
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
 
  res.status(error.statusCode).send(error.message);
  next();
});
app.listen(8000, () => console.log("server has started@8000"));
