//- Recebe as informações inseridas pelo usuário, para o cadastro de usuários no sistema;

//- Utiliza : passwordValidation.JS e userRegister.JS

//- Utilizado por : cadUser.html

<<<<<<< HEAD


import{passwordValidation} from './passwordValidation.js';
=======
>>>>>>> master
import{userRegister} from './userRegister.js';

document.getElementById("cadUser").addEventListener("submit", function(event){event.preventDefault();

    let user = document.getElementById("usuario").value;
    let password = document.getElementById("senha").value;
    let level = document.getElementById("nivel").value;
<<<<<<< HEAD

    if (passwordValidation(password)){
    
        userRegister(user, password, level);
    
    }
=======
    
    userRegister(user, password, level);
>>>>>>> master
    
});

