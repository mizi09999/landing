/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuButton.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   SHOPPING CART
========================= */

let cart = [];

const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


/* Product prices */

const prices = {

    "VOLT X1 Runner": 129,
    "VOLT Force Pack": 89,
    "VOLT Pro Ball": 59,
    "VOLT Aqua Pro": 75

};


/* Add product */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const product = button.dataset.product;

        cart.push(product);

        updateCart();

        showToast(`${product} added to your cart!`);

    });

});


/* Update cart */

function updateCart() {

    cartCount.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "$0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((product, index) => {

        total += prices[product];

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <span>${product}</span>

            <strong>
                $${prices[product]}
            </strong>
        `;

        cartItems.appendChild(item);

    });


    cartTotal.textContent = `$${total}`;

}


/* Open cart */

cartButton.addEventListener("click", () => {

    cartModal.classList.add("active");

});


/* Close cart */

closeCart.addEventListener("click", () => {

    cartModal.classList.remove("active");

});


/* Close when clicking outside */

cartModal.addEventListener("click", (event) => {

    if (event.target === cartModal) {

        cartModal.classList.remove("active");

    }

});


/* =========================
   CHECKOUT
========================= */

document.getElementById("checkoutButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty.");

            return;

        }

        showToast("Checkout feature coming soon!");

    });


/* =========================
   TOAST MESSAGE
========================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
    document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    if (email) {

        showToast("Welcome to the VOLT movement!");

        newsletterForm.reset();

    }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".product-card, .sport-card, .about-content"
    );


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});