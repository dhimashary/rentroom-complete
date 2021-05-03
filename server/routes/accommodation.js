const router = require("express").Router();
const { Auth, uploadImgur } = require("../middlewares");
const { AccommodationController } = require("../controllers/index");
const upload = require("multer")();

router.get("/", AccommodationController.findAll);
router.get("/:accommodationId", AccommodationController.findById);
router.post("/",  Auth.authorizationAdminOrStaff, upload.single("accommodationImage"), uploadImgur, AccommodationController.create);
router.delete("/:accommodationId", Auth.authorizationAdminOrAuthor, AccommodationController.delete);
router.put("/:accommodationId", Auth.authorizationAdminOrAuthor, AccommodationController.update);

module.exports = router