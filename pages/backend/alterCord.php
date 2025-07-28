<?php

include 'connection.php';
header("Content-Type: application/json");

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$usuario = $json['user'];
$coordenador = $json['coord'];
$coordenadorAnt = $json['coordAnt'];

updateRegister($coordenador, $usuario, $coordenadorAnt, $conn);


function updateRegister($coordenador,$usuario,$coordenadorAnt,$conn){
    $stmt = $conn->prepare("UPDATE coordenador SET nome_coordenador = ?, usuario = ? WHERE nome_coordenador = ?");

    if ($stmt === false) {

        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
        exit;
    }

$stmt->bind_param("sss", $coordenador, $usuario,$coordenadorAnt);
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