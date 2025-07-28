<?php
include 'connection.php';
header('Content-Type: application/json');

<<<<<<< HEAD

=======
>>>>>>> master
$info_sub = file_get_contents("php://input");
$json = json_decode($info_sub, true);

$nomeDisciplina = $json['disciplina'];
$curso = $json['curso'];
$professor = $json['professor'];
$diaSemana = $json['diaSemana'];
$horario = $json['horario'];

checkSubRegister($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn);

function checkSubRegister($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn){

       //verifica se o nome da Disciplina ja existe para o mesmo curso cadastrado no banco de dados

       $stmt = $conn->prepare("SELECT * FROM disciplina WHERE nome_disciplina = ? AND curso_nome = ?");

       if ($stmt === false){

           echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
           exit;

       }
   
   $stmt->bind_param("ss",$nomeDisciplina, $curso);
   $stmt->execute();
   $result = $stmt->get_result();

   if ($result->num_rows > 0) {

      echo json_encode([
       "status" => "already exists",
       "mensagem" => "Disciplina ja cadastrada para esse curso"
      ]);

   } else {
   
<<<<<<< HEAD
       subRegister($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn);
=======
       checkHorarioProf($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn);
>>>>>>> master

   }

}

<<<<<<< HEAD
=======
function checkHorarioProf($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn){
    
    //verifica se o professor ja possui alguma disciplina no mesmo horário e no mesmo dia 

    $stmt = $conn->prepare("SELECT hora_aula FROM disciplina WHERE nome_professor = ? AND data_aula = ?");
    $stmt->bind_param("ss", $professor, $diaSemana);
    $stmt->execute();
    $result = $stmt->get_result();

    $horariosExistentes = [];

    while ($row = $result->fetch_assoc()) {
        $horariosExistentes[] = str_replace(" ", "", $row['hora_aula']);
    }

    $horarioAtual = str_replace(" ", "", $horario);

   
    if ($horarioAtual === "19h00-22h30" && !empty($horariosExistentes)) {

        echo json_encode(["status" => "date unavailable"]);
        return;

    } else if (in_array("19h00-22h30", $horariosExistentes)) {

        echo json_encode(["status" => "date unavailable"]);
        return;

    } else if (in_array("19h00-20h50", $horariosExistentes) && in_array("20h50-22h30", $horariosExistentes)) {

        echo json_encode(["status" => "date unavailable"]);
        return;

    }


    subRegister($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn);

}

>>>>>>> master
function subRegister($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn){
    //Realiza o “INSERT” no banco dados, assim cadastrando a disciplina no sistema;

    $stmt = $conn->prepare("INSERT INTO disciplina (nome_disciplina, curso_nome , data_aula, hora_aula, nome_professor) VALUES (? , ? , ? , ? , ?)");

        if ($stmt === false) {

            echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
            exit;
        }

    $stmt->bind_param("sssss", $nomeDisciplina, $curso, $diaSemana, $horario, $professor);
    $check = $stmt->execute();

        if ($check){

            echo json_encode([
                "status" => "ok"
            ]);

        } else {

            echo json_encode([
<<<<<<< HEAD
                "status" => "failed",
                "mensagem" => $stmt->error
=======
                "status" => "failed"
>>>>>>> master
            ]);

        }

    $stmt->close();
    $conn->close();
}
<<<<<<< HEAD
?>
=======
?>
>>>>>>> master
