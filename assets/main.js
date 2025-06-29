// Load navbar
fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    // After navbar is loaded, activate hamburger and overlay
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav-links");
    const overlay = document.getElementById("navOverlay");
    const mobileClose = document.getElementById("mobile-close");

    hamburger.onclick = () => {
      nav.classList.toggle("open");
      overlay.classList.toggle("active");
    };

    overlay.onclick = () => {
      nav.classList.remove("open");
      overlay.classList.remove("active");
    };

    mobileClose.onclick = () => {
      nav.classList.remove("open");
      overlay.classList.remove("active");
    };
  });
fetch("footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
  });
// Initialize Swiper
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: { el: ".swiper-pagination" },
  autoplay: { delay: 3000 },
});

let productCatalog = [];

fetch("assets/productCatalog.json")
  .then(res => res.json())
  .then(data => {
    productCatalog = data;
    console.log("Catalog loaded:", productCatalog);
  })
  .catch(err => console.error("Failed to load catalog:", err));

const productGrid = document.querySelector('.product-grid');

productGrid.addEventListener('click', (e) => {
  if (productCatalog.length === 0) return; // wait for fetch

  const img = e.target.closest('img');
  if (!img) return;

  const alt = img.getAttribute('alt')?.trim().toLowerCase();
  const category = productCatalog.find(c => c.id === alt);
  if (!category) return;

  openProductModal(category.products);
});

function openProductModal(productArray) {
  const modalBody = document.getElementById("modal-body");
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
  `).join(''); // this is all you need

  modalOverlay.classList.remove("hidden");
  requestAnimationFrame(() => modalOverlay.classList.add("show"));
}

const modalOverlay = document.getElementById("product-modal-overlay");
const modalClose = document.querySelector(".modal-close");

function closeModal() {
  modalOverlay.classList.remove("show");
  setTimeout(() => {
    modalOverlay.classList.add("hidden");
    document.getElementById("modal-body").innerHTML = "";
  }, 300); // Match transition time

}

(function () {
  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      closeModal();
    }
  });
})();