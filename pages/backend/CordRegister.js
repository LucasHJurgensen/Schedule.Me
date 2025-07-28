export function CordRegister(coordName, userRelated){
    fetch("./backend/cadCoord.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({coordName : coordName, userRelated : userRelated}) 
    })

    .then(response => response.json())

    .then(data => {

    if(data.status === "ok"){
        alert("Coordenador cadastrado com sucesso!");
   
    } else if(data.status === "already exists"){

        alert("Coordenador ja cadastrado anteriormente, por favor, revise os dados");

    } else {
        
        alert("Falha no cadastro! Por favor, revise os dados");

    }
    
    })

    .catch(error => console.error("Erro:", error));
}