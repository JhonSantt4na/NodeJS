-- Mostra todos os Bancos de Dados
SHOW DATABASE;

-- Criar Bando de Dados
CREATE DATABASE NomeBanco;

-- Usar uma Banco
USE NomeBanco;

-- Excluir um Banco
DROP DATABASE nome_do_banco;

-- Mostra Tabelas
SHOW TABLE;

-- Criando Tabelas
CREATE TABLE nomeTabela(   
   coluna1 VARCHAR(50),    
   coluna2 VARCHAR(100),
   coluna3 INT 
);

-- Ver a estrutura da tabela no terminal  
DESCRIBE nomeTabela;

+-------+--------------+------+-----+---------+-------+
| Field   | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| coluna1 | varchar(50)  | YES  |     | NULL    |       |
| coluna2 | varchar(100) | YES  |     | NULL    |       |
| coluna3 | int          | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+

-- Tipos de Dados
VARCHAR(50)        -- Caractere Variável(quantidade) 
CHAR(50)           -- Caracteres(quantidades)
TEXT               -- Grandes blocos de Texto
INT                -- Numeros Inteiros '10'
FLOAT              -- Numeros Flutuantes '0.5'
DOUBLE             -- Precisão dupla '1.0.1'
JSON               -- Objetos JSON {"message":"success"}
BLOB               -- Objeto Binário Grande 'Imagens,audio..' (NÂO RECOMENDADO)
DATE               -- Datas 'Ano-Mes-Dia'
BOOLEAN ou TINYINT -- Apenas duas opções TRUE ou FALSE // 1 ou 0
DATETIME           -- Datas e Horas 'Ano-Mes-Dia Hora:Minutos:Segundos'
ENUM('p', 'm', 'g')-- Lista de valores possiveis

-- Inserindo dados na Tabela
INSERT INTO nomeTabela(coluna1,coluna2,coluna3) 
VALUES("ValorColuna1", "ValorColuna2", 3);

-- Ver Dados da Tabela
SELECT * FROM usuario;  -- Selecione todos os dados na tabela usuario

-- Ver Dados com Condição
SELECT * FROM nomeTabela WHERE idade > 24;  -- Retorna Todos que tem idade maior que 25 

-- Excluir uma tabela    (ATENÇÂO NUNCA USAR ESSES COMANDO SEM CONHECIMENTO)
DROP TABLE nomeTabela; --ou 
DELETE FROM nomeTabela; -- (Apaga toda a tabela)

-- Excluir dados especificos ultiliza o WHERE
DELETE FROM nomeTabela WHERE coluna1 = "ValorColuna1";

-- Adicionar uma coluna nova em uma tabela existente
ALTER TABLE nomeTabela ADD colunaNova VARCHAR(100);

-- Remover uma coluna existente
ALTER TABLE nomeTabela DROP COLUMN colunaNova;

-- Atualizar dados na tabela
UPDATE nomeTabela SET coluna1 = 'ValorColuna1';  -- Dessa forma todos ficam com esse nome
-- SEMPRE USAR O WHERE
UPDATE nomeTabela SET coluna1  = 'ValorColuna1Nova' WHERE coluna2 = "ValorColuna2" --Atualiza o dados da coluna 2 


