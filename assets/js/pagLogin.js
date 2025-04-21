document.addEventListener("DOMContentLoaded", () => {
    // Mostrar/ocultar senha
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("inputPassword3");
  
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
  
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-low-vision");
      });
    }
  
    // Salvando usuário e redirecionando
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const usuario = document.getElementById("inputUsuario").value;
  
        if (usuario.trim() !== "") {
          localStorage.setItem("nomeUsuario", usuario);
          window.location.href = "/index.html";
        } else {
          alert("Por favor, preencha o nome de usuário.");
        }
      });
    }
  });
  