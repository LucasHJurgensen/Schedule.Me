<?php
include 'connection.php';
header('Content-Type: application/json');

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$usuario = $json['user'];
$senha = $json['password'];
$nivel = $json['level'];

$stmt = $conn->prepare("DELETE FROM cadastro WHERE usuario = ? AND nivel = ?");
$stmt->bind_param("ss",$usuario,$nivel);
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

?>