<?php
include 'connection.php';
header("Content-Type: application/json");

$prof_info = file_get_contents("php://input");
$json = json_decode($prof_info, true);

$usuario = $json['user'];

$stmt = $conn->prepare("SELECT nome_disciplina, curso_nome, data_aula, hora_aula FROM disciplina WHERE nome_professor = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0){
    $disciplinas = [];

    while($row = $result->fetch_assoc()){
        $disciplinas[] = $row;
    }

    echo json_encode([
        "status" => "ok",
        "data" => $disciplinas
    ]);

} else if($result->num_rows == 0){

    echo json_encode([
        "status" => "empty"
    ]);

}

$stmt->close();
$conn->close();
?>