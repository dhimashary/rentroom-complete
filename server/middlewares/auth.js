const { User } = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

class Auth {
  static authentication(req, res, next) {
    jwt.verify(
      req.headers.accessToken,
      process.env.JWT_SECRET,
      (err, user) => {
        if (err) {
          next(err);
        } else {
          User.findByPk(user.id)
            .then((result) => {
              if (!result) {
                throw createError(404, "User not found!");
              }
              req.loggedInUser = user
              next();
            })
            .catch((err) => {
              next(err);
            });
        }
      }
    );
  }

  static authorizationStaff(req, res, next) {
    if (req.loggedInUser !== "staff" && req.loggedInUser !== "admin") {
      throw createError(401, "Access Unauthorized");
    } else {
      next()
    }
  }
}

module.exports = Auth