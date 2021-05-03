const router = require("express").Router();
const { TypeController } = require("../controllers/index");

router.get("/", TypeController.findAll);

module.exports = router