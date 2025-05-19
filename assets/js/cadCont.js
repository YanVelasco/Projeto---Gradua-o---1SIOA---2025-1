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

    // Desmarca avatar aqui
    desmarcarAvatar();

} else {
    cadastroFields.style.display = radio === cadastroRadio ? "flex" : "none";
    contatoFields.style.display = radio === contatoRadio ? "flex" : "none";
    ultimaOpcaoSelecionada = radio;

    // Limpa os campos do outro formulario ao alternar
    if (radio === cadastroRadio) limparInputs(contatoFields);
    if (radio === contatoRadio) limparInputs(cadastroFields);

    desmarcarAvatar();

}
toggleButtons();
const validacao = validateCadastro();
console.log("Resultado da validateCadastro:", validacao);

ativarLeituraDinamicaFormulario();

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

// Fase 3 Início para geração automática do Nome do Usuário

    // Seleciona os campos
    const nomeInput = document.getElementById('name');

    const usernameInput = document.getElementById('username');

    // Torna o campo readonly
    usernameInput.readOnly = true;

    // Lista de usernames já existentes (exemplo)
    const usernamesExistentes = ['j.silva', 'j.silvalima', 'a.lima', 'm.santos', 'r.amaro'];

    // Lista de palavras a ignorar (preposições, artigos etc.)
    const palavrasIgnoradas = ['da', 'de', 'do', 'das', 'dos', 'e', 'a', 'o'];

    // Função para remover acentuação e caracteres especiais
    function removerAcentos(str) {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z\s]/gi, '');
    }

    // Gera username com inicial + combinação crescente de sobrenomes (ignorando preposições/artigos)
    function gerarUsername(nomeCompleto) {
      const nomeLimpo = removerAcentos(nomeCompleto.trim().toLowerCase());
      if (nomeLimpo === '') return '';
    
      const partes = nomeLimpo.split(' ').filter(Boolean);
      if (partes.length < 2) return partes[0]; // fallback para um nome só
    
      const inicial = partes[0].charAt(0); // primeira letra do primeiro nome
      const sobrenomes = partes
        .slice(1)
        .filter(p => !palavrasIgnoradas.includes(p)); // ignora preposições e artigos
    
      // Gera combinações crescentes de sobrenomes
      for (let i = 1; i <= sobrenomes.length; i++) {
        const combinacao = sobrenomes.slice(0, i).join('');
        let usernameBase = `${inicial}.${combinacao}`;
        let usernameFinal = usernameBase;
        let contador = 1;
    
        while (usernamesExistentes.includes(usernameFinal)) {
          usernameFinal = `${usernameBase}${contador}`;
          contador++;
        }
    
        if (!usernamesExistentes.includes(usernameFinal)) {
          return usernameFinal;
        }
      }
  
      // Caso todas as combinações falhem, adiciona número no final da última
      let ultimaCombinacao = sobrenomes.join('');
      let fallbackBase = `${inicial}.${ultimaCombinacao}`;
      let fallback = fallbackBase;
      let contador = 1;
      while (usernamesExistentes.includes(fallback)) {
        fallback = `${fallbackBase}${contador}`;
        contador++;
      }
      return fallback;
    }

    // Atualiza o campo automaticamente ao digitar o nome
    if (nomeInput && usernameInput) {
        usernameInput.readOnly = true;
      
        nomeInput.addEventListener("input", () => {
          const nomeCompleto = nomeInput.value;
          const usernameGerado = gerarUsername(nomeCompleto);
          usernameInput.value = usernameGerado;
      
          // Como o campo username foi alterado, atualiza validação do botão
          atualizarBotaoCadastro();
        });
      }
      


// Fase 3 Fim para geração automática do Nome do Usuário

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

const avatarSelecionado = document.getElementById("avatarInput")?.value.trim();


if (avatarSelecionado) {
    console.log("Avatar selecionado:", avatarSelecionado);
  } else {
    console.log("Nenhum avatar foi selecionado ainda.");
  }

return tipo && nome && username && email && senhaPreenchida && confirmPreenchida && dataNascimento && validateSenha() && valido && avatarSelecionado;
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
const cadastroInputs = ["tipo", "name", "username", "email", "password", "confirm-password","dataNascimento","avatarInput"];
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
const validacao = validateCadastro();
console.log("Resultado da validateCadastro:", validacao);
});
});

// Event listeners para os campos de contato
const contatoInputs = ["nameContato", "emailContato", "message"];
contatoInputs.forEach(id => {
const el = document.getElementById(id);
el?.addEventListener("input", function () {
    if (id === "emailContato") touchedFields.emailContato = true;
    toggleButtons();
const validacao = validateCadastro();
console.log("Resultado da validateCadastro:", validacao);
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
const validacao = validateCadastro();
console.log("Resultado da validateCadastro:", validacao);

desmarcarAvatar();  // <<< aqui, para desmarcar o avatar ao cancelar

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

modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.setAttribute("tabindex", "0");


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

modal.focus();
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
const validacao = validateCadastro();
console.log("Resultado da validateCadastro:", validacao);
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
const validacao = validateCadastro();
console.log("Resultado da validateCadastro:", validacao);
}
});
});


// Fase 3 Inicio para seleção do Avatar 

document.addEventListener("DOMContentLoaded", () => {
const openModalBtn = document.getElementById("openAvatarModal");
const avatarModal = document.getElementById("avatarModal");
const closeModalBtn = document.getElementById("closeAvatarModal");
const avatarOptions = document.querySelectorAll(".avatar-option");
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");
const avatarButton = openModalBtn;

openModalBtn.addEventListener("click", () => {
// Abre o modal
avatarModal.classList.remove("hidden");

// Remove seleção anterior de todos os avatares
avatarOptions.forEach(option => option.classList.remove("selected"));

// Marca o avatar selecionado, se houver
const selectedValue = avatarInput.value;
if (selectedValue) {
const selectedAvatar = Array.from(avatarOptions).find(option => option.getAttribute("data-value") === selectedValue);
if (selectedAvatar) {
selectedAvatar.classList.add("selected");
}
}

});

// Função para fechar modal
closeModalBtn.addEventListener("click", () => {
avatarModal.classList.add("hidden");
});

// Função para seleção do avatar
avatarOptions.forEach(option => {
option.addEventListener("click", () => {
// Pega o valor do avatar selecionado (data-value)
const selectedAvatar = option.getAttribute("data-value");
avatarInput.value = selectedAvatar;  // Atualiza input hidden
console.log("Avatar clicado:", selectedAvatar);
console.log("Valor no input avatarInput:", avatarInput.value);


// Dispara evento manual
const event = new Event("input", { bubbles: true });
avatarInput.dispatchEvent(event);


// Atualiza o preview no modal (ícone)
const iconHtml = option.innerHTML;  // ícone dentro da div selecionada
avatarPreview.innerHTML = iconHtml;

// Atualiza o botão para mostrar o avatar escolhido (ícone)
avatarButton.innerHTML = iconHtml + "<br><small>Avatar selecionado</small>";

// Fecha o modal após seleção
avatarModal.classList.add("hidden");

toggleButtons();  // Verifica se agora o botão pode ser habilitado
atualizarBotaoCadastro(); 

const validacao = validateCadastro();
console.log("Resultado da validateCadastro:", validacao);

});
});

// Fechar modal clicando fora da área modal-content
avatarModal.addEventListener("click", (e) => {
if (e.target === avatarModal) {
avatarModal.classList.add("hidden");
}
});
});

function desmarcarAvatar() {
// Remove classe selected de todos os avatares do modal
document.querySelectorAll(".avatar-option.selected").forEach(el => {
el.classList.remove("selected");
});

// Limpa o input escondido do avatar
const avatarInput = document.getElementById("avatarInput");
if (avatarInput) avatarInput.value = "";

// Reseta o botão que mostra o avatar selecionado para o texto padrão
const avatarButton = document.getElementById("openAvatarModal");
if (avatarButton) avatarButton.innerHTML = "Selecione o seu Avatar";
}


document.addEventListener("DOMContentLoaded", () => {
// Lista de IDs dos campos relevantes
const camposCadastro = [
"tipo",
"name",
"username",
"email",
"password",
"confirm-password",
"dataNascimento",
"avatarInput"
];

// Ativa/desativa o botão baseado na validação
function atualizarBotaoCadastro() {
const botao = document.getElementById("enviarCadastro");
if (botao) {
botao.disabled = !validateCadastro();
}
}

// Adiciona eventos a todos os campos para validar dinamicamente
camposCadastro.forEach(id => {
const el = document.getElementById(id);
if (el) {
el.addEventListener("input", atualizarBotaoCadastro);
el.addEventListener("change", atualizarBotaoCadastro);
}
});

// Atualiza o botão ao selecionar avatar
document.querySelectorAll(".avatar-option").forEach(option => {
option.addEventListener("click", () => {
const valor = option.getAttribute("data-value");
document.getElementById("avatarInput").value = valor;
atualizarBotaoCadastro();
});
});

// Marca campo email como "tocado" ao digitar, para mensagens personalizadas
document.getElementById("email")?.addEventListener("input", () => {
touchedFields.email = true;
atualizarBotaoCadastro();
});

atualizarBotaoCadastro(); // Força a validação inicial ao carregar a página

});

// Fase 3 Fim para seleção do Avatar 