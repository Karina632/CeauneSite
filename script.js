let images = [];
let currentImgIndex = 0;





/* MODAL */
function openModal(productCard) {
  const modal = document.getElementById("productModal");

  const title = productCard.getAttribute("data-title");
  const desc = productCard.getAttribute("data-desc");

  // 🔥 ia dimensiunile
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
  

  // 📱 doar pentru telefon
  if (window.innerWidth <= 768) {
  if (window.innerWidth <= 768) {
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
} else {
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
}

modal.classList.add("active");

} else {
  // 🔥 RESET pentru desktop
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";

  const content = modal.querySelector(".modal-content");
  content.style.width = "";
  content.style.height = "";
}
  modal.classList.add("active");



function closeModal() {
  document.getElementById("productModal").classList.remove("active");
}




const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close");

/* OPEN (exemplu pe produs) 
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.classList.add("active");
  });
});
*/


/* CLOSE când apeși în afară */
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});






// ================= SLIDER =================
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







 /* function toggleMenu() {
    const nav = document.getElementById("navlinks");
    nav.classList.toggle("active");
}

// inchide meniul cand apesi pe link
document.querySelectorAll("#navlinks a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navlinks").classList.remove("active");
    });
});
 */
/* HAMBURGER 
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

/*CLOSE HAMBURGER 
document.addEventListener('click', (e) => {

    if (
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        navLinks.classList.remove('active');
    }
});

/* CLOSE HAMBURGER WITH A 
const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
/* ======================================================================== */

