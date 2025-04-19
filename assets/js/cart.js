document.addEventListener("DOMContentLoaded", () => {
    const cartCounter = document.getElementById("cart-counter");
    const buyButtons = document.querySelectorAll(".buy-button");

    let cartCount = 0;

    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isAdded = button.getAttribute("data-added") === "true";

            if (isAdded) {
                cartCount--;
                button.textContent = button.classList.contains("carousel-text") ? "Comprar Agora" : "Comprar";
                button.setAttribute("data-added", "false");
            } else {
                cartCount++;
                button.textContent = "Remover do Carrinho";
                button.setAttribute("data-added", "true");
            }

            cartCounter.textContent = cartCount;
        });
    });
});
