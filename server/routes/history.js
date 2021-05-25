const router = require("express").Router();
const { Auth } = require("../middlewares");
const { HistoryController } = require("../controllers/index");

router.get("/", Auth.authorizationAdminOrStaff, HistoryController.findAll)

module.exports = router