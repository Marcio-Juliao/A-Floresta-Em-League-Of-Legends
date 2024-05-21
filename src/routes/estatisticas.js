var express = require("express");
var router = express.Router();

var estatisticaController = require("../controllers/estatisticaController");

router.get("/top10", function (req, res) {
  estatisticaController.buscarUltimasEstatisticas(req, res);
});

router.get("/jogadores", function (req, res) {
  estatisticaController.buscarJogadores(req, res);
})

module.exports = router;