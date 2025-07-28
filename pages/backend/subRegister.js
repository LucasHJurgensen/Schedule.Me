export function subRegister(subject, course, teacher, dayWeek, hourClass){
    fetch("./backend/cadSubject.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({disciplina: subject, curso: course, professor: teacher, diaSemana: dayWeek, horario: hourClass})
    })
<<<<<<< HEAD
  
=======

>>>>>>> master
    .then(response => response.json())

    .then(data => {

        if(data.status === 'ok'){
            
            alert("Disciplina cadastrada com sucesso!");
            console.log(data);

        } else if(data.status === "already exists"){

            alert("Disciplina ja cadastrada para esse curso! Altere o curso e tente novamente!");

<<<<<<< HEAD
        } else {

            alert("Falha no cadastro! Por favor, revise os dados!");

=======
        } else if(data.status === "date unavailable") {

            alert("Horário e Data indisponiveis para esse professor, altere os dados e tente novamente!");

        } else{
            
            alert("Falha ao cadastrar a disciplina! Revise os dados e tente novamente.");
>>>>>>> master
        }
    })

    .catch(error => console.error("Erro:", error));

}