const nomeUsuario = localStorage.getItem("nomeUsuario");
const botaoLogin = document.getElementById("botao-login");
const dropdownMenu = document.getElementById("dropdown-menu");
const logoutBtn = document.getElementById("logout-btn");

if (nomeUsuario) {
    botaoLogin.textContent = `Olá, ${nomeUsuario} ⏷`;
    botaoLogin.href = "#";

    // Mostrar/ocultar menu ao clicar no botão
    botaoLogin.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Evento de logout
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("nomeUsuario");
        location.reload();
    });
}
