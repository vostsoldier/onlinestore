let cart = [];
let total = 0;

function addToCart(id, name, price) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
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
        li.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.innerText = total.toFixed(2);
    cartSubtotal.innerText = total.toFixed(2);
}

function checkout() {
    alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}`);
    cart = [];
    updateCart();
}

function scrollToProducts() {
    document.getElementById("product-list").scrollIntoView({ behavior: 'smooth' });
}
