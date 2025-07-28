<?php
//Faz a conexão com o banco de dados

$servidor = "localhost";
$usuario = "root";
<<<<<<< HEAD
$senha = "1930";
=======
$senha = "";
>>>>>>> master
$banco = "schedule_me";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

?>