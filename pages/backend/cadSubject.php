<?php
include 'connection.php';
header('Content-Type: application/json');


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
   
       subRegister($nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn);

   }

}

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
                "status" => "failed",
                "mensagem" => $stmt->error
            ]);

        }

    $stmt->close();
    $conn->close();
}
?>