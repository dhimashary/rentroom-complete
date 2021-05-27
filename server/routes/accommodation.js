const router = require("express").Router();
const { Auth, uploadImageKit, imageValidation } = require("../middlewares");
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
  uploadImageKit,
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
  uploadImageKit,
  AccommodationController.update
);
router.patch(
  "/status/:accommodationId",
  Auth.authorizationAdminOnly,
  AccommodationController.updateStatus
);

module.exports = router;
