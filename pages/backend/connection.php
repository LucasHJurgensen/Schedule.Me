<?php
$servidor = "localhost";
$usuario = "root";
$senha = "1930";
$banco = "schedule_me";

// Criando a conexão
$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Verificando se houve erro
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

echo "Conexão realizada com sucesso!";

?>