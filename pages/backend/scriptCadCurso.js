document.getElementById('cadCurso-button').addEventListener('click', () =>{

    let nomeCurso = document.getElementById('cursoNome').value;

    let coordNome = document.getElementById('usuarioSelect').value;
    
    console.log(nomeCurso, coordNome);

    fetch('backend/cadCurso.php',{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({nomeCurso:nomeCurso, coordNome:coordNome})
    })

    .then(response => response.json())

    .then(data =>{
        if(data.status === "ok"){
            alert('Curso cadastrado com sucesso!');

            window.location.href = 'menuCursos.html';
        } else if(data.status === "failed"){
            
            alert('Cadastro de curso falhou, tente novamente mais tarde!');

        } else if(data.status === "already exists"){
            
            alert('Curso ja cadastrado no sistema, revise as informações!');
        }
    })

    .catch(error => console.error("Erro:", error));
});