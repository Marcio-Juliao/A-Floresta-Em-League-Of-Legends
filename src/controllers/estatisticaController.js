var estatisticaModel = require("../models/estatisticaModel");

function buscarUltimasEstatisticas(req, res) {

    const limite_linhas = 10;

    console.log(`Recuperando as ${limite_linhas} pontuacoes mais altas`);

    estatisticaModel.buscarUltimasEstatisticas(limite_linhas)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as pontuacoes mais altas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarJogadores(req, res) {

    console.log(`Recuperando os jogadores que jogaram ou não jogaram League of Legends...`);

    estatisticaModel.buscarJogadores()
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados dos jogadores.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasEstatisticas,
    buscarJogadores
  }