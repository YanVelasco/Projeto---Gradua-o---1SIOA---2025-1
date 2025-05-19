// CONTROLES DE ACESSIBILIDADE AQUI

  // Ler Cadastro

  let lendo = false;
  let fala;
  let leituraInicialFeita = false;

  // Leitura inicial ou do formulário selecionado
  function lerPagina() {
    const botao = document.getElementById('btnLeitura');

    if (lendo) {
      window.speechSynthesis.cancel();
      lendo = false;
      botao.classList.remove('ativo');
      botao.innerHTML = '<i class="bi bi-volume-up"></i> Ler';
      return;
    }

    lendo = true;
    botao.classList.add('ativo');
    botao.innerHTML = '<i class="bi bi-stop-circle"></i> Parar';

    const header = document.querySelector("header")?.innerText || "";
    const footer = document.querySelector("footer")?.innerText || "";
    const cadastroRadio = document.getElementById("cadastro");
    const contatoRadio = document.getElementById("contato");
    const cadastroFields = document.getElementById("cadastroFields");
    const contatoFields = document.getElementById("contatoFields");

    let texto = "";

    if (!leituraInicialFeita) {
      texto = `${header}
  ${footer}
  A Indora agradece a sua visita! Você deseja preencher o formulário de Cadastro ou Contato? Selecione uma opção e clique no botão Parar e consequentente o botão Ler novamente para continuar.`;
      leituraInicialFeita = true;
    } else {
      if (cadastroRadio.checked && cadastroFields.style.display !== "none") {
        texto = `Você selecionou o formulário de Cadastro. Vamos começar.
  ${cadastroFields.innerText}`;
      } else if (contatoRadio.checked && contatoFields.style.display !== "none") {
        texto = `Você selecionou o formulário de Contato. Vamos começar.
  ${contatoFields.innerText}`;
      } else {
        texto = "Por favor, selecione uma opção: Cadastro ou Contato.";
      }
    }

    fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    window.speechSynthesis.speak(fala);

    fala.onend = () => {
      // Só altera o botão se a leitura tiver sido cancelada manualmente
      if (!lendo) return;
    
    };

  }

  // Leitura dinâmica dos campos do formulário (ao sair do campo)
  function ativarLeituraDinamicaFormulario() {
    const cadastroRadio = document.getElementById("cadastro");
    const contatoRadio = document.getElementById("contato");
    const cadastroFields = document.getElementById("cadastroFields");
    const contatoFields = document.getElementById("contatoFields");

    const todosCampos = document.querySelectorAll("input, select, textarea");
    todosCampos.forEach(campo => {
      campo.removeEventListener("blur", lerCampo);
    });

    let camposAtivos = [];
    if (cadastroRadio?.checked && cadastroFields?.style.display !== "none") {
      camposAtivos = cadastroFields.querySelectorAll("input, select, textarea");
    } else if (contatoRadio?.checked && contatoFields?.style.display !== "none") {
      camposAtivos = contatoFields.querySelectorAll("input, select, textarea");
    }

    camposAtivos.forEach(campo => {
      campo.addEventListener("blur", lerCampo);
    });
  }

  // Leitura ao sair de campos de formulário
  function lerCampo(event) {
    if (!lendo) return; // Só lê se o botão "Ler" estiver ativo
  
    const valor = event.target.value;
    const nomeCampo = event.target.getAttribute("placeholder") || event.target.name || "campo";
  
    if (valor.trim() !== "") {
      const texto = `Você digitou ou selecionou: ${valor}, no campo ${nomeCampo}.`;
      const falaCampo = new SpeechSynthesisUtterance(texto);
      falaCampo.lang = "pt-BR";
      window.speechSynthesis.speak(falaCampo);
    }
  }
  

  // Leitura imediata ao focar em elementos interativos
  document.addEventListener("focusin", (event) => {
    if (!lendo) return; // Só lê se o botão "Ler" estiver ativo
  
    const el = event.target;
    let texto = "";
  
    if (el.tagName === "A") {
      texto = `Link: ${el.innerText || el.getAttribute("aria-label") || el.href}`;
    } else if (el.tagName === "BUTTON") {
      texto = `Botão: ${el.innerText}`;
    } else if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) {
      return; // já será lido no blur
    } else if (el.hasAttribute("tabindex")) {
      texto = `Elemento focado: ${el.innerText || el.getAttribute("aria-label") || "sem descrição"}`;
    }
  
    if (texto) {
      const falaElemento = new SpeechSynthesisUtterance(texto);
      falaElemento.lang = "pt-BR";
      window.speechSynthesis.speak(falaElemento);
    }
  });  

  // Leitura de modais
  function observarTodosModais() {
    const modaisLidos = new Set();

    setInterval(() => {
      const modais = document.querySelectorAll('[role="dialog"], .modal, [aria-modal="true"]');

      modais.forEach(modal => {
        const estilo = window.getComputedStyle(modal);
        const visivel = estilo.display !== "none" && estilo.visibility !== "hidden" && modal.getAttribute("aria-hidden") !== "true";

        if (lendo && visivel && !modaisLidos.has(modal)) {
          modaisLidos.add(modal);
          const texto = `Modal aberto: ${modal.innerText}`;
          const falaModal = new SpeechSynthesisUtterance(texto);
          falaModal.lang = "pt-BR";
          window.speechSynthesis.speak(falaModal);
        }        

        if (!visivel && modaisLidos.has(modal)) {
          modaisLidos.delete(modal);
        }
      });
    }, 300);
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    ativarLeituraDinamicaFormulario();
    observarTodosModais();
  });