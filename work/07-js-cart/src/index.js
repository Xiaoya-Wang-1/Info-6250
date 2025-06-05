import {
  addToCart,
  setCartVisible,
  emptyCart,
  setCartQuantity,
  getTotalItemsInCart
} from './model.js';
import { render } from './view.js';

function main() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const pid = e.target.dataset.productId;
      addToCart(pid);
      render();
      return;
    }

    if (e.target.classList.contains('view-cart')) {
      setCartVisible(true);
      render();
      return;
    }

    if (e.target.classList.contains('hide-cart')) {
      setCartVisible(false);
      render();
      return;
    }

    if (e.target.classList.contains('checkout')) {
      const total = getTotalItemsInCart();
      console.log(`Total checkout: ${total}`);
      emptyCart();
      setCartVisible(false);
      render();
    }
  });

  document.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      e.target.dataset.oldValue = e.target.value;
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      const pid = e.target.dataset.productId;
      const oldValue = parseInt(e.target.dataset.oldValue, 10) || 0;
      let newValueStr = e.target.value.trim();

      if (newValueStr === '') {
        e.target.value = oldValue;
        return;
      }

      const newValue = parseInt(newValueStr, 10);
      if (isNaN(newValue)) {
        e.target.value = oldValue;
        return;
      }

      if (newValue === 0) {
        setCartQuantity(pid, 0);
        render();
        return;
      }

      setCartQuantity(pid, newValue);
      render();
    }
  });
  render();
}

main();