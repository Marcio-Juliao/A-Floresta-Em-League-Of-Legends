/*
comandos para mysql server
*/

CREATE DATABASE projPessoal;

USE projPessoal;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(256),
senha VARCHAR(45),
is_jogadorLol TINYINT
);

CREATE TABLE questao (
idQuestao INT PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR(200),
pontos INT
);

CREATE TABLE tentativa (
idTentativa INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT NOT NULL,
fkQuestao INT DEFAULT NULL,
dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
acertos INT,

CONSTRAINT fkUsuarioTentativa FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
CONSTRAINT fkQuestaoTentativa FOREIGN KEY (fkQuestao) REFERENCES questao(idQuestao)
);

CREATE TABLE resposta (
idResposta INT AUTO_INCREMENT,
fkQuestao INT,
texto varchar(200),
is_correta TINYINT,

CONSTRAINT pkComposta PRIMARY KEY (idResposta, fkQuestao),
CONSTRAINT fkQuestaoResposta FOREIGN KEY (fkQuestao) REFERENCES questao(idQuestao)
);

SELECT * FROM usuario;

SHOW TABLES;

INSERT INTO questao (texto, pontos) VALUES 
	('Qual é a origem do poder mágico que concede vida e forma ao Maokai, o Ente Sinistro, em League of Legends?', 1),
	('Como os feitos de Maokai e Ivern em League of Legends podem servir de inspiração para a preservação da natureza e conscientização ambiental?', 1),
	('Como as ações de Maokai e Ivern em League of Legends refletem valores de conservação ambiental e podem inspirar os jogadores a se envolverem na proteção da natureza?', 1),
	('Qual era o nome de Ivern antes de sua transformação?', 1),
	('Como Maokai preserva a última água sagrada?', 1);
    
DESC resposta;    
    
INSERT INTO resposta (fkQuestao, texto, is_correta) VALUES 
	(1, 'Uma maldição antiga lançada por uma feiticeira poderosa.', 0),
	(1, 'As águas abençoadas das ilhas das bençãos.', 1),
	(1, 'A energia de uma árvore ancestral, absorvida durante uma batalha épica.', 0),
	(1, 'A influência de um artefato mágico criado pelos ancestrais yordles.', 0),
	(2, 'Ivern, após destruir um bosque sagrado, se transforma e passa a proteger a natureza e suas criaturas.', 1),
	(2, 'Ivern desenvolve tecnologias para a urbanização de áreas florestais.', 0),
	(2, 'Maokai lidera um exército para conquistar territórios florestais.', 0),
	(2, 'Maokai e Ivern se unem para desenvolver indústrias.', 0),
	(3, 'Maokai colabora com empresas que exploram recursos naturais de forma descontrolada.', 0),
	(3, 'Maokai usa sua força para destruir áreas florestais em busca de vingança.', 0),
	(3, 'Maokai e Ivern se unem para poluir o ambiente, aumentando os problemas ambientais no jogo.', 0),
	(3, 'Ivern trabalha para proteger a vida selvagem, promovendo a preservação da natureza.', 1),
	(4, 'Ivern, O Pai do Verde', 0),
	(4, 'Ivern, O Amável', 0),
	(4, 'Ivern, O Terrível', 1),
	(4, 'Ivern, O Conquistador', 0),
	(5, 'Guardando-a num lugar escondido de tudo e todos', 0),
	(5, 'No fundo de seu coração', 1),
	(5, 'Nas nascentes das águas tonificantes sagradas', 0),
	(5, 'Junto do coveiro, Yorick', 0);
    
SELECT * FROM questao;

SELECT * FROM questao JOIN resposta
ON fkQuestao = idQuestao;


-- Comando para inserir o relatório de tentativas
INSERT INTO tentativa (fkUsuario, acertos) VALUES 
	(1, 5);

-- Comando para pegar os dados do gráfico pizza
SELECT
	(SELECT COUNT(*) FROM usuario WHERE is_jogadorLol = 1) AS Jogou,
    (SELECT COUNT(*) FROM usuario WHERE is_jogadorLol = 0) AS NaoJogou;

    
-- Comando para pegar o top 10 no ranking
SELECT u.nome, t.acertos 
	FROM usuario u
    JOIN tentativa t
    ON t.fkUsuario = u.idUsuario
    ORDER BY t.acertos DESC
    LIMIT 10;
    
-- Inserts apenas para testes
INSERT INTO usuario (nome, email, senha, is_jogadorLol) VALUES 
	('Marcio', 'marcio.gmail', '1234', 0),
	('Marcioed', 'marcio.gmaila', '1234', 1),
	('Marciodw', 'marcio.gmail2', '1234', 1),
	('Marcioas', 'marcio.gmailb', '1234', 0);
    
INSERT INTO usuario (nome, email, senha, is_jogadorLol) VALUES 
    ('Quitéria', 'quicas.danno@quimail.com', '123quicas', 0);
    
    INSERT INTO tentativa (fkUsuario, acertos) VALUES 
	(6, 5);
    
        INSERT INTO tentativa (fkUsuario, acertos) VALUES 
	(7, 5);
    
SELECT * FROM usuario;
    
INSERT INTO tentativa (fkUsuario, acertos) VALUES 
	(2, 3),
	(2, 5),
	(1, 3),
	(3, 2),
	(5, 3);
