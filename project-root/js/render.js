// ⬛ نوتیفیکیشن زیبا با لینک به سبد خرید
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

// ⬛ عنصر لیست محصولات
const productContainer = document.getElementById("product-list");

// ⬛ تابع ساخت کارت محصول (برای استفاده در همه جا)
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <span class="price">${product.price.toLocaleString()} تومان</span>
    <button class="add-to-cart">افزودن به سبد خرید</button>
  `;

  const button = card.querySelector(".add-to-cart");
  button.addEventListener("click", () => {
    addToCart(product);
    showNotification(`${product.name} به سبد خرید اضافه شد`);
  });

  return card;
}

// ⬛ رندر اولیه همه محصولات
function renderAllProducts() {
  productContainer.className = "product-grid"; // اطمینان از ساختار grid
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

// ⬛ جستجو
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

// ⬛ رندر نتایج فیلترشده
function renderFilteredProducts(filteredProducts) {
  productContainer.className = "product-grid"; // اطمینان از نمایش درست کارت‌ها
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

// ⬛ اجرای رندر اولیه
renderAllProducts();
