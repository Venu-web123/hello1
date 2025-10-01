// Product Data
const productsData = [
  {id: 1, name: "T-Shirt", price: 25, category: "clothing", image: "images/tshirt.jpg"},
  {id: 2, name: "Hat", price: 15, category: "accessories", image: "images/hat.jpeg"},
  {id: 3, name: "Jeans", price: 30, category: "clothing", image: "images/jean.jpg"},
  {id: 4, name: "Sunglasses", price: 20, category: "accessories", image: "images/sunglasses.jpg"},
  {id: 5, name: "Jacket", price: 40, category: "clothing", image: "images/jacket.webp"},
  {id: 6, name: "Sneakers", price: 50, category: "clothing", image: "images/sneakers.jpg"},
  {id: 7, name: "Belt", price: 18, category: "accessories", image: "images/belt.jpg"},
  {id: 8, name: "Watch", price: 60, category: "accessories", image: "images/watch.jpg"},
  {id: 9, name: "Backpack", price: 35, category: "accessories", image: "images/backpack.jpg"},
  {id: 10, name: "Hoodie", price: 45, category: "clothing", image: "images/hoodie.jpg"},
];

// Gallery & Cart
const gallery = document.querySelector('.gallery');
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCart = cartModal.querySelector('.close');

// Display Products
function displayProducts(products) {
  gallery.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.dataset.id = product.id;
    div.dataset.name = product.name;
    div.dataset.price = product.price;
    div.dataset.category = product.category;
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    gallery.appendChild(div);
  });
  attachAddToCart();
}

// Add to Cart
function attachAddToCart() {
  const addButtons = document.querySelectorAll('.add-to-cart');
  addButtons.forEach(button => {
    button.addEventListener('click', e => {
      const productDiv = e.target.closest('.product');
      const id = productDiv.dataset.id;
      const name = productDiv.dataset.name;
      const price = parseFloat(productDiv.dataset.price);

      const existing = cart.find(item => item.id === id);
      if(existing) {
        existing.quantity += 1;
      } else {
        cart.push({id, name, price, quantity: 1});
      }
      updateCartDisplay();
    });
  });
}

// Update Cart Display
function updateCartDisplay() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
    cartItemsDiv.appendChild(div);
    total += item.price * item.quantity;
  });
  cartTotal.textContent = total;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Filter Products
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    const filtered = category === 'all' 
      ? productsData 
      : productsData.filter(product => product.category === category);
    displayProducts(filtered);
  });
});

// Cart Modal
document.querySelector('.cart').addEventListener('click', () => {
  cartModal.style.display = 'flex';
});
closeCart.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', e => {
  if(e.target === cartModal) cartModal.style.display = 'none';
});

// Initialize
displayProducts(productsData);
