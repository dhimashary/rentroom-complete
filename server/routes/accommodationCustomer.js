const router = require("express").Router();
const { AccommodationCustomerController } = require("../controllers/index");

router.get("/", AccommodationCustomerController.findAll);
router.get("/:accommodationId", AccommodationCustomerController.findById);
module.exports = router