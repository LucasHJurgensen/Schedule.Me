<?php

//Realiza a consulta no banco de dados de todos os Professores cadastrados no sistema.
//Utilizado por: showProf.js

include 'connection.php';
header("Content-Type: application/json");

$request = "SELECT * FROM professor";
$result = $conn->query($request);

$professores = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $professores[] = $row;
    }
}

$conn->close();

echo json_encode($professores);    
?>