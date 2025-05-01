fetch('backend/getProf.php')


.then(response => response.json())

.then(data => {
  
    const select = document.getElementById('profSelect');
  
  data.forEach(professor => {
    const option = document.createElement('option');
   
    option.value = professor.nome_professor;
    option.textContent = professor.nome_professor;
    select.appendChild(option);

  });

})

.catch(error => {
  console.error('Erro ao carregar os professores:', error);
});