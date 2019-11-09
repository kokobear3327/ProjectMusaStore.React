webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/CartItem.js":
/*!********************************!*\
  !*** ./components/CartItem.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_formatMoney__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/formatMoney */ "./lib/formatMoney.js");
var _jsxFileName = "/Users/Programming_Work_2/Desktop/final1109/final1109/frontend/components/CartItem.js";



 // import RemoveFromCart from './RemoveFromCart';

var CartItemStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].li.withConfig({
  displayName: "CartItem__CartItemStyles",
  componentId: "sc-1248p74-0"
})([""]);

var CartItem = function CartItem(_ref) {
  var cartItem = _ref.cartItem;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CartItemStyles, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    width: "100",
    src: cartItem.item.image,
    alt: cartItem.item.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cart-item-details",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, " "));
}; //   return (
//     <CartItemStyles>
//       <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
//       <div className="cart-item-details">
//         <h3>{cartItem.item.title}</h3>
//         <p>
//           {formatMoney(cartItem.item.price * cartItem.quantity)}
//           {' - '}
//           <em>
//             {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
//           </em>
//         </p>
//       </div>
//       <RemoveFromCart id={cartItem.id} />
//     </CartItemStyles>
//   );
// };


CartItem.propTypes = {
  cartItem: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (CartItem);

/***/ })

})
//# sourceMappingURL=_app.js.5e0bb0d455d5d52322ed.hot-update.js.map