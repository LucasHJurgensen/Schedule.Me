document.getElementById('buttonRedefinirSenha').addEventListener('click',() =>{
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup').classList.add('show');
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('popup').classList.remove('show');
    document.getElementById('popup').classList.add('hidden');
});

document.getElementById('salvarSenha').addEventListener('click',(event) =>{
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    let newPassword = document.getElementById('novaSenha').value;
    let adminPassword = document.getElementById('adminSenha').value;
    let userName = urlParams.get('user');

    fetch('backend/passwordUpdate.php',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ newPassword : newPassword, adminPassword : adminPassword, userName : userName})
    })

    .then(response => response.json())

    .then(data =>{

        if(data.status === "ok"){
            alert('Senha alterada com sucesso!');

            document.getElementById('popup').classList.remove('show');
            document.getElementById('popup').classList.add('hidden');

        } else if(data.status === "admin password missmatch"){

            alert('Senha de administrador incorreta! Tente novamente.');

        } else {
            
            alert('Falha na redefinição de senha! Tente novamente mais tarde.');
        }
    })

    .catch(err => {
        console.error('Erro ao carregar dados do usuário:', err);
    });

});