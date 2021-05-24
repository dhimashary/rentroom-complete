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
      role: "customer",
    })
      .then((user) => {
        const { id, email, role, avatar } = user;
        const accessToken = jwt.sign(
          { id, email, role },
          process.env.JWT_SECRET
        );
        res.status(201).json({ accessToken, avatar });
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
        if (user) {
          const isPasswordValid = bcryptjs.compareSync(password, user.password);
          if (isPasswordValid) {
            const { id, email, role, avatar } = user;
            const accessToken = jwt.sign(
              { id, email, role },
              process.env.JWT_SECRET
            );
            res.status(200).json({ accessToken, email, role, avatar });
          } else {
            next(createError(400, "Invalid Email/Password"));
          }
        } else {
          next(createError(400, "Invalid Email/Password"));
        }
      })
      .catch(next);
  }

  static loginAdminStaff(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (user) {
          if (user.role === "customer") {
            throw createError(401, "You already registered as Customer");
          }
          const isPasswordValid = bcryptjs.compareSync(password, user.password);
          if (isPasswordValid) {
            const { id, email, role, avatar } = user;
            const accessToken = jwt.sign(
              { id, email, role },
              process.env.JWT_SECRET
            );
            res.status(200).json({ accessToken, email, role, avatar });
          } else {
            next(createError(400, "Invalid Email/Password"));
          }
        } else {
          next(createError(400, "Invalid Email/Password"));
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
      } else if (user.role !== "customer") {
        throw createError(
          401,
          "Your account already registered as " + user.role
        );
      }
      const { id, email, role } = user;
      const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET);
      res.send({ accessToken, email, role });
    } catch (error) {
      next(error);
    }
  }

  static async customerGoogleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: GOOGLE_CLIENT_ID,
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
          role: "customer",
        });
      } else if (user.role !== "customer") {
        throw createError(
          401,
          "Your account already registered as admin/staff"
        );
      }
      const { id, email, role, avatar } = user;
      const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET);
      res.send({ accessToken, email, role, avatar });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
