// LOGIN
/* */
function hideLogin(){
    const login = document.querySelector(".login");
    login.classList.add("hidden");
}

function verificationSuccess(resposta){
    console.log(resposta)
    hideLogin()
}

function verificationError(resposta) {
    //console.log(erro.response.status)
}

function verifyUser() { // verificar se usuário é válido
    const nameInput = document.querySelector(".input-name").value;

    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", {name: nameInput})
    promise.then(verificationSuccess);
    promise.catch(verificationError);
}


/*
// CARREGAR MENSAGENS
const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");
promise.then(verifyMessage)

function verifyMessage(resposta){
    console.log(resposta.data)
}







function sendMessage(){
    const contents = document.querySelector(".input").value; // pegar conteudo do input
    console.log(contents)

    const message = {
        hour: "12:00:00",  // NÃO SEI COMO PEGAR, SITE?
        name: "Sarah", // PEGAR DO BANCO DE DADOS
        contents
    }

    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", {name: message.name});
    promise.then(success);
    promise.catch(fail)
}

function success(resposta) {
    console.log("sucesso com o axios");
}

function fail(resposta){
    console.log("erro com o axios");
}



*/