document.addEventListener('DOMContentLoaded', function() {
   

    document.getElementById('buttonAlterar').addEventListener('click', function(event) {
        event.preventDefault(); // evita o recarregamento da página

        const params = new URLSearchParams(window.location.search);
        const profAnt = params.get('prof');

        const profName = document.getElementById('profNome').value;
        const userRelated = document.getElementById('usuarioSelect').value;
        const cursoRelated = document.getElementById('cursoSelect').value;

        if (!profName || !userRelated || !cursoRelated) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        fetch('backend/alterProf.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({profName: profName, userRelated: userRelated, cursoRelated: cursoRelated, profAnt: profAnt})
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 'ok') {

                alert('Cadastro alterado com sucesso!');

                window.location.href = 'menuprof.html';

            } else {

                alert('Erro ao cadastrar: ' + response.mensagem);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro na comunicação com o servidor.');
        });
    });
});
