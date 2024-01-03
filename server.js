const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./db");
const moviesRouter = require("./Router/moviesRouter");
const authRouter=require("./Router/userRouter")
const customError = require("./Utils/customError");
const globalErrorHandler=require("./Controller/errorHandler")
dotenv.config({ path: "./config/config.env" });
connectDb();
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/movies", moviesRouter);
app.use("/api/users", authRouter);
app.all("*", (req, res, next) => {
  //res.status(404).send("404 Error page not found");
  // const err=new Error("cann't find the page")
  // err.statusCode=404;
  const err = new customError("404 page not found", 404);
  next(err);
});
app.use(globalErrorHandler);
app.listen(8000, () => console.log("server has started@8000"));
