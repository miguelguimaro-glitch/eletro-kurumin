function login() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;


    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(resposta => resposta.text())
    .then(mensagem => {
        if (mensagem == "Login realizado!") {
            window.location.href = "componentes.html";
        } else {
            alert(mensagem);
        }
    })
    .catch(() => {
        alert("Não foi possível conectar ao servidor!");
    });
}








function cadastrar() {
    let nome = document.getElementById("nome").value;
    let descricao = document.getElementById("descricao").value;
    let preco = document.getElementById("preco").value;
    let quantidade = document.getElementById("quantidade").value;


    fetch("http://localhost:3000/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade
        })
    })
    .then(resposta => resposta.text())
    .then(mensagem => {
        alert(mensagem);
        carregarComponentesBanco();
    });
}








function excluir(id) {
    if (confirm("Deseja excluir este componente?")) {
        fetch("http://localhost:3000/excluir/" + id, {
            method: "DELETE"
        })
        .then(resposta => resposta.text())
        .then(mensagem => {
            alert(mensagem);
            carregarComponentesBanco();
        });
    }
}








function mostrarComponentes() {
    let componentes = JSON.parse(localStorage.getItem("componentes")) || [];


    let lista = document.getElementById("lista");
    lista.innerHTML = "";


    for (let i = 0; i < componentes.length; i++) {
        lista.innerHTML += `
            <tr>
                <td>${componentes[i].nome}</td>
                <td>R$ ${componentes[i].preco}</td>
                <td>${componentes[i].quantidade}</td>
                <td>
                    <button onclick="editar(${i})">Editar</button>
                    <button onclick="excluir(${i})">Excluir</button>
                </td>
            </tr>
        `;
    }
}






function editar(id, nomeAtual, precoAtual, quantidadeAtual) {
    let nome = prompt("Novo nome:", nomeAtual);
    let descricao = prompt("Nova descrição:");
    let preco = prompt("Novo preço:", precoAtual);
    let quantidade = prompt("Nova quantidade:", quantidadeAtual);


    if (nome != null && descricao != null && preco != null && quantidade != null) {
        fetch("http://localhost:3000/editar/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                descricao: descricao,
                preco: preco,
                quantidade: quantidade
            })
        })
        .then(resposta => resposta.text())
        .then(mensagem => {
            alert(mensagem);
            carregarComponentesBanco();
        });
    }
}




function gerarRelatorio() {
    fetch("http://localhost:3000/componentes")
        .then(resposta => resposta.json())
        .then(componentes => {
            let lista = document.getElementById("relatorio");
            let total = 0;


            lista.innerHTML = "";


            for (let i = 0; i < componentes.length; i++) {
                let nome = componentes[i].nome;
                let preco = parseFloat(componentes[i].preco);
                let quantidade = parseInt(componentes[i].quantidade_estoque);
                let valor = preco * quantidade;


                total += valor;


                lista.innerHTML += `
                    <tr>
                        <td>${nome}</td>
                        <td>${quantidade}</td>
                        <td>R$ ${preco.toFixed(2)}</td>
                        <td>R$ ${valor.toFixed(2)}</td>
                    </tr>
                `;
            }


            document.getElementById("total").innerText =
                "Valor total do estoque: R$ " + total.toFixed(2);
        });
}






function carregarComponentesBanco() {
    fetch("http://localhost:3000/componentes")
        .then(resposta => resposta.json())
        .then(componentes => {
            let lista = document.getElementById("lista");
            lista.innerHTML = "";


            for (let i = 0; i < componentes.length; i++) {
                lista.innerHTML += `
                    <tr>
                        <td>${componentes[i].nome}</td>
                        <td>R$ ${componentes[i].preco}</td>
                        <td>${componentes[i].quantidade_estoque}</td>
                        <td>
                            <button onclick="editar(
                                ${componentes[i].id_componente},
                                '${componentes[i].nome}',
                                ${componentes[i].preco},
                                ${componentes[i].quantidade_estoque}
                            )">Editar</button>


                            <button onclick="excluir(${componentes[i].id_componente})">
                                Excluir
                            </button>
                        </td>
                    </tr>
                `;
            }
        });
}