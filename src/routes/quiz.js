var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/enviarRelatorio", function (req, res) {
  quizController.enviarRelatorio(req, res);
});

module.exports = router;