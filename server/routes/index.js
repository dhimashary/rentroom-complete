const userRoutes = require("./user");
const accommodationRoutes = require("./accommodation");
const typeRoutes = require("./type");
const historyRoutes = require("./history");
const accommodationCustomerRoutes = require("./accommodationCustomer");
const customerRoutes = require("./customer");
const bookmarkRoutes = require("./bookmark")

module.exports = {
  accommodationRoutes,
  accommodationCustomerRoutes,
  bookmarkRoutes,
  customerRoutes,
  userRoutes,
  historyRoutes,
  typeRoutes,
};
