<?php
//- Realiza a consulta de todos os dados do cadastro do coordenador selecionado pelo usuário;

//- Utilizado por: bringRegistCoord.JS.

include 'connection.php';
header("Content-Type: application/json");

$profSelected = file_get_contents("php://input");
$json = json_decode($profSelected, true);

$prof = $json['professor'];

$stmt = $conn->prepare("SELECT nome_professor, curso_nome, usuario FROM professor WHERE nome_professor = ?");
$stmt->bind_param("s",$prof);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
   $dados = $result->fetch_assoc();

    $nomeprofessor = $dados['nome_professor'];
    $cursoProfessor = $dados['curso_nome'];
    $user = $dados['usuario'];

    echo json_encode([
        "status" => "ok",
        "usuario" => $user,
        "nomeProfessor" => $nomeprofessor,
        "cursoProfessor" => $cursoProfessor
    ]);

} else {

    echo json_encode([
        "status" => "failed"
    ]);

}

$stmt->close();
$conn->close();
    
?>