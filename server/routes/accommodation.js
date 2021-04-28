const router = require("express").Router();
const { Auth } = require("../middlewares");
const { AccommodationController } = require("../controllers/index")

router.post("/", Auth.authorizationStaff, AccommodationController);

module.exports = router