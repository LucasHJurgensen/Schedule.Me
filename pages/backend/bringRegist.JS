//Traz os dados cadastrais ja cadastrados no banco para que o usuário possa altera-los

//Utilizado por : alterRegist.html

const params = new URLSearchParams(window.location.search);
const usuario = params.get("user");

if (usuario){
    fetch('backend/selectUser.php',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usuario})
    })

    .then(res=>res.json())
    
    .then(data => {

        if(data.status === "ok"){

        document.getElementById('usuario').value = data.usuario;
<<<<<<< HEAD
        document.getElementById('senha').value = data.password;
=======
>>>>>>> master
        document.getElementById('nivel').value = data.level;

        } else if(data.status === "failed"){
            
            alert('Falha na requisição dos dados do usuário! Tente novamente...');
            window.location.href = 'userSelection.html';

        }
    })

.catch(err => {
    console.error('Erro ao carregar dados do usuário:', err);
  });

}