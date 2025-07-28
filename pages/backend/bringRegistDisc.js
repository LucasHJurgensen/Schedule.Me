const params = new URLSearchParams(window.location.search);
let disc = params.get('disciplina');

if(disc){

    window.addEventListener('DOMContentLoaded', () => {

        fetch('backend/selectDisciplina.php', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({disc})
        })

        .then(response => response.json())

        .then(data => {

            if(data.status === "ok"){

                document.getElementById('nDisciplina').value = disc;
                document.getElementById('cursoSelect').value = data.data.curso_nome;
                document.getElementById('profSelect').value = data.data.nome_professor;
                document.getElementById('diaSelect').value = data.data.data_aula;
                document.getElementById('horaSelect').value = data.data.hora_aula;

            } else if (data.status === "failed"){

                alert('Falha na requisição dos dados da disciplina! Tente novamente mais tarde...');
                window.location.href = 'discSelection.html';
            }
        })

        .catch(err => {
            console.error('Erro ao carregar dados da disciplina:', err);
        });

    })
}