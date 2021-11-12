// LOGIN
function hideLogin(){
    const login = document.querySelector(".login");
    login.classList.add("hidden");
}

function verificationSuccess(resposta){
    console.log(resposta)
    hideLogin()
    // add function carregar mensagens
}

function verificationError(erro) {
    console.log(erro.response.status)
}

function verifyUser() { // verifica se usuário é válido
    const nameInput = document.querySelector(".input-name").value;

    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", {name: nameInput})
    promise.then(verificationSuccess);
    promise.catch(verificationError);
}



// CARREGAR MENSAGENS
const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");
promise.then(verifyMessage)

function verifyMessage(resposta){
    const server_data = resposta.data;   
    console.log(server_data)

    for(let i=0; i<server_data.length; i++){
        if(server_data[i].type === "message" && server_data[i].to === "Todos"){
            const posts = document.querySelector(".posts");
            posts.innerHTML += `<div class="message">
                                    <span class="hour">(${server_data[i].time})</span>
                                    <span class="info"> ${server_data[i].from} <span class="normal"> para </span> ${server_data[i].to}: </span>
                                    <span class="contents"> ${server_data[i].text} </span> 
                                </div>`
        }
        
    }

    const message_hour = document.querySelector(".message .hour");
    //message_hour.innerHTML = resposta.data[0].time;
    //console.log(message_hour)

    const message_info = document.querySelector(".message .info");
    //console.log(message_info)

    const message_contents = document.querySelector(".message .contents");
    //console.log(message_contents)

}



/*



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