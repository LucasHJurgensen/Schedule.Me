<?php
require_once 'connection.php';
header('Content-Type: application/json');

$update_info = file_get_contents("php://input");
$json = json_decode($update_info, true);

$senha_admin = $json['adminPassword'];
$senha_usuario = $json['newPassword'];
$usuario = $json['userName'];

checkAdminPassword($senha_admin, $senha_usuario, $usuario, $conn);

function checkAdminPassword($senha_admin, $senha_usuario, $usuario, $conn){

    $stmt = $conn->prepare("SELECT senha FROM cadastro WHERE usuario = 'administrador' AND nivel = 'admin'");
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0){

        $data = $result->fetch_assoc();

        if(password_verify($senha_admin,$data['senha'])){

          updatePassword($senha_usuario, $usuario, $conn);

        } else {

            echo json_encode([
                "status" => "admin password missmatch"
            ]);

        }

    } else {

        echo json_encode([
            "status" => "failed"
        ]);

    }

}

function updatePassword($senha_usuario, $usuario, $conn){

    $crypt = password_hash($senha_usuario, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("UPDATE cadastro SET senha = ? WHERE usuario = ?");
    $stmt->bind_param("ss", $crypt, $usuario);
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