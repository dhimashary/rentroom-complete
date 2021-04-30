const router = require("express").Router();
const { UserController } = require("../controllers");

router.post("/register", UserController.registerAdmin);
router.post("/login", UserController.login);
router.post("/googlelogin", UserController.googleLogin);

module.exports = router;
