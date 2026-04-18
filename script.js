let images = [];
let currentImgIndex = 0;

let variants = [];
let selectedPrice = 0;
let selectedSize = "";



/* MODAL */
function openModal(productCard) {
  const modal = document.getElementById("productModal");

  const title = productCard.getAttribute("data-title");
  const desc = productCard.getAttribute("data-desc");

  images = JSON.parse(productCard.getAttribute("data-img"));
  currentImgIndex = 0;

  variants = JSON.parse(productCard.getAttribute("data-variants"));

  modal.querySelector("h3").innerText = title;
  modal.querySelector(".about").innerText = desc;

  updateImage();
  renderVariants(modal);

  document.getElementById("qty").value = 1;

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
}


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

// ================= VARIANTE =================
function renderVariants(modal) {
  const container = modal.querySelector(".variants");
  container.innerHTML = "";

  variants.forEach((v, index) => {
    const btn = document.createElement("button");
    btn.innerText = v.size;

    // clasă generică pentru toate butoanele de variantă
    btn.classList.add("variant-btn");

    // atribut pentru CSS
    btn.setAttribute("data-size", v.size);

    btn.onclick = () => selectVariant(index, modal);

    container.appendChild(btn);
  });

  // Selectăm prima variantă implicit
  selectVariant(0, modal);
}

function selectVariant(index, modal) {
  const container = modal.querySelector(".variants");
  const allBtns = container.querySelectorAll("button");

  allBtns.forEach(btn => btn.classList.remove("active"));
  allBtns[index].classList.add("active");

  selectedPrice = variants[index].price;
  selectedSize = variants[index].size;

  modal.querySelector("#price").innerText = selectedPrice;
  modal.querySelector("#selectedSize").innerText = selectedSize;
}

// ================= CANTITATE =================
function changeQty(value) {
  const input = document.getElementById("qty");
  let current = parseInt(input.value);

  current += value;
  if (current < 1) current = 1;

  input.value = current;
}




let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart() {
  let title = document.querySelector("#productModal h3").innerText;
  let qty = parseInt(document.getElementById("qty").value);

  let product = {
    title: title,
    size: selectedSize,
    price: selectedPrice,
    qty: qty
  };

  let existing = cart.find(p =>
    p.title === product.title && p.size === product.size
  );

  if (existing) {
    existing.qty += product.qty;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge(); // 🔥 IMPORTANT
  // Notificare peste buton
function showCartNotification() {
  const modalBtn = document.querySelector("#productModal .btn");
  if (!modalBtn) return;

  // Crează notificarea
  const notif = document.createElement("span");
  notif.innerText = "✔ Adăugat în coș!";
  notif.style.position = "absolute";
  notif.style.top = "-30px";
  notif.style.left = "50%";
  notif.style.transform = "translateX(-50%)";
  notif.style.background = "#28a745";
  notif.style.color = "white";
  notif.style.padding = "5px 10px";
  notif.style.borderRadius = "5px";
  notif.style.fontSize = "14px";
  notif.style.fontWeight = "bold";
  notif.style.zIndex = "1000";
  notif.style.opacity = "0";
  notif.style.transition = "opacity 0.3s";

  modalBtn.style.position = "relative"; // asigurăm poziția relativă

  modalBtn.appendChild(notif);

  // Fade in
  setTimeout(() => notif.style.opacity = "1", 10);

  // Fade out și ștergere
  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}
}

// ================= CART PAGE =================
function displayCartPage() {
  let container = document.getElementById("cart-items");
  if (!container) return;

  let total = 0;

  container.innerHTML = "";

  cart.forEach((item, i) => {
    let subtotal = item.price * item.qty;
    total += subtotal;

    container.innerHTML += `
      <div>
        <h4>${item.title} (${item.size})</h4>
        <p>${item.price} RON x ${item.qty}</p>
        <p>${subtotal} RON</p>
        <button onclick="removeItem(${i})">Șterge</button>
      </div>
    `;
  });

  document.getElementById("products-total").innerText = total;
  document.getElementById("total").innerText = total + 30;
}

// REMOVE
function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartPage();
}

// ================= CHECKOUT =================
function loadCheckout() {
  let total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  document.getElementById("products-total").innerText = total;
  document.getElementById("total").innerText = total + 20;
}

// ================= TRIMITERE =================
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("order-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    let data = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      county: document.getElementById("county").value,
      city: document.getElementById("city").value,
      address: document.getElementById("address").value,
      cart: cart.map(i => `${i.title} (${i.size}) x${i.qty}`).join("\n"),
      total: cart.reduce((s, i) => s + i.price * i.qty, 0) + 20
    };

    emailjs.send("service_4u563sn", "template_oxk6u57", data)
      .then(() => {
  // afișează cardul
  const card = document.getElementById("confirmation-card");
  card.style.display = "block";

  // golim coșul
  localStorage.removeItem("cart");

  // butonul OK
  document.getElementById("confirmation-ok-btn").onclick = () => {
    window.location.href = "index.html"; // te duce la începutul site-ului
  };
})
      .catch(err => {
        alert("❌ A apărut o eroare la trimiterea comenzii. Verifică conexiunea.");
        console.error(err);
      });
  });
});


function updateCartBadge() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  let badge = document.getElementById("cart-count");

  if (!badge) {
    let icon = document.querySelector(".cos");
    badge = document.createElement("span");

    badge.id = "cart-count";
    badge.style.position = "absolute";
    badge.style.top = "10px";
    badge.style.right = "120px";
    badge.style.background = "red";
    badge.style.color = "white";
    badge.style.borderRadius = "50%";
    badge.style.padding = "1px 5px";
    badge.style.fontSize = "12px";

    icon.appendChild(badge);
  }

  badge.innerText = count;
}




document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('active');
    }
  });

});






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

