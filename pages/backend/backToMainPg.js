
window.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("usuario");
    const nivel = localStorage.getItem("nivel_usuario");
  
    if (!user || !nivel) {
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "logPg.html";
      return;
    }
  
    document.getElementById("nomeUsuario").textContent= user;
});

function MenuPrincipal() {
    const nivel = localStorage.getItem("nivel_usuario");
    const user = localStorage.getItem("usuario");

    if (!nivel || !user) {
        alert("Usuário não identificado. Redirecionando para o login...");
        window.location.href = "logPg.html";
        return;
    }

    const roles = {
        admin: `mainPgAdmin.html?user=${user}`,
        moder: `mainPgDir.html?user=${user}`,
        coord: `mainPgCoord.html?user=${user}`,
        prof: `mainPgProf.html?user=${user}`
    }

    const destino = roles[nivel];

    if (destino) {
        window.location.href = destino;
    } else {
        alert("Nível de usuário inválido. Faça login novamente.");
        window.location.href = "logPg.html";
    }
}