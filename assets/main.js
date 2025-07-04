// Load navbar
fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    // Re-select elements after HTML is injected
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav-links");
    const overlay = document.getElementById("navOverlay");
    const mobileClose = document.getElementById("mobile-close");

    function closeMenu() {
      nav.classList.remove("open");
      overlay.classList.remove("active");
    }

    if (hamburger && nav && overlay) {
      hamburger.addEventListener("click", () => {
        nav.classList.toggle("open");
        overlay.classList.toggle("active");
      });

      overlay.addEventListener("click", closeMenu);

      if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
      }
    }
  });

// Footer
fetch("footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
  });

// Swiper
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: { el: ".swiper-pagination" },
  autoplay: { delay: 3000 },
});

// Catalog
let productCatalog = [];

fetch("assets/productCatalog.json")
  .then(res => res.json())
  .then(data => {
    productCatalog = data;
    console.log("Catalog loaded:", productCatalog);
  })
  .catch(err => console.error("Failed to load catalog:", err));

const productGrid = document.querySelector('.product-grid');

if (productGrid) {
  productGrid.addEventListener('click', (e) => {
    if (productCatalog.length === 0) return;

    const img = e.target.closest('img');
    if (!img) return;

    const alt = img.getAttribute('alt')?.trim().toLowerCase();
    const category = productCatalog.find(c => c.id === alt);
    if (!category) return;

    openProductModal(category.products);
  });
}

function openProductModal(productArray) {
  const modalBody = document.getElementById("modal-body");
  const modalOverlay = document.getElementById("product-modal-overlay");
  if (!modalBody || !modalOverlay) return;

  modalBody.innerHTML = productArray.map(product => `
    <div class="product-card">
      <img class="product-card-img" src="assets/products/${product.img}" alt="${product.productName}" />
      <div class="product-card-info">
        <h2>${product.productName}</h2>
        <p>${product.description}</p>
        <p class="origin"><strong>Origin:</strong> ${product.origin}</p>
        <hr>
      </div>
    </div>
  `).join('');

  modalOverlay.classList.remove("hidden");
  requestAnimationFrame(() => modalOverlay.classList.add("show"));
}

function closeModal() {
  const modalOverlay = document.getElementById("product-modal-overlay");
  if (!modalOverlay) return;

  modalOverlay.classList.remove("show");
  setTimeout(() => {
    modalOverlay.classList.add("hidden");
    const modalBody = document.getElementById("modal-body");
    if (modalBody) modalBody.innerHTML = "";
  }, 300);
}

document.addEventListener("click", (e) => {
  const modalOverlay = document.getElementById("product-modal-overlay");
  if (!modalOverlay) return;

  if (e.target.matches(".modal-close")) {
    closeModal();
  }

  if (e.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  const modalOverlay = document.getElementById("product-modal-overlay");
  if (e.key === "Escape" && modalOverlay && !modalOverlay.classList.contains("hidden")) {
    closeModal();
  }
});