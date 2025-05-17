document.addEventListener("DOMContentLoaded", function () {
    const cartCounter = document.getElementById("cart-counter");
    let cartCount = 0;

    // Recupera o carrinho do localStorage ao carregar a página
    let cart = JSON.parse(localStorage.getItem("indora-cart")) || [];
    cartCount = cart.length;
    updateCartCounter();

    function updateCartCounter() {
        cartCounter.textContent = cartCount;
    }

    function toggleCart(button) {
        const isAdded = button.getAttribute("data-added") === "true";
        const gameCard = button.closest(".game-card");
        // Corrige o seletor para garantir que pega o elemento certo
        const title = gameCard.querySelector("h3") ? gameCard.querySelector("h3").textContent : "";
        const priceElem = gameCard.querySelector(".game-price");
        const price = priceElem ? parseFloat(priceElem.getAttribute("data-price")) : 0;
        const imageElem = gameCard.querySelector("img");
        const image = imageElem ? imageElem.getAttribute("src") : "";

        if (isAdded) {
            cartCount--;
            button.textContent = "Comprar";
            button.setAttribute("data-added", "false");
            cart = cart.filter(item => item.title !== title);
            localStorage.setItem("indora-cart", JSON.stringify(cart));
        } else {
            cartCount++;
            button.textContent = "Remover do Carrinho";
            button.setAttribute("data-added", "true");
            // Salva sempre as três propriedades
            cart.push({ title: title, price: price, image: image });
            localStorage.setItem("indora-cart", JSON.stringify(cart));
        }

        updateCartCounter();
    }

    const buyButtons = document.querySelectorAll(".buy-button, .games .game-card button");
    buyButtons.forEach(button => {
        const gameCard = button.closest(".game-card");
        if (gameCard) {
            const title = gameCard.querySelector("h3") ? gameCard.querySelector("h3").textContent : "";
            if (cart.some(item => item.title === title)) {
                button.textContent = "Remover do Carrinho";
                button.setAttribute("data-added", "true");
            }
        }
        button.addEventListener("click", function () {
            toggleCart(button);
        });
    });
});
