<?php
include 'connection.php';
header('Content-Type: application/json');

$disc_info = file_get_contents("php://input");
$json = json_decode($disc_info, true);

$nomeDisciplinaAnt = $json['nomeDiscOld'];
$nomeDisciplina = $json['newNomeDisc'];
$curso = $json['newCurso'];
$professor = $json['newProf'];
$diaSemana = $json['newData'];
$horario = $json['newHorario'];

checkSubRegister($nomeDisciplinaAnt, $nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn);

function checkSubRegister($nomeDisciplinaAnt, $nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn){

       //verifica se o nome da Disciplina ja existe para o mesmo curso cadastrado no banco de dados

       $stmt = $conn->prepare("SELECT * FROM disciplina WHERE nome_disciplina = ? AND curso_nome = ? AND nome_disciplina != ?");

       if ($stmt === false){

           echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
           exit;

       }
   
   $stmt->bind_param("sss",$nomeDisciplina, $curso, $nomeDisciplinaAnt);
   $stmt->execute();
   $result = $stmt->get_result();

   if ($result->num_rows > 0) {

      echo json_encode([
       "status" => "already exists",
       "mensagem" => "Disciplina ja cadastrada para esse curso"
      ]);

   } else {
   
       checkHorarioProf($nomeDisciplinaAnt, $nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn);

   }

}

function checkHorarioProf($nomeDisciplinaAnt, $nomeDisciplina, $curso, $professor, $diaSemana, $horarioNovo, $conn) {

    $stmt = $conn->prepare("SELECT nome_disciplina, hora_aula FROM disciplina WHERE nome_professor = ? AND data_aula = ?");
    $stmt->bind_param("ss", $professor, $diaSemana);
    $stmt->execute();
    $result = $stmt->get_result();

    $horariosExistentes = [];
    $horarioAntigo = null;

    while ($row = $result->fetch_assoc()) {
        $horaFormatada = str_replace(" ", "", $row['hora_aula']);
        $nomeDisciplina = $row['nome_disciplina'];
        $horariosExistentes[$nomeDisciplina] = $horaFormatada;

        if ($nomeDisciplina === $nomeDisciplinaAnt) {
            $horarioAntigo = $horaFormatada;
        }
    }

    $horarioNovoFormatado = str_replace(" ", "", $horarioNovo);

    if ($horarioNovoFormatado === $horarioAntigo) {
        updateRegister($nomeDisciplinaAnt, $nomeDisciplina, $curso, $professor, $diaSemana, $horarioNovo, $conn);
        return;
    }


    unset($horariosExistentes[$nomeDisciplinaAnt]);


    if ($horarioNovoFormatado === "19h00-22h30" && count($horariosExistentes) > 0) {
        echo json_encode(["status" => "date unavailable"]);
        return;
    }

    if (in_array("19h00-22h30", $horariosExistentes)) {
        echo json_encode(["status" => "date unavailable"]);
        return;
    }

    if (in_array("19h00-20h50", $horariosExistentes) && in_array("20h50-22h30", $horariosExistentes)) {
        echo json_encode(["status" => "date unavailable"]);
        return;
    }


    updateRegister($nomeDisciplinaAnt, $nomeDisciplina, $curso, $professor, $diaSemana, $horarioNovo, $conn);
}


function updateRegister($nomeDisciplinaAnt, $nomeDisciplina, $curso, $professor, $diaSemana, $horario, $conn){
    //Realiza o “update” no banco dados, assim cadastrando a disciplina no sistema;

    $stmt = $conn->prepare("UPDATE disciplina SET nome_disciplina = ?, curso_nome = ? , data_aula = ?, hora_aula = ?, nome_professor = ? WHERE nome_disciplina =?");

        if ($stmt === false) {

            echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
            exit;
        }

    $stmt->bind_param("ssssss", $nomeDisciplina, $curso, $diaSemana, $horario, $professor, $nomeDisciplinaAnt);
    $check = $stmt->execute();

        if ($check){

            echo json_encode([
                "status" => "ok"
            ]);

        } else {

            echo json_encode([
                "status" => "failed"
            ]);

        }

    $stmt->close();
    $conn->close();
    }
?>