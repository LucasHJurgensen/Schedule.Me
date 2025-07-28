<?php
// Realiza o cadastro de professor no banco de dados

include 'connection.php';
header("Content-Type: application/json");

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$profCoord = $json['profName'];
$nomeUsuario = $json['userRelated'];
$cursoNome = $json['cursoRelated'];  

checkRegister($profCoord, $nomeUsuario, $cursoNome, $conn);

function checkRegister($profCoord, $nomeUsuario, $cursoNome, $conn) {
    // Verifica se o nome de professor já existe no banco de dados
    $stmt = $conn->prepare("SELECT * FROM professor WHERE nome_professor = ?");

    if ($stmt === false) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
        exit;
    }

    $stmt->bind_param("s", $profCoord);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "status" => "already exists",
            "mensagem" => "Professor já cadastrado"
        ]);
    } else {
        profRegister($profCoord, $nomeUsuario, $cursoNome, $conn);
    }

    $stmt->close();
}

function profRegister($profCoord, $nomeUsuario, $cursoNome, $conn) {
    // Realiza o INSERT no banco de dados, cadastrando o professor
    $stmt = $conn->prepare("INSERT INTO professor (nome_professor, curso_nome, usuario) VALUES (?, ?, ?)");

    if ($stmt === false) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
        exit;
    }

    $stmt->bind_param("sss", $profCoord, $cursoNome, $nomeUsuario);
    $check = $stmt->execute();

    if ($check) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode(["status" => "failed"]);
    }

    $stmt->close();
    $conn->close();
}
?>
