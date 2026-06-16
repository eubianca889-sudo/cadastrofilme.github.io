let form = document.getElementById("formulario");

let fila_espera = [];

let resultado_espera = document.getElementById("resultado_espera");

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();

    let nome = document.getElementById("nome").value;

    let tipo_atendimento = document.querySelector('input[name = "radio_s"]:checked').value;

    adicionar(nome, tipo_atendimento);

    listar();
});

function adicionar(nome_parametro, tipo_atendimento_parametro){
    if (tipo_atendimento_parametro === "prioridade"){
        fila_espera.unshift(nome_parametro);
    } else {
        fila_espera.push(nome_parametro);
    }
    localStorage.setItem("fila_chave", fila_espera.join(", "));
}

function listar(){
    resultado_espera.innerHTML = ""; 

    local_storage = localStorage.getItem("fila_chave");
    if(local_storage == null){
        resultado_espera.innerHTML += `<p>Nenhum filme cadastrado</p>`
    } else{
        fila_espera = local_storage.split(", ");
       for(let i = 0; i < fila_espera.length; i++){
        resultado_espera.innerHTML += `
        Índice: ${i} - Valor: ${fila_espera[i]}</p>
        <input type="button" onclick="editar(${i})" value="editar">
       <input type="button" onclick="deletarindice(${i})" value="excluir">
        </br>`;
      }
    }
}

function deletarindice(indice){
    fila_espera.splice(indice, 1);
    if(fila_espera.length == 0){
        localStorage.removeItem("fila_chave");
    } else {
        localStorage.setItem("fila_chave", fila_espera.join(", "));
    }
    listar();
}

function editar(indice){
    console.log(indice);
    fila_espera[indice] = prompt(`Digite o novo nome:`);
    localStorage.setItem("fila_chave", fila_espera.join(", "));
    listar();
}

function atender(){
    fila_espera.shift();

    if(fila_espera.length == 0){
        localStorage.removeItem("fila_chave");
    } else {
        localStorage.setItem("fila_chave", fila_espera.join(", "));
    }

    listar();
}

function prioridade(){
    fila_prioridade.shift();
    listar();
}

