import {
  products,
  getCart,
  getCartVisible,
  getTotalItemsInCart
} from './model.js';

export function render() {
  const appEl = document.querySelector('#app');
  if (!appEl) {
    return;
  }

  const productHtml = renderProduct();

  let viewCartButtonHtml = '';
  if (!getCartVisible()) {
    const totalItems = getTotalItemsInCart();
    const itemCountText = totalItems > 0 ? ` (${totalItems})` : '';
    viewCartButtonHtml = `
      <button type="button" class="view-cart">
        View Cart${itemCountText}
      </button>
    `;
  }

  let cartHtml = '';
  if (getCartVisible()) {
    cartHtml = renderCart();
  }

  appEl.innerHTML = `
    ${productHtml}
    ${viewCartButtonHtml}
    ${cartHtml}
  `;
}

function renderProduct() {
  const listItems = products.map((p) => {
    return `
      <li class="product-item">
        <img src="${p.imageUrl}" alt="${p.name}">
        <h2>${p.name}</h2>
        <p>$${p.price.toFixed(2)}</p>
        <button
          class="add-to-cart"
          data-product-id="${p.id}"
          type="button"
        >
          Add to Cart
        </button>
      </li>
    `;
  }).join('');

  return `
    <div class="products">
      <h2>Product</h2>
      <ul class="product-list">
        ${listItems}
      </ul>
    </div>
  `;
}

function renderCart() {
  const cartObject = getCart();
  const productIds = Object.keys(cartObject);

  if (productIds.length === 0) {
    return `
      <div class="cart">
        <h2>Your Cart</h2>

        <p>Nothing in the cart</p>

        <button type="button" class="hide-cart">Hide Cart</button>
      </div>
    `;
  }

  let grandTotal = 0;
  const cartItemsHtml = productIds.map((id) => {
    const quantity = cartObject[id];
    const product = products.find((p) => p.id === id);
    const lineTotal = product.price * quantity;
    grandTotal += lineTotal;

    return `
      <li class="cart-item">
        <img
          src="http://placehold.co/50x50?text=${product.name}"
          alt="${product.name}"
        >
        <span>${product.name}</span>
        <label>
          Quantity
          <input
            class="quantity-input"
            type="number"
            min="0"
            data-product-id="${id}"
            value="${quantity}"
          >
        </label>
        <span>$${lineTotal.toFixed(2)}</span>
      </li>
    `;
  }).join('');

  return `
    <div class="cart">
      <h2>Your Cart</h2>
      <div class="notice">
        <p>You can change the number of your items.</p>
        <p>If the number of the item is 0, then the item will be remove!</p>
      </div>
      <ul class="cart-list">
        ${cartItemsHtml}
      </ul>
      <p><strong>Total: $${grandTotal.toFixed(2)}</strong></p>
      <div class ="buttons">
        <button type="button" class="hide-cart">Hide Cart</button>
        <button type="button" class="checkout">Checkout</button>
      </div>
    </div>
  `;
}
