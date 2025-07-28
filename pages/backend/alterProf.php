<?php

include 'connection.php';
header("Content-Type: application/json");

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$usuario = $json['userRelated'];
$professor = $json['profName'];
$curso = $json['cursoRelated'];
$professorAnt = $json['profAnt'];

updateRegister($professor, $usuario, $curso, $professorAnt, $conn);


function updateRegister($professor,$usuario, $curso, $professorAnt, $conn){
    $stmt = $conn->prepare("UPDATE professor SET nome_professor = ?, curso_nome = ?, usuario = ? WHERE nome_professor = ?");

    if ($stmt === false) {

        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
        exit;
    }

$stmt->bind_param("ssss", $professor, $curso, $usuario, $professorAnt);
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