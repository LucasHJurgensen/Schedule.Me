<?php
include 'connection.php';
header("Content-Type: application/json");

$request = "SELECT * FROM disciplina";
$result = $conn->query($request);

$disciplina = [];

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $disciplina [] = $row;
    }
}

$conn->close();

echo json_encode($disciplina);

?>