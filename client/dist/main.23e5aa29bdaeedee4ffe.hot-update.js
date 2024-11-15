"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatethestacksquad"]("main",{

/***/ "./src/animations/navbarSlide.js":
/*!***************************************!*\
  !*** ./src/animations/navbarSlide.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NavbarSlide: () => (/* binding */ NavbarSlide)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ \"./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs\");\n// components/animations/navbarSlide.js\n\n\nconst NavbarSlide = _ref => {\n  let {\n    selectedIndex\n  } = _ref;\n  const itemWidths = [33.3, 33.3, 33.3]; // Assuming there are 3 items, adjust width accordingly\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {\n    initial: {\n      width: 0,\n      left: '0%'\n    },\n    animate: {\n      width: `${itemWidths[selectedIndex]}%`,\n      left: `${selectedIndex * 33.3}%`\n    },\n    exit: {\n      width: 0\n    },\n    transition: {\n      type: 'spring',\n      stiffness: 300,\n      damping: 30\n    },\n    className: \"navbar-background\"\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYW5pbWF0aW9ucy9uYXZiYXJTbGlkZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDMEI7QUFDYTtBQUVoQyxNQUFNRSxXQUFXLEdBQUdDLElBQUEsSUFBdUI7RUFBQSxJQUF0QjtJQUFFQztFQUFjLENBQUMsR0FBQUQsSUFBQTtFQUMzQyxNQUFNRSxVQUFVLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7O0VBRXZDLG9CQUNFTCwwREFBQSxDQUFDQyxpREFBTSxDQUFDTSxHQUFHO0lBQ1RDLE9BQU8sRUFBRTtNQUFFQyxLQUFLLEVBQUUsQ0FBQztNQUFFQyxJQUFJLEVBQUU7SUFBSyxDQUFFO0lBQ2xDQyxPQUFPLEVBQUU7TUFDUEYsS0FBSyxFQUFFLEdBQUdKLFVBQVUsQ0FBQ0QsYUFBYSxDQUFDLEdBQUc7TUFDdENNLElBQUksRUFBRSxHQUFHTixhQUFhLEdBQUcsSUFBSTtJQUMvQixDQUFFO0lBQ0ZRLElBQUksRUFBRTtNQUFFSCxLQUFLLEVBQUU7SUFBRSxDQUFFO0lBQ25CSSxVQUFVLEVBQUU7TUFBRUMsSUFBSSxFQUFFLFFBQVE7TUFBRUMsU0FBUyxFQUFFLEdBQUc7TUFBRUMsT0FBTyxFQUFFO0lBQUcsQ0FBRTtJQUM1REMsU0FBUyxFQUFDO0VBQW1CLENBQzlCLENBQUM7QUFFTixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGhlc3RhY2tzcXVhZC8uL3NyYy9hbmltYXRpb25zL25hdmJhclNsaWRlLmpzPzQxNTIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29tcG9uZW50cy9hbmltYXRpb25zL25hdmJhclNsaWRlLmpzXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XHJcblxyXG5leHBvcnQgY29uc3QgTmF2YmFyU2xpZGUgPSAoeyBzZWxlY3RlZEluZGV4IH0pID0+IHtcclxuICBjb25zdCBpdGVtV2lkdGhzID0gWzMzLjMsIDMzLjMsIDMzLjNdOyAvLyBBc3N1bWluZyB0aGVyZSBhcmUgMyBpdGVtcywgYWRqdXN0IHdpZHRoIGFjY29yZGluZ2x5XHJcbiAgXHJcbiAgcmV0dXJuIChcclxuICAgIDxtb3Rpb24uZGl2XHJcbiAgICAgIGluaXRpYWw9e3sgd2lkdGg6IDAsIGxlZnQ6ICcwJScgfX1cclxuICAgICAgYW5pbWF0ZT17e1xyXG4gICAgICAgIHdpZHRoOiBgJHtpdGVtV2lkdGhzW3NlbGVjdGVkSW5kZXhdfSVgLFxyXG4gICAgICAgIGxlZnQ6IGAke3NlbGVjdGVkSW5kZXggKiAzMy4zfSVgXHJcbiAgICAgIH19XHJcbiAgICAgIGV4aXQ9e3sgd2lkdGg6IDAgfX1cclxuICAgICAgdHJhbnNpdGlvbj17eyB0eXBlOiAnc3ByaW5nJywgc3RpZmZuZXNzOiAzMDAsIGRhbXBpbmc6IDMwIH19XHJcbiAgICAgIGNsYXNzTmFtZT1cIm5hdmJhci1iYWNrZ3JvdW5kXCJcclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwibW90aW9uIiwiTmF2YmFyU2xpZGUiLCJfcmVmIiwic2VsZWN0ZWRJbmRleCIsIml0ZW1XaWR0aHMiLCJjcmVhdGVFbGVtZW50IiwiZGl2IiwiaW5pdGlhbCIsIndpZHRoIiwibGVmdCIsImFuaW1hdGUiLCJleGl0IiwidHJhbnNpdGlvbiIsInR5cGUiLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwiY2xhc3NOYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/animations/navbarSlide.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("323b5e531a038c16c7b0")
/******/ })();
/******/ 
/******/ }
);