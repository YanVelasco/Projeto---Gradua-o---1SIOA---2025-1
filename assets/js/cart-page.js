document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let cart = JSON.parse(localStorage.getItem("indora-cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.</div>';
      cartTotal.textContent = "0.00";
      return;
    }
    let total = 0;
    cart.forEach((item, idx) => {
      const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
      let imagePath = item.image;
      if (imagePath && !imagePath.startsWith("/") && !imagePath.startsWith("http")) {
        imagePath = "../" + imagePath.replace(/^\.\//, "");
      }
      const card = document.createElement("div");
      card.className = "cart-card";
      card.innerHTML = `
        <img src="${imagePath}" alt="${item.title}">
        <div class="cart-card-details">
          <div class="cart-card-title">${item.title}</div>
          <div class="cart-card-price">R$ ${price.toFixed(2)}</div>
        </div>
        <button class="cart-card-remove" title="Remover item" data-index="${idx}">&times;</button>
      `;
      cartItemsContainer.appendChild(card);
      total += price;
    });
    cartTotal.textContent = total.toFixed(2);

    // Evento de remover item
    document.querySelectorAll(".cart-card-remove").forEach(btn => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-index"));
        cart.splice(idx, 1);
        localStorage.setItem("indora-cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();

  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    alert("Compra finalizada com sucesso!");
    localStorage.removeItem("indora-cart");
    window.location.href = "../index.html";
  });
});
