<?php
include 'connection.php';
header('Content-Type: application/json');

$disc_info = file_get_contents("php://input");
$json = json_decode($disc_info, true);

$disciplina = $json['disc'];

$stmt = $conn->prepare("SELECT * FROM disciplina WHERE nome_disciplina = ?");
$stmt->bind_param("s", $disciplina);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0){
    $dados = $result->fetch_assoc();

    echo json_encode([
        "status" => "ok",
        "data" => $dados
    ]);
} else {
    
    echo json_encode([
        "status" => "failed"
    ]);

}

$stmt->close();
$conn->close();
    
?>