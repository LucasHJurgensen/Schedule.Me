//- Recebe os dados inseridos para alteração do cadastro dos usuários e envia para o PHP;

//- Recebe os dados do PHP e indica o status da alteração;

import{passwordValidation} from './passwordValidation.js';

function alterRegist(){
<<<<<<< HEAD

    let user = document.getElementById("usuario").value;
    let password = document.getElementById("senha").value;
    let level = document.getElementById("nivel").value;

    if (passwordValidation(password)){
=======
    let params = new URLSearchParams(window.location.search);
    let userAnt = params.get('user');

    let user = document.getElementById("usuario").value;
    let level = document.getElementById("nivel").value;

    
    console.log(userAnt, user, level);
>>>>>>> master
    
        fetch('backend/alterUser.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
<<<<<<< HEAD
            body: JSON.stringify({user : user, password : password , level : level })
=======
            body: JSON.stringify({userAnt:userAnt, user : user, level : level })
>>>>>>> master
        })

        .then(res=>res.json())

        .then(data => {

            if(data.status === "ok"){

                alert('Cadastro de usuário atualizado com sucesso!');
                
                window.location.href = 'userSelection.html';

            } else if(data.status === "already exists"){

                alert('Usuário ja cadastrado anteriormente! Revise os dados do cadastro...');

            } else if (data.status === "failed"){

<<<<<<< HEAD
                alert("Falha no cadastro! Por favor, revise os dados");
=======
                alert("Falha na alteração dos dados! Por favor, revise os dados");
>>>>>>> master

            }

        })

        .catch(err => {
            console.error('Erro ao carregar dados do usuário:', err);
        });
<<<<<<< HEAD
    }
=======
    
>>>>>>> master
}

document.getElementById("buttonAlterar").addEventListener("click", alterRegist);