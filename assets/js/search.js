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
