var database = require("../database/config");

function buscarUltimasEstatisticas(limite) {

    var instrucaoSql = `SELECT u.nome, t.acertos 
                        FROM usuario u
                        JOIN tentativa t
                        ON t.fkUsuario = u.idUsuario
                        ORDER BY t.acertos DESC
                        LIMIT ${limite};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarJogadores() {

    var instrucaoSql = `SELECT
	(SELECT COUNT(*) FROM usuario WHERE is_jogadorLol = 1) AS sim,
    (SELECT COUNT(*) FROM usuario WHERE is_jogadorLol = 0) AS nao;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasEstatisticas,
    buscarJogadores
}