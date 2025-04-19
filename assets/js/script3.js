document.addEventListener("DOMContentLoaded", function () {
    console.log("Iniciando o programa");

    // Definindo variaveis para os elementos de radio, campos e botoes
    const cadastroRadio = document.getElementById("cadastro");
    const contatoRadio = document.getElementById("contato");
    const cadastroFields = document.getElementById("cadastroFields");
    const contatoFields = document.getElementById("contatoFields");
    const enviarCadastro = document.getElementById("enviarCadastro");
    const enviarContato = document.getElementById("enviarContato");
    const passwordProgressBar = document.getElementById("password-progress-bar");

    // Inicializando os campos e botoes
    cadastroFields.style.display = "none";
    contatoFields.style.display = "none";
    enviarCadastro.disabled = true;
    enviarContato.disabled = true;

    let ultimaOpcaoSelecionada = null;

    // Variavel para controlar os campos tocados
    const touchedFields = {
        email: false,
        emailContato: false,
        password: false,
        confirmPassword: false
    };

    // Funcao para limpar os inputs do formulario
    function limparInputs(formulario) {
        const inputs = formulario.querySelectorAll("input, select, textarea");
        inputs.forEach(input => input.value = "");

        // Limpeza de mensagens de erro especificas para o formulario
        if (formulario === cadastroFields) {
            document.getElementById("email-help").textContent = "";
            document.getElementById("password-help").textContent = "";
            document.getElementById("confirm-password-help").textContent = "";
            if (passwordProgressBar) {
                passwordProgressBar.style.width = "0%";
                passwordProgressBar.className = "progress-bar";
            }
        } else if (formulario === contatoFields) {
            document.getElementById("emailContato-help").textContent = "";
        }

        // Resetando o estado dos campos tocados
        touchedFields.email = false;
        touchedFields.emailContato = false;
        touchedFields.password = false;
        touchedFields.confirmPassword = false;
    }

    // Funcao para alternar entre os formularios de Cadastro e Contato
    function toggleFields(radio) {
        if (ultimaOpcaoSelecionada === radio) {
            radio.checked = false;
            ultimaOpcaoSelecionada = null;
            cadastroFields.style.display = "none";
            contatoFields.style.display = "none";

            // Limpa os campos ao desmarcar
            if (radio === cadastroRadio) limparInputs(cadastroFields);
            if (radio === contatoRadio) limparInputs(contatoFields);
        } else {
            cadastroFields.style.display = radio === cadastroRadio ? "flex" : "none";
            contatoFields.style.display = radio === contatoRadio ? "flex" : "none";
            ultimaOpcaoSelecionada = radio;

            // Limpa os campos do outro formulario ao alternar
            if (radio === cadastroRadio) limparInputs(contatoFields);
            if (radio === contatoRadio) limparInputs(cadastroFields);
        }
        toggleButtons();
    }

    // Event listeners para os botoes de radio
    cadastroRadio.addEventListener("click", () => toggleFields(cadastroRadio));
    contatoRadio.addEventListener("click", () => toggleFields(contatoRadio));

    // Funcao para validar o email
    function isEmailValido(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    // Funcão de validacao da senha, incluindo a barra de progresso
    function validateSenha() {
        const password = document.getElementById("password")?.value.trim() || "";
        const confirmPassword = document.getElementById("confirm-password")?.value.trim() || "";
        const passwordHelp = document.getElementById("password-help");
        const confirmPasswordHelp = document.getElementById("confirm-password-help");

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let valid = true;
        let passwordStrength = 0;
        let strength = "";

        // Verificando se a senha e valida
        if (!passwordRegex.test(password)) {
            if (touchedFields.password) {
                passwordHelp.textContent = "Quase lá! A senha precisa ter 8 caracteres, incluindo uma maiúscula, um número e um símbolo. Você consegue!";
                passwordHelp.className = "help-text fraca";
            } else {
                passwordHelp.textContent = "";
            }
            valid = false;
            strength = "fraca";
            passwordStrength = 10;
        } else {
            if (password.length >= 13) {
                strength = "forte";
                passwordStrength = 100;
            } else if (password.length >= 10) {
                strength = "media";
                passwordStrength = 60;
            } else {
                strength = "fraca";
                passwordStrength = 30;
            }
            passwordHelp.textContent = `Sua senha é (${strength}), mas está tudo certo! Requisitos atendidos ✅`;
            passwordHelp.className = `help-text ${strength}`;
        }

        // Atualizando a barra de progresso da senha
        if (passwordProgressBar) {
            passwordProgressBar.style.width = `${passwordStrength}%`;
            passwordProgressBar.className = `progress-bar ${strength}`;
        }

        // Verificando se as senhas coincidem
        if (password !== confirmPassword || confirmPassword === "") {
            if (touchedFields.confirmPassword) {
                confirmPasswordHelp.textContent = "Parece que as senhas não batem. Tenta digitar de novo com calma 😊";
                confirmPasswordHelp.className = "help-text fraca";
            } else {
                confirmPasswordHelp.textContent = "";
            }
            valid = false;
        } else {
            confirmPasswordHelp.textContent = "Senhas conferem!👍 Pode seguir tranquilo(a) 🔐";
            confirmPasswordHelp.className = "help-text forte";
        }

        return valid;
    }

    // Funcao de validacao do formulario de cadastro
    function validateCadastro() {
        const tipo = document.getElementById("tipo")?.value.trim();
        const nome = document.getElementById("name")?.value.trim();
        const username = document.getElementById("username")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const senhaPreenchida = document.getElementById("password")?.value.trim();
        const confirmPreenchida = document.getElementById("confirm-password")?.value.trim();
        const emailHelp = document.getElementById("email-help");

        let valido = true;

        if (touchedFields.email) {
            if (!isEmailValido(email)) {
                emailHelp.textContent = "Ops! Parece que o e-mail digitado não é válido. Que tal dar uma conferida?";
                emailHelp.className = "help-text fraca";
                valido = false;
            } else {
                emailHelp.textContent = "Tudo certo com o e-mail! 👍 Pode continuar.";
                emailHelp.className = "help-text forte";
            }
        } else {
            emailHelp.textContent = "";
        }

        return tipo && nome && username && email && senhaPreenchida && confirmPreenchida && validateSenha() && valido;
    }

    // Funcao de validacao do formulario de contato
    function validateContato() {
        const nome = document.getElementById("nameContato")?.value.trim();
        const email = document.getElementById("emailContato")?.value.trim();
        const mensagem = document.getElementById("message")?.value.trim();
        const emailHelp = document.getElementById("emailContato-help");

        let valido = true;

        if (touchedFields.emailContato) {
            if (!isEmailValido(email)) {
                emailHelp.textContent = "Ops! Parece que o e-mail digitado não é válido. Que tal dar uma conferida?";
                emailHelp.className = "help-text fraca";
                valido = false;
            } else {
                emailHelp.textContent = "Tudo certo com o e-mail! 👍 Pode continuar.";
                emailHelp.className = "help-text forte";
            }
        } else {
            emailHelp.textContent = "";
        }

        return nome && email && mensagem && valido;
    }

    // Funcao para ativar/desativar os botoes de envio
    function toggleButtons() {
        enviarCadastro.disabled = !validateCadastro();
        enviarContato.disabled = !validateContato();
    }

    // Event listeners para os campos de cadastro
    const cadastroInputs = ["tipo", "name", "username", "email", "password", "confirm-password"];
    cadastroInputs.forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener("input", function () {
            if (id === "email") touchedFields.email = true;
            if (id === "password") touchedFields.password = true;
            if (id === "confirm-password") touchedFields.confirmPassword = true;

            validateSenha();
            toggleButtons();
        });
    });

    // Event listeners para os campos de contato
    const contatoInputs = ["nameContato", "emailContato", "message"];
    contatoInputs.forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener("input", function () {
            if (id === "emailContato") touchedFields.emailContato = true;
            toggleButtons();
        });
    });

    // Funcão para cancelar o formulario
    const cancelarCadastroBtn = document.getElementById("cancelarCadastro");
    const cancelarContatoBtn = document.getElementById("cancelarContato");

    function cancelarFormulario(radio, formulario) {
        limparInputs(formulario);
        formulario.style.display = "none";
        radio.checked = false;
        ultimaOpcaoSelecionada = null;
        toggleButtons();
    }

    cancelarCadastroBtn?.addEventListener("click", function (e) {
        e.preventDefault();
        cancelarFormulario(cadastroRadio, cadastroFields);
    });

    cancelarContatoBtn?.addEventListener("click", function (e) {
        e.preventDefault();
        cancelarFormulario(contatoRadio, contatoFields);
    });

    // Funcao de modal de confirmacao
    function exibirModalConfirmacao(titulo, mensagem) {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        const modal = document.createElement("div");
        modal.style.backgroundColor = "#fff";
        modal.style.padding = "25px";
        modal.style.borderRadius = "10px";
        modal.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
        modal.style.textAlign = "center";
        modal.style.maxWidth = "400px";
        modal.style.color = "#000"; // Forcando a cor preta do texto

        const tituloElem = document.createElement("h3");
        tituloElem.textContent = titulo;
        tituloElem.style.color = "#000"; // Garantindo que o título tenha cor preta

        const mensagemElem = document.createElement("p");
        mensagemElem.textContent = mensagem;
        mensagemElem.style.color = "#000"; // Garantindo que a mensagem tenha cor preta

        const fecharBtn = document.createElement("button");
        fecharBtn.textContent = "Fechar";
        fecharBtn.style.marginTop = "20px";
        fecharBtn.style.padding = "10px 20px";
        // fecharBtn.style.backgroundColor = "#28a745";
        fecharBtn.style.backgroundColor = "#e60067";
        fecharBtn.style.color = "#fff";
        fecharBtn.style.border = "none";
        fecharBtn.style.borderRadius = "5px";
        fecharBtn.style.cursor = "pointer";
        
        fecharBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });

        modal.appendChild(tituloElem);
        modal.appendChild(mensagemElem);
        modal.appendChild(fecharBtn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    // Evento de envio do cadastro
    enviarCadastro?.addEventListener("click", function (e) {
        e.preventDefault();
        if (validateCadastro()) {
            const nome = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const tipo = document.getElementById("tipo")?.value.trim(); // Capturando o tipo de usuário

            // Definindo a mensagem com base no tipo de usuario
            let mensagemConfirmacao = "";
            if (tipo === "usuario") {
                mensagemConfirmacao = `Olá ${nome}! 🎉 Seu cadastro como Usuário foi feito com sucesso. Em breve, você receberá um e-mail com todos os detalhes no endereço: ${email}. Fique de olho na sua caixa de entrada! 😉`;
            } else if (tipo === "parceiro") {
                mensagemConfirmacao = `Olá ${nome}! 🎉 Seu cadastro como Parceiro foi feito com sucesso. Em breve, você receberá um e-mail com todos os detalhes no endereço: ${email}. Fique de olho na sua caixa de entrada! 😉`;
            }

            // Exibindo a modal de confirmacao com a mensagem personalizada
            exibirModalConfirmacao("Cadastro enviado", mensagemConfirmacao);

            limparInputs(cadastroFields);
            cadastroFields.style.display = "none";
            cadastroRadio.checked = false;
            ultimaOpcaoSelecionada = null;
            toggleButtons();
        }
    });

    // Evento de envio do contato
    enviarContato?.addEventListener("click", function (e) {
        e.preventDefault();
        if (validateContato()) {
            const nome = document.getElementById("nameContato")?.value.trim();
            const email = document.getElementById("emailContato")?.value.trim();
            exibirModalConfirmacao("Mensagem enviada", `Olá ${nome}! 😊 Sua mensagem foi recebida com sucesso. Em breve, entraremos em contato com você pelo e-mail: ${email}. Fique tranquilo(a), estamos à disposição!`);
            limparInputs(contatoFields);
            contatoFields.style.display = "none";
            contatoRadio.checked = false;
            ultimaOpcaoSelecionada = null;
            toggleButtons();
        }
    });
});
