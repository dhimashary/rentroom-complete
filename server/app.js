if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");

const {
  userRoutes,
  accommodationRoutes,
  customerRoutes,
  typeRoutes,
  historyRoutes,
  accommodationCustomerRoutes,
  bookmarkRoutes
} = require("./routes");
const { errorHandler, Auth } = require("./middlewares");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    repository: "https://github.com/dhimashary/rentroom-complete"
  });
});
app.use("/users/", userRoutes);
app.use("/types", typeRoutes);
app.use("/customers/accommodations/", accommodationCustomerRoutes);
app.use("/customers/", customerRoutes);
app.use(Auth.authentication);
app.use("/customers/bookmarks", bookmarkRoutes);
app.use("/histories", historyRoutes);
app.use("/accommodations/", accommodationRoutes);
app.use(errorHandler);

module.exports = app;
