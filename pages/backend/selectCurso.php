<?php
include 'connection.php';
header("Content-Type: application/json");

$cursoSelected = file_get_contents("php://input");
$json = json_decode($cursoSelected, true);

$curso = $json['curso'];

$stmt = $conn->prepare("SELECT nome_curso, coordenador_usuario FROM curso WHERE nome_curso = ?");
$stmt->bind_param('s', $curso);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0){
    $dados = $result->fetch_assoc();

    $nomeCurso = $dados['nome_curso'];
    $user = $dados['coordenador_usuario'];

    echo json_encode([
        "status" => "ok",
        "nomeCurso" => $nomeCurso,
        "coordUsuario" => $user
    ]);
} else {
    
    echo json_encode([
        "status" => "failed"
    ]);

}

$stmt->close();
$conn->close();
?>