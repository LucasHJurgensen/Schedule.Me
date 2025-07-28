<?php
include 'connection.php';
header('Content-Type: application/json');

$disc_info = file_get_contents("php://input");
$json = json_decode($disc_info, true);

$disciplina = $json['nomeDiscOld'];

$stmt = $conn->prepare('DELETE FROM disciplina WHERE nome_disciplina = ?');
$stmt->bind_param('s',$disciplina);
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