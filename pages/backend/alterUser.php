<?php
// Realiza o “UPDATE” dos dados de cadastro do usuário;

// Utilizado por: alterRegist.JS.

include 'connection.php';
header("Content-Type: application/json");

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

<<<<<<< HEAD
$usuario = $json['user'];
$senha = $json['password'];
$nivel = $json['level'];

updateRegister($usuario,$senha,$nivel,$conn);


function updateRegister($usuario,$senha,$nivel,$conn){
    $stmt = $conn->prepare("UPDATE cadastro SET usuario = ?, senha = ?, nivel = ? WHERE usuario = ?");
=======
$usuarioAntigo = $json['userAnt'];
$usuario = $json['user'];
$nivel = $json['level'];

updateRegister($usuario,$usuarioAntigo,$nivel,$conn);


function updateRegister($userAntigo,$usuario,$nivel,$conn){
    $stmt = $conn->prepare("UPDATE cadastro SET usuario = ?, nivel = ? WHERE usuario = ?");
>>>>>>> master

    if ($stmt === false) {

        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
        exit;
    }

<<<<<<< HEAD
$stmt->bind_param("ssss", $usuario, $senha, $nivel,$usuario);
=======
$stmt->bind_param("sss", $usuario, $nivel, $usuarioAntigo);
>>>>>>> master
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