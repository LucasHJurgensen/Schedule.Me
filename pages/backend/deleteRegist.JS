import{passwordValidation} from './passwordValidation.js';

function deleteRegist(){
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("senha").value;
    let level = document.getElementById("nivel").value;

    if (passwordValidation(password)){
    
        fetch('backend/deleteUser.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user : user, password : password , level : level })
        })

        .then(res=>res.json())

        .then(data => {

            if(data.status === "ok"){

                alert('Cadastro de usuário deletado com sucesso!');
                
                window.location.href = 'userSelection.html';

            } else if (data.status === "failed"){

                alert("A exclusão do usuário falhou! Tente novamente ou revise os dados!");

            }

        })

        .catch(err => {
            console.error('Erro ao carregar dados do usuário:', err);
        });
    }
}

document.getElementById("buttonDeletar").addEventListener("click", deleteRegist);