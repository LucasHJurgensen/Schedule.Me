<?php
//- Realiza a consulta dos dados de login inseridos pelo usuário;

//- Utilizado por: scriptLogin.JS

include 'connection.php';
header("Content-Type: application/json");

$infoLogin = file_get_contents("php://input");
$json = json_decode($infoLogin, true);

$usuario = $json['user'];
$password = $json['password'];

$stmt = $conn->prepare("SELECT usuario, senha , nivel FROM cadastro WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();
    
    if(password_verify($password,$user['senha'])){

        echo json_encode([
        "status" => "ok",
<<<<<<< HEAD
        "nivel" => $user['nivel']
=======
        "nivel" => $user['nivel'],
        "usuario" => $user['usuario']
>>>>>>> master

    ]);

    } else {

    echo json_encode ([

        "status" => "failed"

    ]);
    
    }
}
    
   
?>