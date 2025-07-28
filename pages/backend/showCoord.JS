fetch('backend/getCoord.php')


.then(response => response.json())

.then(data => {
  
    const select = document.getElementById('coordenadorSelect');
  
  data.forEach(coordenadores => {
    const option = document.createElement('option');
   
    option.value = coordenadores.nome_coordenador;
    option.textContent = coordenadores.nome_coordenador;
    select.appendChild(option);

  });

})

.catch(error => {
  console.error('Erro ao carregar usuários:', error);
});

function redirect(){

    const coord = document.getElementById("coordenadorSelect").value;

    if (coord === "" || coord === null){

        alert("Selecione um coordenador!");

    } else {
      window.location.href = `alterCoord.html?coord=${coord}`;
    } 

}