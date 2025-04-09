<?php
$servidor = "localhost";
$usuario = "root";
$senha = "1930";
$banco = "schedule_me";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

?>