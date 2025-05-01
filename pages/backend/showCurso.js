//- Faz a requisição de consulta de todos os usuários cadastrador para o PHP;

//- Cria a visualização de cada um deles em um elemento select em html;

//- Utiliza : getUsers.php;

//- Utilizado por : userSelection.html.


fetch('backend/getCurso.php')


.then(response => response.json())

.then(data => {
  
    const select = document.getElementById('cursoSelect');
  
  data.forEach(curso => {
    const option = document.createElement('option');
   
    option.value = curso.nome_curso;
    option.textContent = curso.nome_curso;
    select.appendChild(option);

  });

})

.catch(error => {
  console.error('Erro ao carregar cursos:', error);
});
