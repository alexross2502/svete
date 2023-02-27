const Router = require("express");
const router = new Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.check);
router.post("/add", adminController.create);

module.exports = router;
