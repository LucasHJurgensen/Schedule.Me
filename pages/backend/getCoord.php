<?php

//Realiza a consulta no banco de dados de todos os usuários cadastrados com o nivel de coordenador.

//Utilizado por: showCoord.JS.

include 'connection.php';
header("Content-Type: application/json");

$request = "SELECT nome_coordenador FROM coordenador";
$result = $conn->query($request);

$coordenadores = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $coordenadores[] = $row;
    }
}

$conn->close();

echo json_encode($coordenadores);    
?>