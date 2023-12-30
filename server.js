const express = require("express");
const app = express();
const dotenv=require("dotenv")
const connectDb = require("./db");
const moviesRouter = require("./Router/moviesRouter");
dotenv.config({ path: "./config/config.env" });
connectDb();
app.use(express.json());
app.use(express.static("./public"))
app.use("/api/movies", moviesRouter);
app.listen(8000, () => console.log("server has started@8000"));
