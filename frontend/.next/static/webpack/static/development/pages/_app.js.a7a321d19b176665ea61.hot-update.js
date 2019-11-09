webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/CartCount.js":
/*!*********************************!*\
  !*** ./components/CartCount.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
var _jsxFileName = "/Users/Programming_Work_2/Desktop/SCartPics/final1109/frontend/components/CartCount.js";



 // React transition group is how you do these animations for the cart counting
//   You gotta do backspace-visibility else it looks janky.
//   classNames 🙋‍excuse me?  So it gives you lots of class names beginning with count, just go with it...

var AnimationStyles = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].span.withConfig({
  displayName: "CartCount__AnimationStyles",
  componentId: "vhex7l-0"
})(["position:relative;.count{display:block;position:relative;transition:all 0.7s;backface-visibility:hidden;}.count-enter{transform:scale(5) rotateX(0.9turn);}.count-enter-active{transform:rotateX(0);}.count-exit{top:0;position:absolute;transform:rotateX(0);}.count-exit-active{transform:scale(4) rotateX(0.5turn);}"]); //  So these make sure the width of the number representing items in cart is same:
//   font-feature-settings: 'tnum';   
//   font-variant-numeric: tabular-nums;

var Dot = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "CartCount__Dot",
  componentId: "vhex7l-1"
})(["background:", ";color:white;border-radius:50%;padding:0.5rem;line-height:2rem;min-width:3rem;margin-left:1rem;font-weight:100;font-feature-settings:'tnum';font-variant-numeric:tabular-nums;"], function (props) {
  return props.theme.blue;
});

var CartCount = function CartCount(_ref) {
  var count = _ref.count;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AnimationStyles, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["TransitionGroup"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["CSSTransition"], {
    unmountOnExit: true,
    className: "count",
    classNames: "count",
    key: count,
    timeout: {
      enter: 550,
      exit: 550
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dot, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, count))));
};

CartCount.propTypes = {
  count: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (CartCount);

/***/ })

})
//# sourceMappingURL=_app.js.a7a321d19b176665ea61.hot-update.js.map