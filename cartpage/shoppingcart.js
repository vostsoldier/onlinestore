// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = ''; // Clear current items
    total = 0; // Reset total

    // Populate items from cart
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        // Item details
        itemDiv.innerHTML = `
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <label>Quantity:</label>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    // Update subtotal and total
    cartSubtotal.innerText = total.toFixed(2);
    cartTotal.innerText = total.toFixed(2);

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update item quantity
function updateQuantity(id, newQuantity) {
    const item = cart.find(product => product.id === id);
    if (item && newQuantity > 0) {
        item.quantity = parseInt(newQuantity);
        renderCart(); // Re-render the cart with updated quantities
    }
}

// Function to remove an item from the cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart(); // Re-render the cart with the updated list
}

// Function to handle checkout process
function checkout() {
    alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}`);
    cart = []; // Clear the cart
    localStorage.removeItem('cart'); // Remove from localStorage
    renderCart();
}

// Initial rendering of the cart on page load
document.addEventListener('DOMContentLoaded', renderCart);
