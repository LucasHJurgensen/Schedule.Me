//- Recebe os dados inseridos pelo usuário na pagina de login e envia para o PHP;

//- Recebe a confirmação dos dados do PHP e redireciona o usuário para a página principal de acordo com o nível de usuário;

//- Utiliza : login.php;

//- Utilizado por : logPg.html.

document.getElementById("login").addEventListener("submit", function(event){event.preventDefault();

<<<<<<< HEAD
    const roles = {
        admin: "mainPgAdmin.html",
        moder: "mainPgDir.html",
        coord: "mainPgCoord.html",
        prof: ""
    }

=======
>>>>>>> master
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("senha").value;

    fetch("backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user, password: password})
    })

    .then(response => response.json())

    .then(data => {

        if(data.status === "ok"){
<<<<<<< HEAD
            window.location.href = roles[data.nivel]
       
=======
            user = data.usuario;

            localStorage.setItem("nivel_usuario", data.nivel);
            localStorage.setItem("usuario", data.usuario);
            
            const roles = {
                admin: `mainPgAdmin.html?user=${user}`,
                moder: `mainPgDir.html?user=${user}`,
                coord: `mainPgCoord.html?user=${user}`,
                prof: `mainPgProf.html?user=${user}`
            }
       
            window.location.href = roles[data.nivel];
            
>>>>>>> master
        } else {
            alert("Falha no Login! Verifique seus Dados.");
        }
        
    })
    .catch(error => console.error("Erro:", error));
});