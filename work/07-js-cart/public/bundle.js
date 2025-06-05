/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   emptyCart: () => (/* binding */ emptyCart),
/* harmony export */   getCart: () => (/* binding */ getCart),
/* harmony export */   getCartVisible: () => (/* binding */ getCartVisible),
/* harmony export */   getTotalItemsInCart: () => (/* binding */ getTotalItemsInCart),
/* harmony export */   products: () => (/* binding */ products),
/* harmony export */   setCartQuantity: () => (/* binding */ setCartQuantity),
/* harmony export */   setCartVisible: () => (/* binding */ setCartVisible)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var products = [{
  id: 'jorts',
  name: 'Jorts',
  price: 0.99,
  imageUrl: 'http://placehold.co/150x150?text=Jorts'
}, {
  id: 'jean',
  name: 'Jean',
  price: 3.14,
  imageUrl: 'http://placehold.co/150x150?text=Jean'
}, {
  id: 'nyancat',
  name: 'Nyancat',
  price: 2.73,
  imageUrl: 'http://placehold.co/150x150?text=Nyancat'
}];
var cart = {};
var cartVisible = false;
function getCartVisible() {
  return cartVisible;
}
function setCartVisible(visible) {
  cartVisible = visible;
}
function getCart() {
  return _objectSpread({}, cart);
}
function addToCart(productId) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (!cart[productId]) {
    cart[productId] = 0;
  }
  cart[productId] += quantity;
}
function setCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    delete cart[productId];
    return;
  }
  cart[productId] = newQty;
}
function emptyCart() {
  cart = {};
}
function getTotalItemsInCart() {
  var qtys = Object.values(cart);
  return qtys.reduce(function (sum, n) {
    return sum + n;
  }, 0);
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/model.js");

function render() {
  var appEl = document.querySelector('#app');
  if (!appEl) {
    return;
  }
  var productHtml = renderProduct();
  var viewCartButtonHtml = '';
  if (!(0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getCartVisible)()) {
    var totalItems = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getTotalItemsInCart)();
    var itemCountText = totalItems > 0 ? " (".concat(totalItems, ")") : '';
    viewCartButtonHtml = "\n      <button type=\"button\" class=\"view-cart\">\n        View Cart".concat(itemCountText, "\n      </button>\n    ");
  }
  var cartHtml = '';
  if ((0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getCartVisible)()) {
    cartHtml = renderCart();
  }
  appEl.innerHTML = "\n    ".concat(productHtml, "\n    ").concat(viewCartButtonHtml, "\n    ").concat(cartHtml, "\n  ");
}
function renderProduct() {
  var listItems = _model_js__WEBPACK_IMPORTED_MODULE_0__.products.map(function (p) {
    return "\n      <li class=\"product-item\">\n        <img src=\"".concat(p.imageUrl, "\" alt=\"").concat(p.name, "\">\n        <h2>").concat(p.name, "</h2>\n        <p>$").concat(p.price.toFixed(2), "</p>\n        <button\n          class=\"add-to-cart\"\n          data-product-id=\"").concat(p.id, "\"\n          type=\"button\"\n        >\n          Add to Cart\n        </button>\n      </li>\n    ");
  }).join('');
  return "\n    <div class=\"products\">\n      <h2>Product</h2>\n      <ul class=\"product-list\">\n        ".concat(listItems, "\n      </ul>\n    </div>\n  ");
}
function renderCart() {
  var cartObject = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getCart)();
  var productIds = Object.keys(cartObject);
  if (productIds.length === 0) {
    return "\n      <div class=\"cart\">\n        <h2>Your Cart</h2>\n\n        <p>Nothing in the cart</p>\n\n        <button type=\"button\" class=\"hide-cart\">Hide Cart</button>\n      </div>\n    ";
  }
  var grandTotal = 0;
  var cartItemsHtml = productIds.map(function (id) {
    var quantity = cartObject[id];
    var product = _model_js__WEBPACK_IMPORTED_MODULE_0__.products.find(function (p) {
      return p.id === id;
    });
    var lineTotal = product.price * quantity;
    grandTotal += lineTotal;
    return "\n      <li class=\"cart-item\">\n        <img\n          src=\"http://placehold.co/50x50?text=".concat(product.name, "\"\n          alt=\"").concat(product.name, "\"\n        >\n        <span>").concat(product.name, "</span>\n        <label>\n          Quantity\n          <input\n            class=\"quantity-input\"\n            type=\"number\"\n            min=\"0\"\n            data-product-id=\"").concat(id, "\"\n            value=\"").concat(quantity, "\"\n          >\n        </label>\n        <span>$").concat(lineTotal.toFixed(2), "</span>\n      </li>\n    ");
  }).join('');
  return "\n    <div class=\"cart\">\n      <h2>Your Cart</h2>\n      <div class=\"notice\">\n        <p>You can change the number of your items.</p>\n        <p>If the number of the item is 0, then the item will be remove!</p>\n      </div>\n      <ul class=\"cart-list\">\n        ".concat(cartItemsHtml, "\n      </ul>\n      <p><strong>Total: $").concat(grandTotal.toFixed(2), "</strong></p>\n      <div class =\"buttons\">\n        <button type=\"button\" class=\"hide-cart\">Hide Cart</button>\n        <button type=\"button\" class=\"checkout\">Checkout</button>\n      </div>\n    </div>\n  ");
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./src/view.js");


function main() {
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
      var pid = e.target.dataset.productId;
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.addToCart)(pid);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)();
      return;
    }
    if (e.target.classList.contains('view-cart')) {
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.setCartVisible)(true);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)();
      return;
    }
    if (e.target.classList.contains('hide-cart')) {
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.setCartVisible)(false);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)();
      return;
    }
    if (e.target.classList.contains('checkout')) {
      var total = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getTotalItemsInCart)();
      console.log("Total checkout: ".concat(total));
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.emptyCart)();
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.setCartVisible)(false);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)();
    }
  });
  document.addEventListener('focusin', function (e) {
    if (e.target.classList.contains('quantity-input')) {
      e.target.dataset.oldValue = e.target.value;
    }
  });
  document.addEventListener('focusout', function (e) {
    if (e.target.classList.contains('quantity-input')) {
      var pid = e.target.dataset.productId;
      var oldValue = parseInt(e.target.dataset.oldValue, 10) || 0;
      var newValueStr = e.target.value.trim();
      if (newValueStr === '') {
        e.target.value = oldValue;
        return;
      }
      var newValue = parseInt(newValueStr, 10);
      if (isNaN(newValue)) {
        e.target.value = oldValue;
        return;
      }
      if (newValue === 0) {
        (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.setCartQuantity)(pid, 0);
        (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)();
        return;
      }
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.setCartQuantity)(pid, newValue);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)();
    }
  });
  (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.render)();
}
main();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map