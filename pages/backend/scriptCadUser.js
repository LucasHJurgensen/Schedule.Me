document.getElementById("cadUser").addEventListener("submit", function(event){event.preventDefault();

    let user = document.getElementById("usuario").value;
    let password = document.getElementById("senha").value;
    let level = document.getElementById("nivel").value;

    if(passwordValidation(password)){
    
        userRegister(user, password, level);
    
    }
    
})

function passwordValidation(password){
    let confirm = "";
    
    while (confirm !== password){
        
        confirm = prompt("Insira a senha do usuário novamente para confirmar o cadastro:");

        if (confirm === null){
            
            alert("Cadastro Cancelado!");

            return false;
       
        } else if (confirm.toString().trim() !== password.toString().trim()){

            alert("Senha incorreta, insira a senha novamente");
            
        } else if(confirm.toString().trim() === password.toString().trim()){

            return true;

        }
    }
    

}

function userRegister(user, password, level){
    fetch("cadUser.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user: user, password: password, level: level}) 
    })

    .then(response => response.json())

    .then(data => {

    if(data.status === "ok"){
        alert("Usuário cadastrado com sucesso!");
        console.log(data);
   
    } else if(data.status === "already exists"){

        alert("Usuário ja cadastrado anteriormente, por favor, revise os dados");

    } else {
        
        alert("Falha no cadastro! Por favor, revise os dados");

    }
    
})
    .catch(error => console.error("Erro:", error));
}
