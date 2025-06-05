/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addListeners: () => (/* binding */ addListeners),
/* harmony export */   checkForSession: () => (/* binding */ checkForSession)
/* harmony export */ });
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model.js */ "./src/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ "./src/view.js");



function addListeners() {
  var app = document.getElementById('app');
  app.addEventListener('click', function (e) {
    if (e.target.id === 'logout') {
      handleLogout();
      return;
    }
  });
  app.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.id === 'login-form') {
      var username = e.target.elements.username.value.trim();
      handleLogin(username);
      return;
    }
    if (e.target.id === 'word-form') {
      var word = e.target.elements.word.value;
      handleWordUpdate(word);
      return;
    }
  });
}
function handleLogin(username) {
  (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.clearError)();
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (data) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.login)(data.username);
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchWord)();
  }).then(function (data) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.setStoredWord)(data.storedWord);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  })["catch"](function (err) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  });
}
function handleLogout() {
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  })["catch"](function (err) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  });
}
function handleWordUpdate(newWord) {
  (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.clearError)();
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.updateWord)(newWord).then(function (data) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.setStoredWord)(data.storedWord);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  })["catch"](function (err) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  });
}
function checkForSession() {
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (data) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.login)(data.username);
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchWord)();
  }).then(function (data) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.setStoredWord)(data.storedWord);
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  })["catch"](function (err) {
    if (err.error && err.error !== 'auth-missing') {
      (0,_model_js__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
    }
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  });
}

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearError: () => (/* binding */ clearError),
/* harmony export */   getState: () => (/* binding */ getState),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setStoredWord: () => (/* binding */ setStoredWord)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var state = {
  isLoggedIn: false,
  username: '',
  storedWord: '',
  error: ''
};
function getState() {
  return _objectSpread({}, state);
}
function setError(message) {
  state.error = message;
}
function clearError() {
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.username = '';
  state.storedWord = '';
  state.error = '';
}
function setStoredWord(word) {
  state.storedWord = word;
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord),
/* harmony export */   updateWord: () => (/* binding */ updateWord)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },
    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord() {
  return fetch('/api/word')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function updateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
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
  var app = document.getElementById('app');
  var state = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getState)();
  if (!state.isLoggedIn) {
    app.innerHTML = getLoginPage(state);
    return;
  }
  app.innerHTML = getWordPage(state);
}
function getLoginPage(state) {
  var errorMessage = state.error ? "<div class=\"error\">".concat(makeError(state.error), "</div>") : '';
  return "\n    <header>\n      <h1>Login to Word App</h1>\n    </header>\n    <main>\n      <form id=\"login-form\">\n        <div>\n          <label for=\"username\">Enter username:</label>\n          <input id=\"username\" name=\"username\" />\n        </div>\n        <button type=\"submit\">Login</button>\n      </form>\n      ".concat(errorMessage, "\n    </main>\n  ");
}
function getWordPage(state) {
  var errorMessage = state.error ? "<div class=\"error\">".concat(makeError(state.error), "</div>") : '';
  return "\n    <header class=\"top-bar\">\n      <div>Welcome, <strong>".concat(state.username, "</strong></div>\n      <h1>Word App</h1>\n      <button id=\"logout\">Logout</button>\n    </header>\n\n    <main>\n      ").concat(errorMessage, "\n      <div class=\"word-view\">\n        <h2>Your Stored Word</h2>\n        <div class=\"displayed-word\">\n          Current word: <strong>").concat(state.storedWord, "</strong>\n\n          <form id=\"word-form\">\n            <div>\n              <label for=\"word-input\">Update word:</label>\n              <input \n                id=\"word-input\" \n                name=\"word\" \n                value=\"").concat(state.storedWord, "\" \n              />\n            </div>\n            <button class=\"submit-button\" type=\"submit\">Update</button>\n          </form>\n        </div>\n      </div>\n    </main>\n  ");
}
function makeError(error) {
  switch (error) {
    case 'auth-insufficient':
      return 'Incorrect password (Dog not allowed!)';
    case 'required-username':
      return 'Please enter a valid username (alphanumeric only)';
    case 'network-error':
      return 'Network error, please try again';
    case 'auth-missing':
      return 'You must be logged in';
    default:
      return error;
  }
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
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.js */ "./src/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller.js */ "./src/controller.js");


(0,_controller_js__WEBPACK_IMPORTED_MODULE_1__.addListeners)();
(0,_controller_js__WEBPACK_IMPORTED_MODULE_1__.checkForSession)();
(0,_view_js__WEBPACK_IMPORTED_MODULE_0__.render)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map