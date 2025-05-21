const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");

function renderCart() {
  container.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    container.innerHTML = "<p>سبد خرید شما خالی است.</p>";
    totalElement.textContent = "";
    return;
  }

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>تعداد: ${item.quantity}</p>
      </div>
      <div class="cart-item-price">
        ${(item.price * item.quantity).toLocaleString()} تومان
      </div>
      <button class="cart-item-remove" onclick="removeItem(${index})">حذف</button>
    `;

    container.appendChild(itemDiv);
  });

  totalElement.textContent = `جمع کل: ${total.toLocaleString()} تومان`;
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

renderCart();
