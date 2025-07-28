document.getElementById('buttonAlterar').addEventListener('click', () =>{
    
    let params = new URLSearchParams(window.location.search);
    let cursoAnt = params.get('curso');

    let cursoNome = document.getElementById('cursoNome').value;
    let userCoord = document.getElementById('usuarioSelect').value;
    
    if(cursoAnt === "" || cursoNome === "" || userCoord === ""){
        
        alert('Campos mal preenchidos! Revise os dados e tente novamente.');

    } else {

        fetch('backend/alterCurso.php',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({cursoAnt:cursoAnt, cursoNome:cursoNome, userCoord:userCoord})
        })

        .then(response => response.json())

        .then(data => {
            if(data.status === "ok"){

                alert('Cadastro de curso alterado com sucesso!');
                
                window.location.href = 'menuCursos.html';

            } else if(data.status === "failed"){

                alert('Falha na alteração do cadastro de curso! Tente novamente mais tarde.');

                window.location.href = 'menuCursos.html';

            } else if(data.status === "already exists"){

                alert('Curso ja cadastrado anteriormente! Por favor, revise os dados e tente novamente.');

            }
        })

        .catch(err => {
            console.error('Erro ao carregar dados do curso:', err);
        });
    }
    
});

document.getElementById('buttonDeletar').addEventListener('click', () =>{

    let params = new URLSearchParams(window.location.search);
    let cursoAnt = params.get('curso');
    
    fetch('backend/deleteCurso.php',{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({cursoAnt:cursoAnt})
    })

    .then(response => response.json())

    .then(data => {
        if(data.status === "ok"){

            alert('Curso excluido com sucesso!');

            window.location.href = 'menuCursos.html';
        } else if (data.status === "failed"){
            
            alert('Falha na exclusão do curso, tente novamente mais tarde!');

        }
    })

    .catch(err => {
        console.error('Erro ao carregar dados do curso:', err);
    });
});