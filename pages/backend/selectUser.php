<?php
//- Realiza a consulta de todos os dados do cadastro usuário selecionado pelo usuário;

//- Utilizado por: bringRegist.JS.

include 'connection.php';
header("Content-Type: application/json");

$userSelected = file_get_contents("php://input");
$json = json_decode($userSelected, true);

$usuario = $json['usuario'];

$stmt = $conn->prepare("SELECT usuario, senha, nivel FROM cadastro WHERE usuario = ?");
$stmt->bind_param("s",$usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
   $dados = $result->fetch_assoc();

   $senha = $dados['senha'];
   $nivel = $dados['nivel'];

    echo json_encode([
        "status" => "ok",
        "usuario" => $usuario,
        "password" => $senha,   
        "level" => $nivel
    ]);

} else {

    echo json_encode([
        "status" => "failed"
    ]);

}

$stmt->close();
$conn->close();
    
?>