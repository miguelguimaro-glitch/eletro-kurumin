

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eletro_kurumin"
});


db.connect(function (erro) {
    if (erro) {
        console.log("Erro ao conectar ao MySQL");
    } else {
        console.log("MySQL conectado!");
    }
});




app.get("/componentes", function (req, res) {
    db.query("SELECT * FROM componente", function (erro, resultados) {
        if (erro) {
            res.send(erro);
        } else {
            res.json(resultados);
        }
    });
});






app.post("/cadastrar", function (req, res) {
    let componente = req.body;


    db.query(
        "INSERT INTO componente (nome, descricao, preco, quantidade_estoque, id_categoria, id_usuario) VALUES (?, ?, ?, ?, ?, ?)",
        [
            componente.nome,
            componente.descricao,
            componente.preco,
            componente.quantidade,
            1,
            1
        ],
        function (erro) {
            if (erro) {
                res.send(erro);
            } else {
                res.send("Componente cadastrado!");
            }
        }
    );
});




app.delete("/excluir/:id", function (req, res) {
    let id = req.params.id;


    db.query(
        "DELETE FROM componente WHERE id_componente = ?",
        [id],
        function (erro) {
            if (erro) {
                res.send(erro);
            } else {
                res.send("Componente excluído!");
            }
        }
    );
});


app.put("/editar/:id", function (req, res) {
    let id = req.params.id;
    let componente = req.body;


    db.query(
        "UPDATE componente SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ? WHERE id_componente = ?",
        [
            componente.nome,
            componente.descricao,
            componente.preco,
            componente.quantidade,
            id
        ],
        function (erro) {
            if (erro) {
                res.send(erro);
            } else {
                res.send("Componente atualizado!");
            }
        }
    );
});


app.post("/login", function (req, res) {
    let email = req.body.email;
    let senha = req.body.senha;


    db.query(
        "SELECT * FROM usuario WHERE email = ? AND senha = ?",
        [email, senha],
        function (erro, resultados) {
            if (erro) {
                res.send(erro);
            } else if (resultados.length > 0) {
                res.send("Login realizado!");
            } else {
                res.send("E-mail ou senha incorretos!");
            }
        }
    );
});


app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
});