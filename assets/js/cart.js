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
