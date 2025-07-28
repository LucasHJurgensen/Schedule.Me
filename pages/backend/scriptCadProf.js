document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadCord');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // evita o recarregamento da página

        const profName = document.getElementById('profNome').value.trim();
        const userRelated = document.getElementById('usuarioSelect').value;
        const cursoRelated = document.getElementById('cursoSelect').value;

        if (!profName || !userRelated || !cursoRelated) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            profName: profName,
            userRelated: userRelated,
            cursoRelated: cursoRelated
        };

        fetch('backend/cadProf.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 'ok') {
                alert('Professor cadastrado com sucesso!');
                  
                form.reset();

                window.location.href = 'menuprof.html';
                
            } else if (response.status === 'already exists') {

                alert('Professor já está cadastrado.');

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
