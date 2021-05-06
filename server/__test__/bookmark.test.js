const app = require("../app.js");
const { User, sequelize, Bookmark, Type } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const getSeedAccommodation = require("../helpers/getSeedAccommodation");
const getSeedTypes = require("../helpers/getSeedTypes");
const jwt = require("jsonwebtoken");

describe("Bookmark Accommodation Test", () => {
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
  let adminId, adminToken, customerToken, customerId, currentBookmark;
  let seedAccommodationData;
  beforeAll((done) => {
    queryInterface.bulkInsert("Types", getSeedTypes())
      .then((_) => {
        return User.create(userData);
      })
      .then((user) => {
        adminId = user.id;
        adminToken = jwt.sign(
          { id: adminId, email: user.email, role: user.role },
          process.env.JWT_SECRET
        );
        return User.create(userData2);
      })
      .then((user2) => {
        customerId = user2.id;
        customerToken = jwt.sign(
          { id: user2.id, email: user2.email, role: user2.role },
          process.env.JWT_SECRET
        );
        seedAccommodationData = getSeedAccommodation(adminId);
        return queryInterface.bulkInsert(
          "Accommodation",
          seedAccommodationData
        );
      })
      .then((_) => {
        return Bookmark.create({
          customerId,
          accommodationId: 2,
        });
      })
      .then((result) => {
        currentBookmark = result;
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
          "Bookmarks",
          {},
          { truncate: true, restartIdentity: true, cascade: true }
        )
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
  describe("GET /customers/bookmarks GET Logged In Customer Bookmark", () => {
    test("200 return bookmarked accommodation", (done) => {
      request(app)
        .get("/customers/bookmarks")
        .set({
          access_token: customerToken,
        })
        .then((response) => {
          const { body, status } = response;
          const { Accommodation } = body[0];
          expect(status).toBe(200);
          expect(body.length).toBe(1);
          expect(body[0]).toHaveProperty("customerId", customerId);
          expect(body[0]).toHaveProperty(
            "accommodationId",
            currentBookmark.accommodationId
          );
          expect(body[0]).toHaveProperty("Accommodation");
          expect(Accommodation).toHaveProperty("Type");
          expect(Accommodation.Type).toHaveProperty("name");
          expect(Accommodation.typeId).toBe(seedAccommodationData[1].typeId);
          expect(Accommodation.authorId).toBe(
            seedAccommodationData[1].authorId
          );
          expect(Accommodation.facility).toBe(
            seedAccommodationData[1].facility
          );
          expect(Accommodation.price).toBe(seedAccommodationData[1].price);
          expect(Accommodation.location).toBe(
            seedAccommodationData[1].location
          );
          expect(Accommodation.imgUrl).toBe(seedAccommodationData[1].imgUrl);
          expect(Accommodation.status).toBe(seedAccommodationData[1].status);
          expect(Accommodation.roomCapacity).toBe(
            seedAccommodationData[1].roomCapacity
          );
          done();
        });
    });
    test("401 Failed to get Bookmarks if no access_token provided", (done) => {
      request(app)
        .get("/customers/bookmarks")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Failed to authenticate");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 Failed to get Bookmark if access_token provided is not from customer role", (done) => {
      request(app)
        .post("/customers/bookmarks")
        .set({
          access_token: adminToken,
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Access Unauthorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  describe("POST /customers/bookmarks Create Accommodation Bookmark", () => {
    test("201 return new created bookmark", (done) => {
      request(app)
        .post("/customers/bookmarks")
        .set({ access_token: customerToken })
        .send({ accommodationId: 1 })
        .then((response) => {
          const { body, status } = response;
          const { Accommodation } = body;
          expect(status).toBe(201);
          expect(body).toHaveProperty("Accommodation");
          expect(body).toHaveProperty("accommodationId", 1);
          expect(body).toHaveProperty("customerId", customerId);
          expect(Accommodation).toHaveProperty("Type");
          expect(Accommodation.Type).toHaveProperty("name");
          expect(Accommodation.typeId).toBe(seedAccommodationData[0].typeId);
          expect(Accommodation.authorId).toBe(
            seedAccommodationData[0].authorId
          );
          expect(Accommodation.facility).toBe(
            seedAccommodationData[0].facility
          );
          expect(Accommodation.price).toBe(seedAccommodationData[0].price);
          expect(Accommodation.location).toBe(
            seedAccommodationData[0].location
          );
          expect(Accommodation.imgUrl).toBe(seedAccommodationData[0].imgUrl);
          expect(Accommodation.status).toBe(seedAccommodationData[0].status);
          expect(Accommodation.roomCapacity).toBe(
            seedAccommodationData[0].roomCapacity
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Failed to Bookmark if no accommodationId provided", (done) => {
      request(app)
        .post("/customers/bookmarks")
        .set({ access_token: customerToken })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "Bookmark.accommodationId cannot be null"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 Failed to Bookmark if no access_token provided", (done) => {
      request(app)
        .post("/customers/bookmarks")
        .send({ accommodationId: 1 })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Failed to authenticate");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 Failed to Bookmark if access_token provided is not from customer role", (done) => {
      request(app)
        .post("/customers/bookmarks")
        .set({
          access_token: adminToken,
        })
        .send({ accommodationId: 1 })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Access Unauthorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
