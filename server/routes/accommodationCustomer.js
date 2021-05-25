const router = require("express").Router();
const { AccommodationCustomerController } = require("../controllers/index");

router.get("/", AccommodationCustomerController.findAll);

module.exports = router