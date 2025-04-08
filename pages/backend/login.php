<?php
include 'connection.php';

$usuario = $_POST['user'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT usuario, senha , nivel from cadastro where usuario = ?AND senha = ?");
$stmt->bind_param("ss", $usuario, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();

    echo "Usuário encontrado: " . $user['usuario'] . "<br>";

    echo "Nível: " . $user['nivel'];

} else {

    echo "Usuário não encontrado.";
}
?>