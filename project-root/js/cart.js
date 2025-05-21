let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countElement) countElement.textContent = totalItems;
}

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function increaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity += 1;
    saveCart();
    updateCartCount();
    renderCart();
  }
}

function decreaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity -= 1;
    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartCount();
      renderCart();
    }
  }
}
