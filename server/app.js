if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require("express");
const app = express();
const { userRoutes } = require("./routes");
const { errorHandler } = require("./middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users/", userRoutes);
app.use(errorHandler)

module.exports = app;
