const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const createError = require("http-errors");

class UserController {
  static registerAdmin(req, res, next) {
    const { email, password } = req.body;
    User.create({
      email,
      password,
      role: "admin",
    })
      .then((user) => {
        const { id, email, role } = user;
        const accessToken = jwt.sign(
          { id, email, role },
          process.env.JWT_SECRET
        );
        res.status(201).json({ accessToken });
      })
      .catch(next);
  }

  static registerCustomer(req, res, next) {
    const { email, password } = req.body;
    User.create({
      email,
      password,
    })
      .then((user) => {
        const { id, email, role } = user;
        const accessToken = jwt.sign(
          { id, email, role },
          process.env.JWT_SECRET
        );
        res.status(201).json({ accessToken });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (user && isPasswordValid) {
          const { id, email, role } = user;
          const accessToken = jwt.sign(
            { id, email, role },
            process.env.JWT_SECRET
          );
          res.status(200).json({ accessToken });
        } else {
          throw createError(400, "Invalid Email/Password");
        }
      })
      .catch(next);
  }

  static loginGoogle(req, res, next) {
    res.send("ok3");
  }
}

module.exports = UserController;
