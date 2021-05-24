const router = require("express").Router();
const { UserController } = require("../controllers");

router.post("/register", UserController.registerCustomer);
router.post("/login", UserController.login);
router.post("/googlelogin", UserController.customerGoogleLogin);

module.exports = router;
