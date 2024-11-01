let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;
let uniqueProductCount = cart.length;

function addToCart(id, name, price) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
        uniqueProductCount++;
        updateCartWidth();
    }
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartWidth() {
    const cartDropdown = document.querySelector(".cart-dropdown");
    const baseWidth = 300; 
    const widthIncrement = 100; 
    const maxWidth = 900;

    const newWidth = Math.min(baseWidth + (uniqueProductCount * widthIncrement), maxWidth);
    cartDropdown.style.width = `${newWidth}px`;
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const cartSubtotal = document.getElementById("cart-subtotal");

    cartItems.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price"> - $${(item.price * item.quantity).toFixed(2)}</span>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.innerText = total.toFixed(2);
    cartSubtotal.innerText = total.toFixed(2);

    localStorage.setItem('cart', JSON.stringify(cart));
}

function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    } else if (item && item.quantity === 1) {
        removeItem(id);
    }
}

function removeItem(id) {
    const itemIndex = cart.findIndex(product => product.id === id);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        uniqueProductCount--;
        updateCartWidth();
        updateCart();
    }
}

function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'shoppingcart.html';
}

function scrollToProducts() {
    document.getElementById("product-list").scrollIntoView({ behavior: 'smooth' });
}
function scrollToAbout() {
    document.getElementById("about").scrollIntoView({ behavior: 'smooth' });
}

updateCart();
