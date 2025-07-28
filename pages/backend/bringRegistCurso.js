const params = new URLSearchParams(window.location.search);
const curso = params.get("curso");

if (curso){

    window.addEventListener('usuariosCarregados', () => {
        
        fetch('backend/selectCurso.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({curso})
        })

        .then(res=>res.json())
        
        .then(data => {

            if(data.status === "ok"){

            document.getElementById('cursoNome').value = curso;
            document.getElementById('usuarioSelect').value = data.coordUsuario;

            } else if(data.status === "failed"){
                
                alert('Falha na requisição dos dados do usuário! Tente novamente...');
                window.location.href = 'cursoSelection.html';

            }
        })

        .catch(err => {
            console.error('Erro ao carregar dados do usuário:', err);
        });

    });
}