let posts = []; // array de mensagens


function sendMessage(){
    const contents = document.querySelector(".input").value; // pegar conteudo do input
    console.log(contents)

    const message = {
        hour: "12:00:00",  // NÃO SEI COMO PEGAR, SITE?
        name: "Sarah", // PEGAR DO BANCO DE DADOS
        contents
    }
    
    posts.push(message);

    console.log(posts)
}



/*


*/