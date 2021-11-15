// LOGIN
let userName = "";

function hideLogin(){
    const login = document.querySelector(".login");
    login.classList.add("hidden");
}

//  usuário sendo válido: some com a tela de login e carrega as mensagens
function verificationSuccess(resposta){
    hideLogin();
    loadMessages();
}

function verificationError(erro) {
    console.log(erro.response.status)
    console.log(erro.response.data)
    const erro_name = document.querySelector(".alert")
    erro_name.innerHTML = "* Nome em uso, digite outro nome"
}

function verifyUser() { // verifica se usuário é válido
    userName = document.querySelector(".input-name").value;

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: userName})
    //setInterval(verifyUser, 5000);
    promise.then(verificationSuccess); // quando sucesso
    promise.catch(verificationError); // quando erro
}



// CARREGAR MENSAGENS
function loadMessages(){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");
    promise.then(verifyMessage)
    const send_message_status = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages", {from: userName, to: "Todos", text: "entra na sala...", type: "status"});
    send_message_status.then(success_message)
    send_message_status.catch(erro_message)
}

function success_message(resposta){
    console.log("deu certoo")
}
function erro_message(resposta){
    console.log("deu errado")
}

function verifyMessage(resposta){
    const server_data = resposta.data;   

    for(let i=0; i<server_data.length; i++){
        const posts = document.querySelector(".posts");
        let message = "";

        // mostrando mensagens de texto
        if(server_data[i].type === "message" && server_data[i].to === "Todos"){
            message = `<div class="message">
                                    <span class="hour">(${server_data[i].time})</span>
                                    <span class="info"> ${server_data[i].from} <span class="normal"> para </span> ${server_data[i].to}: </span>
                                    <span class="contents"> ${server_data[i].text} </span> 
                                </div>`
        }
        // mostrando mensagens de status
        else if(server_data[i].type === "status"){
            message = `<div class="message status">
                                    <span class="hour">(${server_data[i].time})</span>
                                    <span class="info"> ${server_data[i].from}</span>
                                    <span class="contents"> ${server_data[i].text} </span> 
                                </div>`
        }
        // mostrando mensagens privadas
        else if(server_data[i].type === "private_message" && server_data[i].to === userName){
            
            message = `<div class="message private">
                                    <span class="hour">(${server_data[i].time})</span>
                                    <span class="info"> ${server_data[i].from} <span class="normal"> reservadamente para </span> ${server_data[i].to}: </span>
                                    <span class="contents"> ${server_data[i].text} </span>
                                </div>`
        }
        posts.innerHTML += message;
    }
    
    // MOSTRAR A ULTIMA MENSAGEM NA TELA
    let last_message = document.querySelector(".message:last-child")
    last_message.scrollIntoView();
    
}

// RECARREGAR MENSAGENS A CADA 3 SEGUNDOS
//setInterval(loadMessages, 3000);


const message_hour = document.querySelector(".message .hour");
//message_hour.innerHTML = resposta.data[0].time;
//console.log(message_hour)

const message_info = document.querySelector(".message .info");
//console.log(message_info)

const message_contents = document.querySelector(".message .contents");
//console.log(message_contents)






function sendMessage(){
    const contents = document.querySelector(".bottom_bar .input").value; // pegar conteudo do input
    console.log(contents)

    const message = {
        from: userName,
        to: "Todos",
        text: contents,
        type: "message"
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", message);
    promise.then(sendNewMessage);
    promise.catch(fail);
}

function sendNewMessage(resposta){
    console.log(resposta.config.data)
}

function fail(resposta){
    console.log(resposta)
    console.log(resposta.response.status)
    console.log("erro ao enviar");
}

/*

*/