/*!
 * TOAST UI Editor : UML Plugin
 * @version 3.0.1 | Fri Jan 13 2023
 * @author NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("plantuml-encoder"));
	else if(typeof define === 'function' && define.amd)
		define(["plantuml-encoder"], factory);
	else if(typeof exports === 'object')
		exports["toastui"] = factory(require("plantuml-encoder"));
	else
		root["toastui"] = root["toastui"] || {}, root["toastui"]["Editor"] = root["toastui"]["Editor"] || {}, root["toastui"]["Editor"]["plugin"] = root["toastui"]["Editor"]["plugin"] || {}, root["toastui"]["Editor"]["plugin"]["uml"] = factory(root["plantuml-encoder"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__855__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 855:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__855__;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ umlPlugin; }
/* harmony export */ });
/* harmony import */ var plantuml_encoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(855);
/* harmony import */ var plantuml_encoder__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plantuml_encoder__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @fileoverview Implements uml plugin
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

var DEFAULT_RENDERER_URL = '//www.plantuml.com/plantuml/png/';
function createUMLTokens(text, rendererURL) {
    var renderedHTML;
    try {
        if (!(plantuml_encoder__WEBPACK_IMPORTED_MODULE_0___default())) {
            throw new Error('plantuml-encoder dependency required');
        }
        renderedHTML = "<img src=\"" + rendererURL + plantuml_encoder__WEBPACK_IMPORTED_MODULE_0___default().encode(text) + "\" />";
    }
    catch (err) {
        renderedHTML = "Error occurred on encoding uml: " + err.message;
    }
    return [
        { type: 'openTag', tagName: 'div', outerNewLine: true },
        { type: 'html', content: renderedHTML },
        { type: 'closeTag', tagName: 'div', outerNewLine: true },
    ];
}
/**
 * UML plugin
 * @param {Object} context - plugin context for communicating with editor
 * @param {Object} options - options for plugin
 * @param {string} [options.rendererURL] - url of plant uml renderer
 */
function umlPlugin(_, options) {
    if (options === void 0) { options = {}; }
    var _a = options.rendererURL, rendererURL = _a === void 0 ? DEFAULT_RENDERER_URL : _a;
    return {
        toHTMLRenderers: {
            uml: function (node) {
                return createUMLTokens(node.literal, rendererURL);
            },
            plantUml: function (node) {
                return createUMLTokens(node.literal, rendererURL);
            },
        },
    };
}

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});