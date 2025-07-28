function deleteRegist(){
    const params = new URLSearchParams(window.location.search);
    
    let coordAnt = params.get("coord");
    let user = document.getElementById("usuarioSelect").value;

    fetch('backend/deleteCoord.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user : user, coordAnt : coordAnt})
        })

        .then(res=>res.json())

        .then(data => {

            if(data.status === "ok"){

                alert('Cadastro de Coordenador deletado com sucesso!');
                
                window.location.href = 'cordSelection.html';

            } else if (data.status === "failed"){

                alert("A exclusão do cooordenador falhou! Tente novamente ou revise os dados!");

            }

        })

        .catch(err => {
            console.error('Erro ao carregar dados do coordenador:', err);
        });
    
}

document.getElementById("buttonDeletar").addEventListener("click", deleteRegist);