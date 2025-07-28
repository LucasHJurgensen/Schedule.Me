<?php
//Realiza o cadastro de Coordenadores no banco de dados

//Utilizado por: cordRegister.JS

include 'connection.php';
header("Content-Type: application/json");

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$nomeCoord = $json['coordName'];
$nomeUsuario = $json['userRelated'];

checkRegister($nomeCoord, $nomeUsuario, $conn);

function checkRegister($nomeCoord, $nomeUsuario, $conn){
    //verifica se o nome de coordenador ja existe no banco de dados

    $stmt = $conn->prepare("SELECT * FROM coordenador WHERE nome_coordenador = ?");

        if ($stmt === false){

            echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
            exit;

        }
    
    $stmt->bind_param("s",$nomeCoord);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

       echo json_encode([
        "status" => "already exists",
        "mensagem" => "coordenador ja cadastrado"
       ]);

    } else {
    
        coordRegister($nomeCoord, $nomeUsuario, $conn);

    }

}

function coordRegister($nomeCoord, $nomeUsuario, $conn){
    //Realiza o “INSERT” no banco dados, assim cadastrando o coordenador no sistema;


    $stmt = $conn->prepare("INSERT INTO coordenador (nome_coordenador, usuario) VALUES (? , ?)");

        if ($stmt === false) {

            echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
            exit;
        }

    $stmt->bind_param("ss", $nomeCoord, $nomeUsuario);
    $check = $stmt->execute();

        if ($check){

            echo json_encode([
                "status" => "ok"
            ]);

        } else {

            echo json_encode([
                "status" => "failed"
            ]);

        }

    $stmt->close();
    $conn->close();
}
?>