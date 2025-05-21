function showNotification(message) {
  const container = document.getElementById("notification-container");

  const toast = document.createElement("div");
  toast.className = "toast-message";

  const msgSpan = document.createElement("span");
  msgSpan.textContent = message;

  const link = document.createElement("a");
  link.href = "cart.html";
  link.textContent = "مشاهده سبد خرید";

  toast.appendChild(msgSpan);
  toast.appendChild(link);
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

const productContainer = document.getElementById("product-list");

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <a href="product.html?id=${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
    </a>
    <p>${product.description}</p>
    <span class="price">${product.price.toLocaleString()} تومان</span>
    <button class="add-to-cart">افزودن به سبد خرید</button>
  `;

  const button = card.querySelector(".add-to-cart");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    addToCart(product);
    showNotification(`${product.name} به سبد خرید اضافه شد`);
  });

  return card;
}

function renderAllProducts() {
  productContainer.className = "product-grid";
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

const searchInput = document.getElementById("product-search");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );

  renderFilteredProducts(filtered);
});

function renderFilteredProducts(filteredProducts) {
  productContainer.className = "product-grid";
  productContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productContainer.innerHTML =
      "<p style='text-align:center;'>هیچ محصولی یافت نشد.</p>";
    return;
  }

  filteredProducts.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

renderAllProducts();
