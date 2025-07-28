window.addEventListener('DOMContentLoaded', ()=>{
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');

    fetch('backend/getHorarios.php',{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({user:user})
    })

    .then(response => response.json())

    .then(data => {
        if(data.status === "ok"){
            const container = document.querySelector('.grid-horarios');
            container.innerHTML = '';

            data.data.forEach(disciplinas => {
                const div = document.createElement('div');

                div.classList.add('box-horario');

                div.innerHTML = `
                <h3>${disciplinas.nome_disciplina}</h3>
                <p>Curso: ${disciplinas.curso_nome}</p>
                <p>Data: ${disciplinas.data_aula}   Horário: ${disciplinas.hora_aula}</p>
                `;

                container.appendChild(div);  
            });

        } else if (data.status === "empty"){

            const container = document.querySelector('.grid-horarios');
            container.innerHTML = `<h3>Nenhum horário atribuido ao professor!</h3>`;

        }
    })
})