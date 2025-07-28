<?php
include 'connection.php';
header('Content-Type: application/json');

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$professor = $json['profAnt'];

$stmt = $conn->prepare("DELETE FROM professor WHERE nome_professor = ?");
$stmt->bind_param("s",$professor);
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