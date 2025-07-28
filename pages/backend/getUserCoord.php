<?php

//Realiza a consulta no banco de dados de todos os usuários cadastrados, menos o usuário Administrador

//Utilizado por: showUser.JS.

include 'connection.php';
header("Content-Type: application/json");

$request = "SELECT usuario, senha, nivel FROM cadastro WHERE nivel = 'coord' ";
$result = $conn->query($request);

$usuarios = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

$conn->close();

echo json_encode($usuarios);    
?>