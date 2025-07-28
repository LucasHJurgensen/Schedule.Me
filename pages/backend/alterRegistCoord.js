document.getElementById("buttonAlterar").addEventListener("click", alterRegistCord);

function alterRegistCord(){

    const params = new URLSearchParams(window.location.search);
    let coordAnt = params.get("coord");

    let coord = document.getElementById("coordNome").value;
    let user = document.getElementById("usuarioSelect").value;


    
        fetch('backend/alterCord.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({coord : coord, user : user, coordAnt : coordAnt})
        })

        .then(res=>res.json())

        .then(data => {

            if(data.status === "ok"){

                alert('Cadastro de coordenador atualizado com sucesso!');
                
                window.location.href = 'cordSelection.html';

            } else if(data.status === "already exists"){

                alert('coordenador ja cadastrado anteriormente! Revise os dados do cadastro...');

            } else if (data.status === "failed"){

                alert("Falha no cadastro! Por favor, revise os dados");

            }

        })

        .catch(err => {
            console.error('Erro ao carregar dados do coordenador:', err);
        });
    
}

