<?php

//Realiza a consulta no banco de dados de todos os cursos cadastrados no sistema.
//Utilizado por: showCurso.js

include 'connection.php';
header("Content-Type: application/json");

$request = "SELECT * FROM curso";
$result = $conn->query($request);

$cursos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $cursos[] = $row;
    }
}

$conn->close();

echo json_encode($cursos);    
?>