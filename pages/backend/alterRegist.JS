//- Recebe os dados inseridos para alteração do cadastro dos usuários e envia para o PHP;

//- Recebe os dados do PHP e indica o status da alteração;

import{passwordValidation} from './passwordValidation.js';

document.getElementById('userAlteration').addEventListener("submit", (e) => { e.preventDefault();

    let user = document.getElementById("usuario").value;
    let password = document.getElementById("senha").value;
    let level = document.getElementById("nivel").value;

    if (passwordValidation(password)){
    
        fetch('backend/alterUser.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user : user, password : password , level : level })
        })

        .then(res=>res.json())

        .then(data => {

            if(data.status === "ok"){

                alert('Cadastro de usuário atualizado com sucesso!');
                
                window.location.href = 'userSelection.html';

            } else if(data.status === "already exists"){

                alert('Usuário ja cadastrado anteriormente! Revise os dados do cadastro...');

            } else if (data.status === "failed"){

                alert("Falha no cadastro! Por favor, revise os dados");

            }

        })

        .catch(err => {
            console.error('Erro ao carregar dados do usuário:', err);
        });
    }
    
    
    
});