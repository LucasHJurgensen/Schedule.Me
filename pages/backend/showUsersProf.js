//- Faz a requisição de consulta de todos os usuários cadastrador para o PHP;

//- Cria a visualização de cada um deles em um elemento select em html;

//- Utiliza : getUsers.php;

//- Utilizado por : userSelection.html.


fetch('backend/getUserProf.php')


.then(response => response.json())

.then(data => {
  
    const select = document.getElementById('usuarioSelect');
  
  data.forEach(usuario => {
    const option = document.createElement('option');
   
    option.value = usuario.usuario;
    option.textContent = usuario.usuario;
    select.appendChild(option);

  });

  const evento = new CustomEvent('usuariosCarregados');
  window.dispatchEvent(evento);
  
})

.catch(error => {
  console.error('Erro ao carregar usuários:', error);
});

function redirect(){

    const user = document.getElementById("usuarioSelect").value;

    if (user === "" || user === null){

        alert("Selecione um usuário!");

    } else {
      window.location.href = `alterRegist.html?user=${user}`;
    } 

}