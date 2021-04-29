const router = require("express").Router();
const { Auth } = require("../middlewares");
const { AccommodationController } = require("../controllers/index");

router.get("/", AccommodationController.findAll);
router.post("/", Auth.authorizationAdminOrStaff, AccommodationController.create);
router.delete("/:accommodationId", Auth.authorizationAdminOrAuthor, AccommodationController.delete);
router.put("/:accommodationId", Auth.authorizationAdminOrAuthor, AccommodationController.update);

module.exports = router