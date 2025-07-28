document.getElementById('cadDisc-button').addEventListener('click', () =>{
    const params = new URLSearchParams(window.location.search);
    let nomeDiscOld = params.get('disciplina');

    let newNomeDisc =  document.getElementById('nDisciplina').value;
    let newCurso = document.getElementById('cursoSelect').value;
    let newProf = document.getElementById('profSelect').value;
    let newData = document.getElementById('diaSelect').value;
    let newHorario = document.getElementById('horaSelect').value;

    if(nomeDiscOld === "" || newNomeDisc === "" || newCurso === "" || newProf === "" || newData === "" || newHorario === ""){

        alert('Dados invalidos ou campos mal preenchidos! Revise os dados do cadastro!');

    } else {

        fetch('backend/alterDisc.php',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ nomeDiscOld : nomeDiscOld, newNomeDisc : newNomeDisc, newCurso : newCurso, newProf : newProf, newData : newData, newHorario : newHorario})
        })

        .then(response => response.json())

        .then(data => {
            if(data.status === "ok"){

                alert('Cadastro de disciplina alterado com sucesso!');

                window.location.href = 'menuDisciplinas.html';

            } else if(data.status === "failed"){

                alert('Falha ao realizar atualização dos dados do cadastro! Tente novamente mais tarde...');

            } else if(data.status === "date unavailable"){

                alert("Data e horário indisponíveis para esse professor! Revise os dados e tente novamente...");
            } else if (data.status === "already exists") {

                alert('Já existe uma disciplina com esse nome para o curso informado!');

            }
        })

        .catch(err => {
            console.error('Erro ao carregar dados da disciplina:', err);
        });
    }
});

document.getElementById('delDisc-button').addEventListener('click', () =>{

    const params = new URLSearchParams(window.location.search);
    let nomeDiscOld = params.get('disciplina');

    fetch('backend/deleteDisc.php',{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({nomeDiscOld:nomeDiscOld})
    })

    .then(response => response.json())

    .then(data => {
        if(data.status === 'ok'){
            alert('Disciplina excluida com sucesso!');

            window.location.href = 'menuDisciplinas.html';
        
        } else if(data.status === 'failed'){
            alert('Falha ao excluir disciplina, tente novamente mais tarde!');

            window.location.href = 'menuDisciplinas.html';
        }
    })

    .catch(err => {
            console.error('Erro ao carregar dados da disciplina:', err);
    });
    
});