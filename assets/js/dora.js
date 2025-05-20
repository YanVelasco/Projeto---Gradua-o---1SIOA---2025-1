  const frases = [
    "🌿 O planeta também faz parte do seu time!",
    "♻️ Prefira jogos digitais e evite desperdícios.",
    "🔌 Desligue o console após jogar. Energia salva = XP verde!",
    "🎮 Ser sustentável também é uma conquista!",
    "💚 Doe jogos antigos e espalhe diversão consciente."
  ];

  let index = 0;
  const fala = document.getElementById("fala-dora");

  setInterval(() => {
    index = (index + 1) % frases.length;
    fala.textContent = frases[index];
  }, 5000);
