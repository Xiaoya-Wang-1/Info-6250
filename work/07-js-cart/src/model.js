export const products = [
  {
    id: 'jorts',
    name: 'Jorts',
    price: 0.99,
    imageUrl: 'http://placehold.co/150x150?text=Jorts',
  },
  {
    id: 'jean',
    name: 'Jean',
    price: 3.14,
    imageUrl: 'http://placehold.co/150x150?text=Jean',
  },
  {
    id: 'nyancat',
    name: 'Nyancat',
    price: 2.73,
    imageUrl: 'http://placehold.co/150x150?text=Nyancat',
  },
];

let cart = {};
let cartVisible = false;

export function getCartVisible() {
  return cartVisible;
}

export function setCartVisible(visible) {
  cartVisible = visible;
}

export function getCart() {
  return { ...cart };
}

export function addToCart(productId, quantity = 1) {
  if (!cart[productId]) {
    cart[productId] = 0;
  }
  cart[productId] += quantity;
}

export function setCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    delete cart[productId];
    return;
  }
  cart[productId] = newQty;
}

export function emptyCart() {
  cart = {};
}

export function getTotalItemsInCart() {
  const qtys = Object.values(cart);
  return qtys.reduce((sum, n) => sum + n, 0);
}