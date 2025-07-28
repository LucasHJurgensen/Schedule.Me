<?php
include 'connection.php';
header('Content-Type: application/json');

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$usuario = $json['user'];
$coordenador = $json['coordAnt'];

$stmt = $conn->prepare("DELETE FROM coordenador WHERE nome_coordenador = ? AND usuario = ?");
$stmt->bind_param("ss",$coordenador,$usuario);
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