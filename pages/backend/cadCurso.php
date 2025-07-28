<?php

include 'connection.php';
header("Content-Type: application/json");

$curso_info = file_get_contents("php://input");
$json = json_decode($curso_info, true);

$nomeCurso = $json['nomeCurso'];
$coordNome = $json['coordNome'];

checkCurso($nomeCurso, $coordNome, $conn);

function checkCurso($nomeCurso, $coordNome, $conn){
    $stmt = $conn->prepare("SELECT * FROM curso WHERE nome_curso = ?");
    $stmt->bind_param("s", $nomeCurso);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0){
        echo json_encode([
            "status" => "already exists"
        ]);
    } else if($result->num_rows == 0){

        insertCurso($nomeCurso, $coordNome, $conn);
    }
}


function insertCurso($nomeCurso, $coordNome, $conn){
    $stmt = $conn->prepare("INSERT INTO curso (nome_curso, coordenador_usuario) VALUES (? , ?)");
    $stmt->bind_param("ss", $nomeCurso, $coordNome);
    $check = $stmt->execute();

    if($check){

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