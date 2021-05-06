const app = require("../app.js");
const { User, sequelize } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const getSeedAccommodation = require("../helpers/getSeedAccommodation");
const getSeedTypes = require("../helpers/getSeedTypes");

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
  let adminId;
  let seedAccommodationData;
  beforeAll((done) => {
    queryInterface
      .bulkInsert("Types", getSeedTypes())
      .then((_) => {
        return User.create(userData);
      })
      .then((user) => {
        adminId = user.id;
        return User.create(userData2);
      })
      .then((user2) => {
        seedAccommodationData = getSeedAccommodation(adminId);
        return queryInterface.bulkInsert(
          "Accommodation",
          seedAccommodationData
        );
      })
      .then((result) => {
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

  describe("GET /customers/accommodations - get all accommodation by query options", () => {
    test("200 Success Get Accommodations without query", (done) => {
      request(app)
        .get("/customers/accommodations")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", seedAccommodationData.length);
          expect(body.rows).toHaveProperty("length", 12);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("200 Success Get Accommodations with location query options", (done) => {
      request(app)
        .get("/customers/accommodations?location=bandung&page=1")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", 4);
          expect(body.rows).toHaveProperty("length", 4);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("200 Success Get Accommodations with name query options", (done) => {
      request(app)
        .get("/customers/accommodations?name=hotel&page=1")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", 7);
          expect(body.rows).toHaveProperty("length", 7);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("200 Success Get Accommodations with minprice query options", (done) => {
      request(app)
        .get("/customers/accommodations?minprice=300000&page=1")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", 17);
          expect(body.rows).toHaveProperty("length", 12);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("200 Success Get Accommodations with minprice & maxprice query options", (done) => {
      request(app)
        .get("/customers/accommodations?minprice=300000&maxprice=500000&page=1")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", 7);
          expect(body.rows).toHaveProperty("length", 7);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("200 Success Get Accommodations with maxprice query options", (done) => {
      request(app)
        .get("/customers/accommodations?maxprice=500000&page=1")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", 14);
          expect(body.rows).toHaveProperty("length", 12);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("200 Success Get Accommodations with page query options", (done) => {
      request(app)
        .get("/customers/accommodations?maxprice=500000&page=2")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", 14);
          expect(body.rows).toHaveProperty("length", 2);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("200 Success Get Accommodations with type query options", (done) => {
      request(app)
        .get("/customers/accommodations?type=2,3,4&page=1")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("count", 18);
          expect(body.rows).toHaveProperty("length", 12);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Fail to Get Accommodations if minprice > maxprice", (done) => {
      request(app)
        .get(
          "/customers/accommodations?type=2,3,4&page=1&minprice=1000000&maxprice=200"
        )
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "Maxprice can't be lower than or equal to minprice"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
