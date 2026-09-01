var Lista = [];

function SalvarUser() {
    // Obtém o valor do campo de input com id "nomeUser" e armazena na variável nome
    let nomeUser = document.getElementById("nomeUser").value;

    if(nomeUser){
    Lista.push(nomeUser);
    criarLista();
    console.log(Lista);

    document.getElementById("nomeUser").value = "";
    } else {
        alert("Por favor, insira um nome."); 
    }
}


function criarLista() {
    // Obtém a referência do elemento tabela do HTML
    let tabela = document.getElementById("tabela");
    
    // Limpa a tabela e adiciona o cabeçalho com as colunas
    tabela.innerHTML = "<tr><th>Nome Usuario</th><th>Ações</th></tr>";
    
    // Percorre a lista de usuários e cria as linhas da tabela
    for (let i = 0; i < Lista.length; i++) {
        // Cria a linha com o nome do usuário
        let nomeLinha = "<td>" + Lista[i] + "</td>";
        
        // Cria os botões de ação (Editar e Deletar)
        let botoesAcao = "<td>" +
            "<button class='btn btn-success' onclick='editar(" + i + ")'>Editar</button> " +
            "<button class='btn btn-danger' onclick='deletar(" + i + ")'>Deletar</button>" +
            "</td>";
        
        // Adiciona a linha completa na tabela
        tabela.innerHTML += "<tr>" + nomeLinha + botoesAcao + "</tr>";
    }
    
    // Limpa o campo de input após adicionar à tabela
    document.getElementById("nomeUser").value = "";
}  

function deletar(i) {
    // Remove o item da lista usando splice (i-1 por causa do índice do cabeçalho)
    Lista.splice(i - 1, 1);
    
    // Deleta a linha da tabela correspondente
    document.getElementById("tabela").deleteRow(i);
    
    // Exibe a lista atualizada no console
    console.log(Lista);
    
    // Recria a tabela para atualizar a visualização
    criarLista();
}

function editar(i) {
    // Obtém o valor do item na posição (i-1) e coloca no campo de input
    document.getElementById("nomeUser").value = Lista[i - 1];
    
    // Remove o item da lista para permitir edição
    Lista.splice(i - 1, 1);
    
    // Exibe a lista atualizada no console
    console.log(Lista);
    
    // Recria a tabela para remover o item que está sendo editado
    criarLista();
} 