    document.getElementById('buttonDeletar').addEventListener('click', function(event) {
        event.preventDefault(); // evita o recarregamento da página

        const params = new URLSearchParams(window.location.search);
        const profAnt = params.get('prof');

        fetch('backend/deleteProf.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({profAnt:profAnt})
        })

        .then(response => response.json())

        .then(data => {
            if (data.status === 'ok') {

                alert('Professor excluido com sucesso!');
                
                window.location.href = 'menuprof.html';
                
            } else {
                alert('Erro ao excluir: ' + data.mensagem);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro na comunicação com o servidor.');
        });
    });
