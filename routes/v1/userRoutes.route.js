const express = require("express");

var bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const controller = require("../../controllers/user.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    res: 200,
    body: "Working",
  });
});

router.get("/random", controller.randomData);
router.get("/all", controller.all);
router.post("/save", controller.save);
router.patch("/update", controller.update);
router.patch("/bulk-update", controller.bulkUpdate);
router.delete("/delete", controller.delete);

module.exports = router;
