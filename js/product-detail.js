const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find((p) => p.id === productId);

const container = document.getElementById("product-detail");
if (!product) {
  container.innerHTML = "<p>محصول مورد نظر پیدا نشد.</p>";
} else {
  container.innerHTML = `
    <div class="product-detail-card">
      <img src="${product.image}" alt="${product.name}">
      <h1>${product.name}</h1>
      <div class="product-description-box">
        <p>${product.description}</p>
      </div>
      <div class="product-price-box">
        <span class="price">${product.price.toLocaleString()} تومان</span>
        <button onclick="addToCartFromDetail()">افزودن به سبد خرید</button>
      </div>
    </div>
  `;
}

function addToCartFromDetail() {
  addToCart(product);
  alert("محصول به سبد خرید اضافه شد");
}
