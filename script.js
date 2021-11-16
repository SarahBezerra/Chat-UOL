let username = "";
let message_alert = document.querySelector(".login .alert");

// START LOGIN ->
function keepLogin(){
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name: username});
}

function success(resposta){
    console.log(resposta.status);
    message_alert.innerHTML = "";
    setInterval(keepLogin, 5000);
    
    (document.querySelector(".login")).classList.add("hidden");

    Messages();
}

function fail(erro){
    console.log(erro.response.status)
    message_alert.innerHTML = "Nome em uso, digite outro nome...";
}

function verifyUser(){
    username = document.querySelector(".input-name").value;

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: username});
    promise.then(success);
    promise.catch(fail);
}
// <- END LOGIN

// START MESSAGES ->
function Messages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(loadMessages);
    promise.catch(erro => console.log(erro.response.status));

}

let cont = 0;

function loadMessages(resposta){
    const posts = document.querySelector(".posts");
    let message = "";

    let messages = resposta.data;
    console.log(messages)

    for(let i=0; i<messages.length; i++){

        if(messages[i].type === "status"){
            message =   `<div class="message status">
                        <span class="hour">${messages[i].time}</span>
                        <span class="info">${messages[i].from}</span>
                        <span class="text">${messages[i].text}</span>
                        </div>`
        }
        else if(messages[i].type === "message"){
            message =   `<div class="message">
                        <span class="hour">${messages[i].time}</span>
                        <span class="info">${messages[i].from} <span class="normal">para</span> ${messages[i].to}:</span>
                        <span class="text">${messages[i].text}</span>
                        </div>`
        }
        else if(messages[i].type === "private_message" && messages[i].to === username){
            message =   `<div class="message private">
                        <span class="hour">${messages[i].time}</span>
                        <span class="info">${messages[i].from} <span class="normal">reservadamente para</span> ${messages[i].to}:</span>
                        <span class="text">${messages[i].text}</span>
                        </div>`
        }

        posts.innerHTML += message
    }

    (document.querySelector(".message:last-child")).scrollIntoView();

    // Atualizar mensagens a cada 3 segundos
    if(cont === 0){
        setInterval(Messages, 3000);
        cont = 1;
    }
}
// END MESSAGES <-

function sendMessage(){
    const written_message = document.querySelector(".bottom_bar .input").value;
    console.log(written_message);

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", {  from: username,
                                                                                        to: "Todos",
                                                                                        text: written_message,
                                                                                        type: "message"});

    // caso sucesso: recarrega mensagens                                                                                        
    promise.then(loadMessages);

    // caso erro: recarrega a pagina, indo para a tela de login
    promise.catch(erro => {console.log(erro.response.status); window.location.reload(true)});
}

