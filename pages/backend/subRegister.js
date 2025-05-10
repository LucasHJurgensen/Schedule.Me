export function subRegister(subject, course, teacher, dayWeek, hourClass){
    fetch("./backend/cadSubject.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({disciplina: subject, curso: course, professor: teacher, diaSemana: dayWeek, horario: hourClass})
    })
    .then(response => {
        return response.text(); // Use .text() para capturar o conteúdo bruto
    })
    .then(data => {
        console.log(data); // Verifique o que está sendo retornado do servidor
        try {
            const jsonData = JSON.parse(data); // Tente converter para JSON
            // Processa o jsonData se for válido
            if (jsonData.status === 'ok') {
                alert("Disciplina cadastrada com sucesso!");
                console.log(jsonData);
            } else if (jsonData.status === "already exists") {
                alert("Disciplina ja cadastrada para esse curso! Altere o curso e tente novamente!");
            } else {
                alert("Falha no cadastro! Por favor, revise os dados!");
            }
        } catch (error) {
            console.error("Erro ao analisar JSON:", error);
        }
    })
    .catch(error => console.error("Erro:", error));
   /* .then(response => response.json())

    .then(data => {

        if(data.status === 'ok'){
            
            alert("Disciplina cadastrada com sucesso!");
            console.log(data);

        } else if(data.status === "already exists"){

            alert("Disciplina ja cadastrada para esse curso! Altere o curso e tente novamente!");

        } else {

            alert("Falha no cadastro! Por favor, revise os dados!");

        }
    })

    .catch(error => console.error("Erro:", error));*/

}