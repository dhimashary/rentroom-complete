const { User, Accommodation } = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

class Auth {
  static authentication(req, res, next) {
    jwt.verify(
      req.headers.access_token,
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
              req.loggedInUser = user;
              next();
            })
            .catch((err) => {
              next(err);
            });
        }
      }
    );
  }

  static authorizationAdminOrStaff(req, res, next) {
    if (
      req.loggedInUser.role !== "staff" &&
      req.loggedInUser.role !== "admin"
    ) {
      next(createError(401, "Access Unauthorized"));
    } else {
      next()
    }
  }

  static authorizationAdminOrAuthor(req, res, next) {
    if (req.loggedInUser.role === "admin") {
      next();
    } else if (req.loggedInUser.role === "staff") {
      Accommodation.findByPk(req.params.accommodationId)
        .then((accommodation) => {
          if (accommodation.authorId === req.loggedInUser.id) {
            next();
          } else {
            next(createError(401, "Access Unauthorized"));
          }
        })
        .catch(next);
    } else {
      next(createError(401, "Access Unauthorized"));
    }
  }

  static authorizationAdminOnly(req, res, next) {
    if (req.loggedInUser.role !== "admin") {
      next(createError(401, "Access Unauthorized"));
    } else {
      next();
    }
  }

  static authorizationCustomerOnly(req, res, next) {
    if (req.loggedInUser.role !== "customer") {
      next(createError(401, "Access Unauthorized"));
    } else {
      next();
    }
  }
}

module.exports = Auth;
