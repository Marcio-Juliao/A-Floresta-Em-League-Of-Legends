var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                                    res.json({
                                        id: resultadoAutenticar[0].idUsuario,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome
                                    });  
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var jogouLol = req.body.jogouLolServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (jogouLol == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {

        usuarioModel.autenticarCadastro(email)
        .then(
            function (resultadoAutenticarCadastro) {
                console.log(`\nResultados encontrados: ${resultadoAutenticarCadastro.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticarCadastro)}`); // transforma JSON em String

                console.log(resultadoAutenticarCadastro);

                if (resultadoAutenticarCadastro.length > 0) { // Caso haja um usuário cadastrado com este email, ele manda o email que já está cadastrado
                    console.log("Já há um usuário cadastrado com esse email!");
                    res.status(409).send("Email já cadastrado");
                } else { // Caso não haja um usuário cadastrado com este email, ele manda vazio
                    usuarioModel.cadastrar(nome, email, senha, jogouLol)
                    .then(
                        function (resultado) {
                            res.json(resultado);
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao realizar o cadastro! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a autenticacao do cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function autenticarCadastro(req, res) {
    var email = req.body.emailServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        usuarioModel.autenticarCadastro(email)
            .then(
                function (resultadoAutenticarCadastro) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticarCadastro.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticarCadastro)}`); // transforma JSON em String

                    console.log(resultadoAutenticarCadastro);

                    if (resultadoAutenticarCadastro.length > 0) { // Caso haja um usuário cadastrado com este email, ele manda o email que já está cadastrado
                                    res.json({
                                        email: resultadoAutenticarCadastro[0].email
                                    });  
                    } else { // Caso não haja um usuário cadastrado com este email, ele manda vazio
                        res.json({
                            email: ""
                        });  
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a autenticacao do cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    autenticar,
    cadastrar,
    autenticarCadastro
}