function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotalElement) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      "<p style='text-align:center;'>سبد خرید شما خالی است.</p>";
    cartTotalElement.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.dataset.id = item.id;

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="quantity-controls">
          <button class="decrease-qty">−</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="increase-qty">+</button>
        </div>
      </div>
      <div class="cart-item-price">
        ${(item.price * item.quantity).toLocaleString()} تومان
      </div>
      <button class="cart-item-remove">حذف</button>
    `;

    cartItemsContainer.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `مبلغ کل: ${total.toLocaleString()} تومان`;
}

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");

  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (event) => {
      const target = event.target;
      const productId = parseInt(target.closest(".cart-item").dataset.id, 10);

      if (target.classList.contains("increase-qty")) {
        increaseQuantity(productId);
      } else if (target.classList.contains("decrease-qty")) {
        decreaseQuantity(productId);
      } else if (target.classList.contains("cart-item-remove")) {
        removeFromCart(productId);
      }
    });
  }

  renderCart();
  updateCartCount();
});
