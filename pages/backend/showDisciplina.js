fetch('backend/getDisciplina.php')

.then(response => response.json())

.then(data => {
    const select = document.getElementById('discSelect');

    data.forEach(disciplina => {
        const option = document.createElement('option');

        option.value = disciplina.nome_disciplina;
        option.textContent = disciplina.nome_disciplina;
        select.appendChild(option)
    });
})

.catch(error => {
  console.error('Erro ao carregar disciplinas:', error);
});

function redirect(){

    const disciplina = document.getElementById("discSelect").value;

    if (disciplina === "" || disciplina === null){

        alert("Selecione uma disciplina!");

    } else {
      window.location.href = `alterDisciplina.html?disciplina=${disciplina}`;
    } 

}