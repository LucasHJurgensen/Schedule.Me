//- Envia os dados para que o PHP realize o cadastro do usuário no sistema;

//- Utiliza : cadUser.php;

//- Utilizado por : scriptCadUser.JS.

export function userRegister(user, password, level){
    fetch("./backend/cadUser.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user: user, password: password, level: level}) 
    })

    .then(response => response.json())

    .then(data => {

    if(data.status === "ok"){
        alert("Usuário cadastrado com sucesso!");
        console.log(data);
<<<<<<< HEAD
   
=======
        
        window.location.href = 'menuCadUser.html';
        
>>>>>>> master
    } else if(data.status === "already exists"){

        alert("Usuário ja cadastrado anteriormente, por favor, revise os dados");

    } else {
        
        alert("Falha no cadastro! Por favor, revise os dados");

    }
    
})
    .catch(error => console.error("Erro:", error));
}