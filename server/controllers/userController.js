const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
        res.status(201).json({ accessToken, email, role });
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
          res.status(200).json({ accessToken, email, role });
        } else {
          throw createError(400, "Invalid Email/Password");
        }
      })
      .catch(next);
  }

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      let user = await User.findOne({
        where: {
          email: payload.email,
        },
      });
      if (user === null) {
        user = await User.create({
          email: payload.email,
          password: process.env.DEFAULT_GOOGLE_PASSWORD,
          role: "staff",
        });
      }
      const { id, email, role } = user;
      const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET);
      res.send({ accessToken, email, role });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
