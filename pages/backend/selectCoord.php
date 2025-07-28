<?php
//- Realiza a consulta de todos os dados do cadastro do coordenador selecionado pelo usuário;

//- Utilizado por: bringRegistCoord.JS.

include 'connection.php';
header("Content-Type: application/json");

$coordSelected = file_get_contents("php://input");
$json = json_decode($coordSelected, true);

$coord = $json['coordenador'];

$stmt = $conn->prepare("SELECT nome_coordenador, usuario FROM coordenador WHERE nome_coordenador = ?");
$stmt->bind_param("s",$coord);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
   $dados = $result->fetch_assoc();

   $nomeCoordenador = $dados['nome_coordenador'];
   $user = $dados['usuario'];

    echo json_encode([
        "status" => "ok",
        "usuario" => $user,
        "nomeCoordenador" => $nomeCoordenador
    ]);

} else {

    echo json_encode([
        "status" => "failed"
    ]);

}

$stmt->close();
$conn->close();
    
?>