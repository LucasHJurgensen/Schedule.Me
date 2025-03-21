document.getElementById("login").addEventListener("submit", function(event){event.preventDefault();

    let user = document.getElementById("usuario").value;
    let password = document.getElementById("senha").value;

    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user, password: password})
    })

    .then(response => response.json())

    .then(data => {

        if(data.status === "ok"){

            if (data.nivel === "admin"){
                
                window.location.href = "./mainPg-admin.html"; // Pagina Inicial do Adminsitrador

            } else if (data.nivel === "moder"){

                window.location.href = ""; //Pagina Inicial do Diretor

            } else if (data.nivel === "coord"){

                window.location.href = ""; //Pagina Inicial do Coordenador

            } else if (data.nivel === "prof"){

                window.location.href = ""; //Pagina Inicial do Professor

            }
        } else {
            alert("Falha no Login! Verifique seus Dados.");
        }
    })
    .catch(error => console.error("Erro:", error));
});