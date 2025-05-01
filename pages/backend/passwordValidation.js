//- Função de verificação de senha, onde o usuário tem que colocar novamente a senha para confirmar o cadasto;

//- Utilizado por: scriptCadUser.JS e alterRegist.JS


export function passwordValidation(password){
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