const router = require("express").Router();
const { Auth } = require("../middlewares");
const { AccommodationController } = require("../controllers/index");
const upload = require("multer")();

router.get("/", AccommodationController.findAll);
router.get("/:accommodationId", AccommodationController.findById);
router.post("/", upload.single("accommodationImage"), Auth.authorizationAdminOrStaff, AccommodationController.create);
router.delete("/:accommodationId", Auth.authorizationAdminOrAuthor, AccommodationController.delete);
router.put("/:accommodationId", Auth.authorizationAdminOrAuthor, AccommodationController.update);

module.exports = router