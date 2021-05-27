const router = require("express").Router();
const { AccommodationCustomerController, AccommodationController } = require("../controllers/index");

router.get("/", AccommodationCustomerController.findAll);
router.get("/:accommodationId", AccommodationController.findById);
module.exports = router