var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/enviarRelatorio", function (req, res) {
  quizController.enviarRelatorio(req, res);
});

router.get("/receberPerguntas", function (req, res) {
  quizController.receberPerguntas(req, res);
});

router.get("/receberRespostas", function (req, res) {
  quizController.receberRespostas(req, res);
});

module.exports = router;