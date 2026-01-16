/* ============================
   TastyGo — Shared JavaScript
   Uses: localStorage for cart & simple front-end auth-ui
   Clean, modular functions and page-aware init.
   ============================ */

/* -------------------------
   Sample Menu Data (id, name, price number, img)
   ------------------------- */
const dishes = [
  { id: 1, name: "Cheese Burger", price: 120, img: "burger.jpeg" },
  { id: 2, name: "Veg Pizza", price: 250, img: "pizza.jpg" },
  { id: 3, name: "Pasta Bowl", price: 180, img: "pasta.png" },
  { id: 4, name: "Chicken Wings", price: 300, img: "chicken.jpeg" },
  { id: 5, name: "Fries Box", price: 90, img: "fries.jpg" },
  { id: 6, name: "Chocolate Shake", price: 150, img: "shake.jpeg" }
];

/* -------------------------
   LocalStorage Cart Helpers
   ------------------------- */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("tastygo_cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("tastygo_cart", JSON.stringify(cart));
}

/* -------------------------
   Add / Remove / Qty
   ------------------------- */
function addToCart(id) {
  const cart = getCart();
  const dish = dishes.find(d => d.id === id);
  if (!dish) return alert("Item not found");

  const found = cart.find(x => x.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });
  }
  saveCart(cart);
  // quick feedback
  toast(`${dish.name} added to cart`);
  updateCartBadge();
}

/* Remove item at index (on cart page we use index) */
function removeFromCart(index) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  saveCart(cart);
  loadCart(); // re-render
  updateCartBadge();
}

/* Decrease quantity */
function changeQty(index, delta) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart(cart);
  loadCart();
  updateCartBadge();
}

/* -------------------------
   Page renderers (menu, cart, checkout)
   Each function checks for the DOM element before running.
   ------------------------- */
function loadMenu() {
  const container = document.getElementById("menuItems");
  if (!container) return;
  container.innerHTML = "";

  dishes.forEach(d => {
    const col = document.createElement("div");
    col.className = "item";
    col.innerHTML = `
      <img src="${d.img}" alt="${d.name}" />
      <h3>${d.name}</h3>
      <p>₹${d.price}</p>
      <div style="display:flex;gap:8px;justify-content:center">
        <button class="btn" onclick="addToCart(${d.id})">Add to Cart</button>
        <button class="btn ghost" onclick="quickView(${d.id})">View</button>
      </div>
    `;
    container.appendChild(col);
  });
}

/* small quick view - native alert for simplicity */
function quickView(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return;
  alert(`${d.name}\n\nPrice: ₹${d.price}\n\nTasty and fresh!`);
}

/* Render cart page */
function loadCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("totalPrice");
  if (!container || !totalEl) return;

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<div class="item" style="text-align:center">Your cart is empty. <a href="menu.html">Browse menu</a></div>`;
    totalEl.innerText = "Total: ₹0";
    return;
  }

  let total = 0;
  cart.forEach((it, idx) => {
    total += it.price * it.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <strong>${it.name}</strong>
        <div style="color:var(--muted);font-size:0.95rem">₹${it.price} each</div>
      </div>

      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn ghost" onclick="changeQty(${idx}, -1)">−</button>
        <div style="min-width:28px;text-align:center">${it.qty}</div>
        <button class="btn" onclick="changeQty(${idx}, 1)">+</button>
        <button class="btn ghost" onclick="removeFromCart(${idx})">Remove</button>
      </div>
    `;
    container.appendChild(row);
  });

  totalEl.innerText = "Total: ₹" + total;
}

/* Checkout summary */
function loadCheckoutSummary() {
  const summary = document.getElementById("checkoutSummary");
  if (!summary) return;
  const cart = getCart();
  if (cart.length === 0) {
    summary.innerHTML = `<div class="item">Cart is empty. <a href="menu.html">Add items</a></div>`;
    return;
  }

  let total = 0;
  summary.innerHTML = cart.map(it => {
    total += it.price * it.qty;
    return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,0.04)"><div>${it.name} × ${it.qty}</div><div>₹${it.price * it.qty}</div></div>`;
  }).join("") + `<div style="padding:10px 0;font-weight:700;display:flex;justify-content:space-between"><div>Total</div><div>₹${total}</div></div>`;
}

/* Checkout form handler */
function completeCheckout(e) {
  e.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();

  if (!name || !address || !phone) {
    return alert("Please fill all fields");
  }

  // simulate order placement
  const order = {
    id: Date.now(),
    name, address, phone,
    items: getCart(),
    placedAt: new Date().toISOString()
  };

  // save to local orders for demo purposes
  const orders = JSON.parse(localStorage.getItem("tastygo_orders") || "[]");
  orders.push(order);
  localStorage.setItem("tastygo_orders", JSON.stringify(orders));

  // clear cart
  localStorage.removeItem("tastygo_cart");
  toast("Order placed! Thanks 😊");
  // redirect to home or a 'thank you' state
  setTimeout(() => window.location.href = "index.html", 900);
}

/* Navigate to checkout; simple guard */
function gotoCheckout() {
  const cart = getCart();
  if (cart.length === 0) return alert("Your cart is empty.");
  window.location.href = "checkout.html";
}

/* -------------------------
   Tiny Auth (UI only; stores basic user in localStorage for demo)
   ------------------------- */
function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || password.length < 6) return alert("Fill valid details");

  const users = JSON.parse(localStorage.getItem("tastygo_users") || "[]");
  if (users.some(u => u.email === email)) return alert("Email already registered");

  users.push({ name, email, password });
  localStorage.setItem("tastygo_users", JSON.stringify(users));
  toast("Account created — you can login now");
  setTimeout(() => window.location.href = "login.html", 800);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("tastygo_users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return alert("Invalid credentials (demo only)");

  localStorage.setItem("tastygo_session", JSON.stringify({ email: user.email, name: user.name }));
  toast("Logged in as " + user.name);
  setTimeout(() => window.location.href = "index.html", 800);
}

/* -------------------------
   Contact form (saves messages locally)
   ------------------------- */
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !message) return alert("Please complete the form");

  const msgs = JSON.parse(localStorage.getItem("tastygo_messages") || "[]");
  msgs.push({ id: Date.now(), name, email, message, at: new Date().toISOString() });
  localStorage.setItem("tastygo_messages", JSON.stringify(msgs));
  toast("Message sent — we'll get back to you!");
  document.getElementById("contactForm").reset();
}

/* -------------------------
   UI Helpers
   ------------------------- */
function toast(text) {
  // simple unobtrusive toast
  const t = document.createElement("div");
  t.textContent = text;
  Object.assign(t.style, {
    position: "fixed",
    right: "18px",
    bottom: "18px",
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "10px",
    zIndex: 9999,
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
  });
  document.body.appendChild(t);
  setTimeout(() => t.style.opacity = "0.01", 1800);
  setTimeout(() => t.remove(), 2200);
}

/* Update small cart badge (optional enhancement - not visible but kept for future) */
function updateCartBadge() {
  // If you add a visible badge, update it here.
}

/* -------------------------
   Theme toggle: toggles class on body
   ------------------------- */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

/* -------------------------
   Page init: call appropriate functions when DOM is ready
   ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // initialize page-specific behavior
  loadMenu(); // safe — loads only if #menuItems exists
  loadCart(); // safe — loads only if #cartItems exists
  loadCheckoutSummary(); // safe — if #checkoutSummary exists

  // Attach handlers to forms if they exist
  const signupForm = document.getElementById("signupForm");
  if (signupForm) signupForm.onsubmit = handleSignup;

  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.onsubmit = handleLogin;

  const contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.onsubmit = submitContact;

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) checkoutForm.onsubmit = completeCheckout;

  updateCartBadge();
});

