const app = require("../app.js");
const { User, sequelize, Accommodation, Type } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const getSeedAccommodation = require("../helpers/getSeedAccommodation");

describe("Customer Accommodation Routes Test", () => {
  const userData = {
    email: "d@mail.com",
    password: "qweqwe",
    role: "admin",
  };

  const userData2 = {
    email: "s@mail.com",
    password: "qweqwe",
    role: "customer",
  };
  let adminToken, adminId, customerToken, customerId;

  beforeAll((done) => {
    User.create(userData)
      .then((user) => {
        adminToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        adminId = user.id;
        return User.create(userData2);
      })
      .then((user2) => {
        customerToken = jwt.sign({ id: user2.id }, process.env.JWT_SECRET);
        customerId = user2.id;
        return queryInterface.bulkInsert(
          "Accommodation",
          getSeedAccommodation(adminId)
        );
      })
      .then((result) => {
        console.log(result)
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete(
        "Accommodation",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      )
      .then(() =>
        queryInterface.bulkDelete(
          "Types",
          {},
          { truncate: true, restartIdentity: true, cascade: true }
        )
      )
      .then(() =>
        queryInterface.bulkDelete(
          "Users",
          {},
          { truncate: true, restartIdentity: true, cascade: true }
        )
      )
      .then((_) => {
        done();
      })
      .catch((err) => done(err));
  });

  // describe("GET /customers/accommodations - get all accommodation by query options", () => {
  //   beforeAll((done) => {
  //     User.create(userData2)
  //       .then((_) => {
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });

  //   afterAll((done) => {
  //     queryInterface
  //       .bulkDelete("Users", {})
  //       .then(() => done())
  //       .catch((err) => done(err));
  //   });

  //   test("201 Success register - should create new Customer", (done) => {
  //     request(app)
  //       .post("/customers/register")
  //       .send(userData)
  //       .then((response) => {
  //         const { body, status } = response;
  //         expect(status).toBe(201);
  //         expect(body).toHaveProperty("accessToken", expect.any(String));
  //         const decoded = jwt.verify(body.accessToken, process.env.JWT_SECRET);
  //         expect(decoded).toHaveProperty("id", expect.any(Number));
  //         expect(decoded).toHaveProperty("email", userData.email);
  //         expect(decoded).toHaveProperty("role", "customer");
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });

  //   test("400 Failed register - should return error if email is null", (done) => {
  //     request(app)
  //       .post("/customers/register")
  //       .send({
  //         password: "qweqwe",
  //       })
  //       .then((response) => {
  //         const { body, status } = response;
  //         expect(status).toBe(400);
  //         expect(body).toHaveProperty("message", "User.email cannot be null");
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });

  //   test("400 Failed register - should return error if email is empty string", (done) => {
  //     request(app)
  //       .post("/customers/register")
  //       .send({
  //         email: "",
  //         password: "qweqwe",
  //       })
  //       .then((response) => {
  //         const { body, status } = response;
  //         expect(status).toBe(400);
  //         expect(body).toHaveProperty(
  //           "message",
  //           "Validation isEmail on email failed"
  //         );
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });

  //   test("400 Failed register - should return error if password is null", (done) => {
  //     request(app)
  //       .post("/customers/register")
  //       .send({
  //         email: "d@mail.com",
  //       })
  //       .then((response) => {
  //         const { body, status } = response;
  //         expect(status).toBe(400);
  //         expect(body).toHaveProperty(
  //           "message",
  //           "User.password cannot be null"
  //         );
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });

  //   test("400 Failed register - should return error if email is already used", (done) => {
  //     request(app)
  //       .post("/customers/register")
  //       .send({
  //         email: "s@mail.com",
  //         password: "qweqwes",
  //       })
  //       .then((response) => {
  //         const { body, status } = response;
  //         expect(status).toBe(400);
  //         expect(body).toHaveProperty("message", "s@mail.com already exists");
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });

  //   test("400 Failed register - should return error if email have invalid format", (done) => {
  //     request(app)
  //       .post("/customers/register")
  //       .send({
  //         email: "samail.com",
  //         password: "qweqwe",
  //       })
  //       .then((response) => {
  //         const { body, status } = response;
  //         expect(status).toBe(400);
  //         expect(body).toHaveProperty(
  //           "message",
  //           "Validation isEmail on email failed"
  //         );
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });
  // });
});
