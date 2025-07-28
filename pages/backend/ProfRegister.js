export function ProfRegister(profName,userRelated,curso){
    fetch("backend/cadProf.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({profName : profName, userRelated : userRelated ,curso:curso}) 
    })

    .then(response => response.json())

    .then(data => {

    if(data.status === "ok"){
        alert("Professor cadastrado com sucesso!");
   
    } else if(data.status === "already exists"){

        alert("Professor ja cadastrado anteriormente, por favor, revise os dados");

    } else {
        
        alert("Falha no cadastro! Por favor, revise os dados");

    }
    
    })

    .catch(error => console.error("Erro:", error));
}