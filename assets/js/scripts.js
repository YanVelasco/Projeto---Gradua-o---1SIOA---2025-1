// Inicio CadCont.js utilizado na Pagina Cadastro e Login

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
        confirmPassword: false,
        dataNascimento: false
    };

    // Função para mostrar o feedback de ajuda para o campo de data de nascimento
    const inputDataNascimento = document.getElementById("dataNascimento");
    const dataNascimentoHelp = document.getElementById("dataNascimentoHelp");

    if (dataNascimentoHelp) {
        dataNascimentoHelp.style.display = "none";  // Garante que ele começa oculto
    }

    if (inputDataNascimento && dataNascimentoHelp) {
        inputDataNascimento.addEventListener("focus", function () {
            console.log("Foco no campo de Data de Nascimento");
            touchedFields.dataNascimento = true;
            dataNascimentoHelp.style.display = "inline";  // ou "inline-block"
        });
    
        inputDataNascimento.addEventListener("blur", function () {
            if (inputDataNascimento.value.trim() === "") {
                dataNascimentoHelp.style.display = "none";
            }
        });
    }

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
        const dataNascimento = document.getElementById("dataNascimento")?.value;
        const dataNascimentoHelp = document.getElementById("dataNascimentoHelp");
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

        const inputData = document.getElementById("dataNascimento");

        if (!dataNascimento) {
            dataNascimentoHelp.textContent = "Ei! A data de nascimento é obrigatória. 😅";
            dataNascimentoHelp.className = "help-text fraca";
            // inputData.classList.remove("valido");
            // inputData.classList.add("invalido");
            valido = false;
        } else {
            const hoje = new Date();
            const nascimento = new Date(dataNascimento);
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            const mes = hoje.getMonth() - nascimento.getMonth();
            if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
                idade--;
            }
        
            if (idade < 13) {
                dataNascimentoHelp.textContent = "😕 Ops! Você precisa ter pelo menos 13 anos para se cadastrar.";
                dataNascimentoHelp.className = "help-text fraca";
                // inputData.classList.remove("valido");
                // inputData.classList.add("invalido");
                valido = false;
            } else {
                let mensagemIdade = `Boa! Idade confirmada: ${idade} anos. 🎉`;
                
                if (idade > 13 && idade <= 15) {
                    mensagemIdade += " Bem-vindo(a) ao universo dos games!";
                } else if (idade >= 16 && idade < 18) {
                    mensagemIdade += " Agora você pode explorar mais jogos com classificação +16!";
                } else if (idade >= 18) {
                    mensagemIdade += " Liberação total! Acesso garantido a todos os jogos 🎮";
                }
                
                dataNascimentoHelp.textContent = mensagemIdade;
                dataNascimentoHelp.className = "help-text forte";
                // inputData.classList.remove("invalido");
                // inputData.classList.add("valido");
            }
        }



        return tipo && nome && username && email && senhaPreenchida && confirmPreenchida && dataNascimento && validateSenha() && valido;
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
    const cadastroInputs = ["tipo", "name", "username", "email", "password", "confirm-password","dataNascimento"];
    cadastroInputs.forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener("input", function () {
            if (id === "email") touchedFields.email = true;
            if (id === "password") touchedFields.password = true;
            if (id === "confirm-password") touchedFields.confirmPassword = true;
            if (id === "dataNascimento")  {
                touchedFields.dataNascimento = el.value.trim() !== ""; // Verifica se o campo está vazio
            }

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
            window.location.href = "/index.html";
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

// Fim CadCont.js utilizado na Pagina Cadastro

// Inicio corousel.js utilizado na Pagina Home

document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('#carrosselDestaque');
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // 5 seconds
        ride: 'carousel'
    });
});

// Fim corousel.js utilizado na Pagina Home

// Inicio cart.js utilizado na Pagina Home, Mais Vendidos

document.addEventListener("DOMContentLoaded", function () {
    const cartCounter = document.getElementById("cart-counter");
    let cartCount = 0;

    /**
     * Atualiza o contador do carrinho.
     */
    function updateCartCounter() {
        cartCounter.textContent = cartCount;
    }

    /**
     * Alterna o estado do botão "Comprar" para "Remover do Carrinho" e vice-versa.
     * @param {HTMLElement} button - O botão clicado.
     */
    function toggleCart(button) {
        const isAdded = button.getAttribute("data-added") === "true";

        if (isAdded) {
            // Remover do carrinho
            cartCount--;
            button.textContent = "Comprar";
            button.setAttribute("data-added", "false");
        } else {
            // Adicionar ao carrinho
            cartCount++;
            button.textContent = "Remover do Carrinho";
            button.setAttribute("data-added", "true");
        }

        updateCartCounter();
    }

    // Adiciona o evento de clique a todos os botões "Comprar" das classes .buy-button
    const buyButtons = document.querySelectorAll(".buy-button, .games .game-card button");
    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            toggleCart(button);
        });
    });
});

// Fim cart.js utilizado na Pagina Home

// Inicio dropdown.js utilizado na Pagina Mais Vendidos

document.addEventListener("DOMContentLoaded", function () {
    const maisVendidosMenu = document.querySelector(".mais-vendidos-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const indieSection = document.querySelector(".indies");
    const gamesSection = document.querySelector(".games");

    /**
     * Mostra o menu suspenso ao passar o mouse.
     */
    maisVendidosMenu.addEventListener("mouseover", function () {
        dropdownMenu.style.display = "block";
    });

    /**
     * Esconde o menu suspenso ao sair do mouse.
     */
    maisVendidosMenu.addEventListener("mouseleave", function () {
        dropdownMenu.style.display = "none";
    });

    /**
     * Exibe ambas as seções ao clicar em "Mais Vendidos".
     */
    maisVendidosMenu.addEventListener("click", function () {
        indieSection.style.display = "block";
        gamesSection.style.display = "block";
    });

    /**
     * Filtra a seção "Jogos Indies" e oculta "Jogos Triplo A".
     */
    document.getElementById("filter-indies").addEventListener("click", function (event) {
        event.stopPropagation(); // Impede que o clique em "Jogos Indies" acione o evento de "Mais Vendidos"
        indieSection.style.display = "block";
        gamesSection.style.display = "none";
    });

    /**
     * Filtra a seção "Jogos Triplo A" e oculta "Jogos Indies".
     */
    document.getElementById("filter-games").addEventListener("click", function (event) {
        event.stopPropagation(); // Impede que o clique em "Jogos Triplo A" acione o evento de "Mais Vendidos"
        indieSection.style.display = "none";
        gamesSection.style.display = "block";
    });
});

// Fim dropdown.js utilizado na Pagina Mais Vendidos

// Inicio menulogin.js utilizado na Pagina Home

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

// Fim menulogin.js utilizado na Pagina Home

// Inicio paglogin.js utilizado na Pagina Login

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

// Fim paglogin.js utilizado na Pagina Login

// Inicio search.js utilizado na Pagina Mais Vendidos   

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const indieCards = document.querySelectorAll(".indie-card");
    const gameCards = document.querySelectorAll(".game-card");
    const indieSectionTitle = document.querySelector(".indies h2");
    const gamesSectionTitle = document.querySelector(".games h2");

    let isFilterApplied = false;

    /**
     * Aplica o filtro nos cards com base no valor do campo de pesquisa.
     */
    function applyFilter() {
        const query = searchInput.value.toLowerCase().trim();

        if (query === "") {
            alert("Por favor, insira um termo para pesquisar.");
            return;
        }

        let hasVisibleIndieCards = false;
        let hasVisibleGameCards = false;

        indieCards.forEach(card => {
            const gameName = card.querySelector("h3").textContent.toLowerCase();
            const isVisible = gameName.includes(query);
            card.style.display = isVisible ? "block" : "none";
            if (isVisible) hasVisibleIndieCards = true;
        });

        gameCards.forEach(card => {
            const gameName = card.querySelector("h3").textContent.toLowerCase();
            const isVisible = gameName.includes(query);
            card.style.display = isVisible ? "block" : "none";
            if (isVisible) hasVisibleGameCards = true;
        });

        indieSectionTitle.style.display = hasVisibleIndieCards ? "block" : "none";
        gamesSectionTitle.style.display = hasVisibleGameCards ? "block" : "none";

        searchButton.textContent = "Retirar Filtro";
        isFilterApplied = true;
    }

    /**
     * Remove o filtro e restaura todos os cards.
     */
    function removeFilter() {
        searchInput.value = "";

        indieCards.forEach(card => {
            card.style.display = "block";
        });

        gameCards.forEach(card => {
            card.style.display = "block";
        });

        indieSectionTitle.style.display = "block";
        gamesSectionTitle.style.display = "block";

        searchButton.textContent = "Pesquisar";
        isFilterApplied = false;
    }

    /**
     * Alterna entre aplicar e retirar o filtro.
     */
    function toggleFilter() {
        if (isFilterApplied) {
            removeFilter();
        } else {
            applyFilter();
        }
    }

    searchButton.addEventListener("click", function (e) {
        e.preventDefault();
        toggleFilter();
    });
});

// Fim search.js utilizado na Pagina Mais Vendidos   