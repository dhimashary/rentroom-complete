const router = require("express").Router();
const { Auth, uploadImgur, imageValidation } = require("../middlewares");
const { AccommodationController } = require("../controllers/index");
const upload = require("multer")({
});

router.get("/", AccommodationController.findAll);
router.get("/:accommodationId", AccommodationController.findById);
router.post(
  "/",
  Auth.authorizationAdminOrStaff,
  upload.single("accommodationImage"),
  imageValidation,
  uploadImgur,
  AccommodationController.create
);
router.delete(
  "/:accommodationId",
  Auth.authorizationAdminOrAuthor,
  AccommodationController.delete
);
router.put(
  "/:accommodationId",
  Auth.authorizationAdminOrAuthor,
  upload.single("accommodationImage"),
  imageValidation,
  uploadImgur,
  AccommodationController.update
);
router.patch(
  "/status/:accommodationId",
  Auth.authorizationAdminOnly,
  AccommodationController.updateStatus
);

module.exports = router;
