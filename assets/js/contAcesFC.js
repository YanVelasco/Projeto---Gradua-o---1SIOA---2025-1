// CONTROLES DE ACESSIBILIDADE AQUI

  // Contrates

  function toggleContraste() {
    document.body.classList.toggle('alto-contraste');
  
    // Armazena a preferência no localStorage
    if (document.body.classList.contains('alto-contraste')) {
      localStorage.setItem('modoContraste', 'ativo');
    } else {
      localStorage.setItem('modoContraste', 'inativo');
    }
  }
  
  // Aplica a preferência salva ao carregar a página
  window.addEventListener('load', () => {
    if (localStorage.getItem('modoContraste') === 'ativo') {
      document.body.classList.add('alto-contraste');
    }
  });
  
  // Fontes

  // Tamanho da fonte
  let tamanhoFonte = 100;
  function alterarFonte(acao) {
    if (acao === 'aumentar' && tamanhoFonte < 150) {
      tamanhoFonte += 10;
    } else if (acao === 'diminuir' && tamanhoFonte > 70) {
      tamanhoFonte -= 10;
    }
    document.body.style.fontSize = `${tamanhoFonte}%`;
  }
