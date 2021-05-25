const router = require("express").Router();
const { BookmarkController } = require("../controllers/index");
const { authorizationCustomerOnly} = require("../middlewares/auth");

router.get("/", authorizationCustomerOnly, BookmarkController.findMyBookmark)
router.post("/", authorizationCustomerOnly, BookmarkController.create);

module.exports = router