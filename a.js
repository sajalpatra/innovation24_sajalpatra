// app.js

const foodItemsData = [
    { id: 1, name: 'Margherita Pizza', category: 'pizza', price: 12, image: 'pizza.jpg' },
    { id: 2, name: 'Cheese Burger', category: 'burger', price: 8, image: 'burger.jpg' },
    { id: 3, name: 'Spaghetti Carbonara', category: 'pasta', price: 15, image: 'pasta.jpg' },
    { id: 4, name: 'Chocolate Cake', category: 'dessert', price: 6, image: 'dessert.jpg' },
    { id: 5, name: 'Pepperoni Pizza', category: 'pizza', price: 14, image: 'pizza.jpg' },
    { id: 6, name: 'Veggie Burger', category: 'burger', price: 9, image: 'burger.jpg' },
];

let cart = [];

// Load food items
const foodItemsContainer = document.getElementById('foodItems');

function loadFoodItems() {
    foodItemsContainer.innerHTML = '';
    foodItemsData.forEach((item) => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        foodItemsContainer.appendChild(foodItem);
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = foodItemsData.find(food => food.id === itemId);
    cart.push(item);
    updateCart();
}

// Update cart
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalContainer = document.getElementById('cartTotal');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item) => {
        cartItemsContainer.innerHTML += `<p>${item.name} - $${item.price}</p>`;
        total += item.price;
    });
    cartTotalContainer.innerHTML = `Total: $${total}`;
}

// Search functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const filteredItems = foodItemsData.filter(item => item.name.toLowerCase().includes(query));
    displayFilteredItems(filteredItems);
});

function displayFilteredItems(items) {
    foodItemsContainer.innerHTML = '';
    items.forEach(item => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        foodItemsContainer.appendChild(foodItem);
    });
}

// Filter by category
const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', function () {
    const category = categoryFilter.value;
    if (category === 'all') {
        loadFoodItems();
    } else {
        const filteredItems = foodItemsData.filter(item => item.category === category);
        displayFilteredItems(filteredItems);
    }
});

// Filter by price
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');

priceFilter.addEventListener('input', function () {
    const price = priceFilter.value;
    priceValue.innerHTML = `$${price}`;
    const filteredItems = foodItemsData.filter(item => item.price <= price);
    displayFilteredItems(filteredItems);
});

// Load food items on page load
