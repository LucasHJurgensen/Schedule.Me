<?php
//Realiza o cadastro de Usuários no banco de dados

//Utilizado por: userRegister.JS (DIRETAMENTE), scriptCadUser.JS (INDIRETAMENTE)

include 'connection.php';
header("Content-Type: application/json");

$info_cad = file_get_contents("php://input");
$json = json_decode($info_cad, true);

$usuario = $json['user'];
$senha = $json['password'];
$nivel = $json['level'];

checkRegister($usuario,$senha,$nivel,$conn);

function checkRegister($usuario,$senha,$nivel,$conn){
    //verifica se o nome de usuário ja existe no banco de dados

    $stmt = $conn->prepare("SELECT * FROM cadastro WHERE usuario = ?");

        if ($stmt === false){

            echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
            exit;

        }
    
    $stmt->bind_param("s",$usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

       echo json_encode([
        "status" => "already exists",
        "mensagem" => "usuario ja cadastrado"
       ]);

    } else {
    
        userRegister($usuario,$senha,$nivel,$conn);

    }

}

function userRegister($usuario,$senha,$nivel,$conn){
    //Realiza o “INSERT” no banco dados, assim cadastrando o usuário no sistema;

    $crypt = password_hash($senha, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO cadastro (usuario, senha, nivel) VALUES (? , ? , ?)");

        if ($stmt === false) {

            echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da query"]);
            exit;
        }

    $stmt->bind_param("sss", $usuario, $crypt, $nivel);
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