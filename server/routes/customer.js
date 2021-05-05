const router = require("express").Router();
const { UserController } = require("../controllers");

router.post("/register", UserController.registerCustomer);
router.post("/login", UserController.login);

module.exports = router;
