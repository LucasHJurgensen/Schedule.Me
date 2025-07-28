<?php
include 'connection.php';
header('Content-Type: application/json');

$curso_info = file_get_contents("php://input");
$json = json_decode($curso_info, true);

$cursoAnt = $json['cursoAnt'];
$nomeCurso = $json['cursoNome'];
$userCoord = $json['userCoord'];

checkCurso($cursoAnt, $nomeCurso, $userCoord, $conn);

function checkCurso($cursoAnt, $nomeCurso, $userCoord, $conn){

    $stmt = $conn->prepare("SELECT * FROM curso WHERE nome_curso = ?");
    $stmt->bind_param("s", $nomeCurso);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0){
        echo json_encode([
            "status" => "already exists"
        ]);

        $stmt->close();
        $conn->close();
    } else if($result->num_rows == 0){
        
        updateCurso($cursoAnt, $nomeCurso, $userCoord, $conn);
    }
}

function updateCurso($cursoAnt, $nomeCurso, $userCoord, $conn){

    $stmt = $conn->prepare("UPDATE curso SET nome_curso = ?, coordenador_usuario = ? WHERE nome_curso = ?");
    $stmt->bind_param("sss", $nomeCurso, $userCoord, $cursoAnt);
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
}
?>