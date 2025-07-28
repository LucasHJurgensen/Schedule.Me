<?php
include 'connection.php';
header("Content-Type: application/json");

$curso_info = file_get_contents("php://input");
$json = json_decode($curso_info, true);

$curso = $json['cursoAnt'];

$stmt = $conn->prepare("DELETE FROM curso WHERE nome_curso = ?");
$stmt->bind_param("s", $curso);
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
?>