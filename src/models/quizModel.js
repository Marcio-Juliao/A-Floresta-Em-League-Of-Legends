var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function enviarRelatorio(id, acertos) {

    var instrucaoSql = `
            INSERT INTO tentativa (fkUsuario, acertos) VALUES 
	            (${id}, ${acertos});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviarRelatorio
};