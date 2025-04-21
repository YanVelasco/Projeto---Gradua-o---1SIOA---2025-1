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
