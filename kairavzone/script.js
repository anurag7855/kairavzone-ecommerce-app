async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function renderProducts() {
  const products = await fetchProducts();
  const featuredProducts = document.querySelector('#featured-products .grid');
  const topSelling = document.querySelector('#top-selling .grid');

  products.forEach((product, index) => {
    const productCard = createProductCard(product);
    if (index < 4) {
      featuredProducts.appendChild(productCard);
    } else {
      topSelling.appendChild(productCard);
    }
  });
}

async function addToCart(productId) {
    const product = products.find(p => p.id === productId); // Assuming you have a products array
    if (product) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if already in cart
        } else {
            cartItems.push({ ...product, quantity: 1 }); // Add new item
        }

        localStorage.setItem('cart', JSON.stringify(cartItems)); // Save to local storage
        window.location.href = 'cart.html'; // Redirect to cart page
    }
}

// ... rest of your script.js code ...
