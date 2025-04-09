document.getElementById("login").addEventListener("submit", function(event){event.preventDefault();

    const roles = {
        admin: "mainPgAdmin.html",
        moder: "mainPgDir.html",
        coord: "mainPgCoord.html",
        prof: ""
    }

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
            window.location.href = roles[data.nivel]
       
        } else {
            alert("Falha no Login! Verifique seus Dados.");
        }
        
    })
    .catch(error => console.error("Erro:", error));
});