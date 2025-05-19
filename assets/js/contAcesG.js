// CONTROLES DE ACESSIBILIDADE AQUI

  // // Ler Genérico

  let lendo = false;
  let fala;
  let elementosParaLer = [];
  let indiceLeitura = 0;

  // Alterna leitura ao clicar no botão
  function lerPagina() {
    lendo = !lendo;

    const botao = document.getElementById('btnLeitura');

    if (lendo) {
      botao.classList.add('ativo');
      botao.innerHTML = '<i class="bi bi-stop-circle"></i> Parar';
      lerEstruturaBasica();
    } else {
      botao.classList.remove('ativo');
      botao.innerHTML = '<i class="bi bi-volume-up"></i> Ler';
      window.speechSynthesis.cancel();
    }
  }

  // Leitura inicial do cabeçalho e rodapé
  function lerEstruturaBasica() {
    const header = document.querySelector("header")?.innerText || "";
    const footer = document.querySelector("footer")?.innerText || "";
    const texto = `${header}\n${footer}\nEntão, seja muito Bem-vindo! E para continuar, você pode usar a tecla Tab para navegar pelos elementos da página. Ou, se preferir, pressionar Shift + L para continuar a leitura do conteúdo da página.`;

    fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";

    // fala.onend = () => {
    //   prepararElementosParaLeitura();
    // };

    window.speechSynthesis.speak(fala);
  }

  // Prepara todos os elementos visíveis do body (exceto header/footer)
  function prepararElementosParaLeitura() {
    const todosElementos = document.querySelectorAll("body *:not(script):not(style)");

    elementosParaLer = Array.from(todosElementos).filter(el => {
      const estilo = window.getComputedStyle(el);
      const visivel = estilo.display !== "none" && estilo.visibility !== "hidden" && el.offsetHeight > 0;
      const dentroDeHeaderOuFooter = el.closest("header") || el.closest("footer");

      if (dentroDeHeaderOuFooter || !visivel) return false;

      const texto =
        el.innerText?.trim() ||
        el.getAttribute("aria-label") ||
        el.getAttribute("alt") ||
        el.getAttribute("placeholder") ||
        el.getAttribute("title") ||
        el.getAttribute("value");

      const relevante =
        texto && texto.length > 0 ||
        el.tagName === "IMG" ||
        el.getAttribute("role") === "img" ||
        el.classList.contains("carousel") ||
        el.classList.contains("card") ||
        el.classList.contains("grid");

      return relevante;
    });

    indiceLeitura = 0;
  }

  // Leitura sequencial com Shift + L
  document.addEventListener("keydown", (event) => {
    if (!lendo) return;

    if (event.shiftKey && event.key.toLowerCase() === "l") {
      event.preventDefault();

      if (elementosParaLer.length === 0) {
        prepararElementosParaLeitura();
      }

      lerProximoElemento();

    }
  });

  function lerProximoElemento() {
    if (indiceLeitura >= elementosParaLer.length) {
      const fim = new SpeechSynthesisUtterance("Fim da leitura do conteúdo da página.");
      fim.lang = "pt-BR";
      window.speechSynthesis.speak(fim);
      return;
    }

    const el = elementosParaLer[indiceLeitura];
    let texto =
      el.innerText?.trim() ||
      el.getAttribute("aria-label") ||
      el.getAttribute("alt") ||
      el.getAttribute("placeholder") ||
      el.getAttribute("title") ||
      el.getAttribute("value");

    if (el.tagName === "IMG" && !texto) {
      texto = "Imagem sem descrição.";
    }

    if (texto) {
      const falaElemento = new SpeechSynthesisUtterance(`Conteúdo: ${texto}`);
      falaElemento.lang = "pt-BR";
      window.speechSynthesis.speak(falaElemento);
      falaElemento.onend = () => {
        indiceLeitura++;
      };
    } else {
      indiceLeitura++;
      lerProximoElemento();
    }
  }

  // Leitura ao focar em elementos interativos
  document.addEventListener("focusin", (event) => {
    if (!lendo) return;

    const el = event.target;
    let texto = "";

    if (el.tagName === "A") {
      texto = `Link: ${el.innerText || el.getAttribute("aria-label") || el.href}`;
    } else if (el.tagName === "BUTTON") {
      texto = `Botão: ${el.innerText}`;
    } else if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) {
      const nomeCampo = el.getAttribute("placeholder") || el.name || "campo";
      texto = `Campo: ${nomeCampo}`;
    } else if (el.hasAttribute("tabindex")) {
      texto = `Elemento focado: ${el.innerText || el.getAttribute("aria-label") || "sem descrição"}`;
    }

    if (texto) {
      const falaElemento = new SpeechSynthesisUtterance(texto);
      falaElemento.lang = "pt-BR";
      window.speechSynthesis.speak(falaElemento);
    }
  });

  // 🪟 Leitura de modais
  function observarTodosModais() {
    const modaisLidos = new Set();

    setInterval(() => {
      if (!lendo) return;

      const modais = document.querySelectorAll('[role="dialog"], .modal, [aria-modal="true"]');

      modais.forEach(modal => {
        const estilo = window.getComputedStyle(modal);
        const visivel = estilo.display !== "none" && estilo.visibility !== "hidden" && modal.getAttribute("aria-hidden") !== "true";

        if (visivel && !modaisLidos.has(modal)) {
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
    observarTodosModais();
  });


