
const params = new URLSearchParams(window.location.search);
const professor = params.get("prof");

if (professor){

    window.addEventListener('usuariosCarregados', () => {
        
        fetch('backend/selectProf.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({professor})
        })

        .then(res=>res.json())
        
        .then(data => {

            if(data.status === "ok"){

            document.getElementById('profNome').value = data.nomeProfessor;
            document.getElementById('usuarioSelect').value = data.usuario;
            document.getElementById('cursoSelect').value = data.cursoProfessor;

            } else if(data.status === "failed"){
                
                alert('Falha na requisição dos dados do usuário! Tente novamente...');
                window.location.href = 'profSelection.html';

            }
        })

        .catch(err => {
            console.error('Erro ao carregar dados do usuário:', err);
        });

    });
}