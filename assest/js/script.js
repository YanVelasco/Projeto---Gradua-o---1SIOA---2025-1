function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordHelp = document.getElementById('password-help');
    const confirmPasswordHelp = document.getElementById('confirm-password-help');
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let valid = true;

    // Verifica se a senha atende ao padrão
    if (!passwordRegex.test(password)) {
        passwordHelp.style.color = "red";
        valid = false;
    } else {
        passwordHelp.style.color = "green";
    }

    // Verifica se a confirmação de senha é igual à senha
    if (password !== confirmPassword) {
        confirmPasswordHelp.style.color = "red";
        valid = false;
    } else {
        confirmPasswordHelp.style.color = "green";
    }

    return valid;
}

// Habilita/Desabilita os botões
function toggleButtons() {
    const cadastroFields = document.getElementById('cadastroFields');
    const contatoFields = document.getElementById('contatoFields');
    const enviarCadastro = document.getElementById('enviarCadastro');
    const enviarContato = document.getElementById('enviarContato');

    // Verifica se os campos do cadastro estão preenchidos
    const cadastroFieldsFilled = document.getElementById('name').value && 
                                 document.getElementById('username').value && 
                                 document.getElementById('email').value && 
                                 document.getElementById('password').value &&
                                 document.getElementById('confirm-password').value;

    // Verifica se os campos de contato estão preenchidos
    const contatoFieldsFilled = document.getElementById('nameContato').value &&
                                document.getElementById('emailContato').value &&
                                document.getElementById('message').value;

    // Ativa o botão "Enviar Cadastro" se todos os campos de cadastro forem preenchidos
    if (cadastroFieldsFilled && validateForm()) {
        enviarCadastro.removeAttribute("disabled");
    } else {
        enviarCadastro.setAttribute("disabled", "true");
    }

    // Ativa o botão "Enviar Contato" se todos os campos de contato forem preenchidos
    if (contatoFieldsFilled) {
        enviarContato.removeAttribute("disabled");
    } else {
        enviarContato.setAttribute("disabled", "true");
    }
}

// Alterna entre os campos de Cadastro e Contato
const cadastroRadio = document.getElementById('cadastro');
const contatoRadio = document.getElementById('contato');
const cadastroFields = document.getElementById('cadastroFields');
const contatoFields = document.getElementById('contatoFields');

cadastroRadio.addEventListener("change", () => {
    cadastroFields.style.display = "flex";
    contatoFields.style.display = "none";
    toggleButtons(); // Verifica se os botões devem ser habilitados
});

contatoRadio.addEventListener("change", () => {
    contatoFields.style.display = "flex";
    cadastroFields.style.display = "none";
    toggleButtons(); // Verifica se os botões devem ser habilitados
});

// Adiciona o evento para monitorar os inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', toggleButtons);
});

document.getElementById('message').addEventListener('input', toggleButtons);
