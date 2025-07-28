
const params = new URLSearchParams(window.location.search);
const coordenador = params.get("coord");

if (coordenador){

    window.addEventListener('usuariosCarregados', () => {
        
        fetch('backend/selectCoord.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({coordenador})
        })

        .then(res=>res.json())
        
        .then(data => {

            if(data.status === "ok"){

            document.getElementById('coordNome').value = data.nomeCoordenador;
            document.getElementById('usuarioSelect').value = data.usuario;

            } else if(data.status === "failed"){
                
                alert('Falha na requisição dos dados do usuário! Tente novamente...');
                window.location.href = 'cordSelection.html';

            }
        })

        .catch(err => {
            console.error('Erro ao carregar dados do usuário:', err);
        });

    });
}