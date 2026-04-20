let images = [];
let currentImgIndex = 0;

/* ================= MODAL ================= */
function openModal(productCard) {
  const modal = document.getElementById("productModal");

  const title = productCard.getAttribute("data-title");
  const desc = productCard.getAttribute("data-desc");

  const variants = JSON.parse(productCard.getAttribute("data-variants"));
  const sizes = variants.map(v => v.size).join(", ");

  images = JSON.parse(productCard.getAttribute("data-img"));
  currentImgIndex = 0;

  modal.querySelector(".title").innerText = title;
  modal.querySelector(".sizes").innerText = "Dimensiuni: " + sizes;
  modal.querySelector(".about").innerText = "Descriere: " + desc;

  updateImage();

  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("productModal").classList.remove("active");
}

/* CLICK ÎN AFARA MODALULUI */
window.addEventListener("click", (e) => {
  const modal = document.getElementById("productModal");
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});


/* ================= SLIDER ================= */
function updateImage() {
  document.querySelector(".modal-img").src = images[currentImgIndex];
}

function nextImg() {
  currentImgIndex++;
  if (currentImgIndex >= images.length) currentImgIndex = 0;
  updateImage();
}

function prevImg() {
  currentImgIndex--;
  if (currentImgIndex < 0) currentImgIndex = images.length - 1;
  updateImage();
}


/* ================= HAMBURGER ================= */
document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  /* DESCHIDE / INCHIDE */
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });

  /* INCHIDE CAND APESI IN AFARA */
  document.addEventListener('click', (e) => {
    if (
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('active');
    }
  });

  /* INCHIDE CAND APESI PE LINK */
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

});