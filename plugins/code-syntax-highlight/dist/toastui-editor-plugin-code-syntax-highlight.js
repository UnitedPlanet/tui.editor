/*!
 * TOAST UI Editor : Code Syntax Highlight Plugin
 * @version 3.1.0 | Fri Jan 13 2023
 * @author NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 928:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable complexity */
/**
 * @fileoverview Returns the first index at which a given element can be found in the array.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(322);

/**
 * @module array
 */

/**
 * Returns the first index at which a given element can be found in the array
 * from start index(default 0), or -1 if it is not present.
 * It compares searchElement to elements of the Array using strict equality
 * (the same method used by the ===, or triple-equals, operator).
 * @param {*} searchElement Element to locate in the array
 * @param {Array} array Array that will be traversed.
 * @param {number} startIndex Start index in array for searching (default 0)
 * @returns {number} the First index at which a given element, or -1 if it is not present
 * @memberof module:array
 * @example
 * // ES6
 * import inArray from 'tui-code-snippet/array/inArray';
 * 
 * // CommonJS
 * const inArray = require('tui-code-snippet/array/inArray');
 *
 * const arr = ['one', 'two', 'three', 'four'];
 * const idx1 = inArray('one', arr, 3); // -1
 * const idx2 = inArray('one', arr); // 0
 */
function inArray(searchElement, array, startIndex) {
  var i;
  var length;
  startIndex = startIndex || 0;

  if (!isArray(array)) {
    return -1;
  }

  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf.call(array, searchElement, startIndex);
  }

  length = array.length;
  for (i = startIndex; startIndex >= 0 && i < length; i += 1) {
    if (array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}

module.exports = inArray;


/***/ }),

/***/ 690:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Execute the provided callback once for each property of object(or element of array) which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(322);
var forEachArray = __webpack_require__(893);
var forEachOwnProperties = __webpack_require__(956);

/**
 * @module collection
 */

/**
 * Execute the provided callback once for each property of object(or element of array) which actually exist.
 * If the object is Array-like object(ex-arguments object), It needs to transform to Array.(see 'ex2' of example).
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property(or The value of the element)
 *  2) The name of the property(or The index of the element)
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * // ES6
 * import forEach from 'tui-code-snippet/collection/forEach'; 
 * 
 * // CommonJS
 * const forEach = require('tui-code-snippet/collection/forEach'); 
 *
 * let sum = 0;
 *
 * forEach([1,2,3], function(value){
 *   sum += value;
 * });
 * alert(sum); // 6
 *
 * // In case of Array-like object
 * const array = Array.prototype.slice.call(arrayLike); // change to array
 * forEach(array, function(value){
 *   sum += value;
 * });
 */
function forEach(obj, iteratee, context) {
  if (isArray(obj)) {
    forEachArray(obj, iteratee, context);
  } else {
    forEachOwnProperties(obj, iteratee, context);
  }
}

module.exports = forEach;


/***/ }),

/***/ 893:
/***/ (function(module) {

/**
 * @fileoverview Execute the provided callback once for each element present in the array(or Array-like object) in ascending order.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each element present
 * in the array(or Array-like object) in ascending order.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the element
 *  2) The index of the element
 *  3) The array(or Array-like object) being traversed
 * @param {Array|Arguments|NodeList} arr The array(or Array-like object) that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * // ES6
 * import forEachArray from 'tui-code-snippet/collection/forEachArray';
 * 
 * // CommonJS
 * const forEachArray = require('tui-code-snippet/collection/forEachArray'); 
 *
 * let sum = 0;
 *
 * forEachArray([1,2,3], function(value){
 *   sum += value;
 * });
 * alert(sum); // 6
 */
function forEachArray(arr, iteratee, context) {
  var index = 0;
  var len = arr.length;

  context = context || null;

  for (; index < len; index += 1) {
    if (iteratee.call(context, arr[index], index, arr) === false) {
      break;
    }
  }
}

module.exports = forEachArray;


/***/ }),

/***/ 956:
/***/ (function(module) {

/**
 * @fileoverview Execute the provided callback once for each property of object which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each property of object which actually exist.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property
 *  2) The name of the property
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee  Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * // ES6
 * import forEachOwnProperties from 'tui-code-snippet/collection/forEachOwnProperties';
 * 
 * // CommonJS
 * const forEachOwnProperties = require('tui-code-snippet/collection/forEachOwnProperties'); 
 *
 * let sum = 0;
 *
 * forEachOwnProperties({a:1,b:2,c:3}, function(value){
 *   sum += value;
 * });
 * alert(sum); // 6
 */
function forEachOwnProperties(obj, iteratee, context) {
  var key;

  context = context || null;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (iteratee.call(context, obj[key], key, obj) === false) {
        break;
      }
    }
  }
}

module.exports = forEachOwnProperties;


/***/ }),

/***/ 990:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Transform the Array-like object to Array.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(893);

/**
 * Transform the Array-like object to Array.
 * In low IE (below 8), Array.prototype.slice.call is not perfect. So, try-catch statement is used.
 * @param {*} arrayLike Array-like object
 * @returns {Array} Array
 * @memberof module:collection
 * @example
 * // ES6
 * import toArray from 'tui-code-snippet/collection/toArray'; 
 * 
 * // CommonJS
 * const toArray = require('tui-code-snippet/collection/toArray'); 
 *
 * const arrayLike = {
 *   0: 'one',
 *   1: 'two',
 *   2: 'three',
 *   3: 'four',
 *   length: 4
 * };
 * const result = toArray(arrayLike);
 *
 * alert(result instanceof Array); // true
 * alert(result); // one,two,three,four
 */
function toArray(arrayLike) {
  var arr;
  try {
    arr = Array.prototype.slice.call(arrayLike);
  } catch (e) {
    arr = [];
    forEachArray(arrayLike, function(value) {
      arr.push(value);
    });
  }

  return arr;
}

module.exports = toArray;


/***/ }),

/***/ 24:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Set className value
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(322);
var isUndefined = __webpack_require__(929);

/**
 * Set className value
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {(string|string[])} cssClass - class names
 * @private
 */
function setClassName(element, cssClass) {
  cssClass = isArray(cssClass) ? cssClass.join(' ') : cssClass;

  cssClass = cssClass.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  if (isUndefined(element.className.baseVal)) {
    element.className = cssClass;

    return;
  }

  element.className.baseVal = cssClass;
}

module.exports = setClassName;


/***/ }),

/***/ 204:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Add css class to element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEach = __webpack_require__(690);
var inArray = __webpack_require__(928);
var getClass = __webpack_require__(902);
var setClassName = __webpack_require__(24);

/**
 * domUtil module
 * @module domUtil
 */

/**
 * Add css class to element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to add
 * @memberof module:domUtil
 */
function addClass(element) {
  var cssClass = Array.prototype.slice.call(arguments, 1);
  var classList = element.classList;
  var newClass = [];
  var origin;

  if (classList) {
    forEach(cssClass, function(name) {
      element.classList.add(name);
    });

    return;
  }

  origin = getClass(element);

  if (origin) {
    cssClass = [].concat(origin.split(/\s+/), cssClass);
  }

  forEach(cssClass, function(cls) {
    if (inArray(cls, newClass) < 0) {
      newClass.push(cls);
    }
  });

  setClassName(element, newClass);
}

module.exports = addClass;


/***/ }),

/***/ 522:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Setting element style
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isString = __webpack_require__(758);
var forEach = __webpack_require__(690);

/**
 * Setting element style
 * @param {(HTMLElement|SVGElement)} element - element to setting style
 * @param {(string|object)} key - style prop name or {prop: value} pair object
 * @param {string} [value] - style value
 * @memberof module:domUtil
 */
function css(element, key, value) {
  var style = element.style;

  if (isString(key)) {
    style[key] = value;

    return;
  }

  forEach(key, function(v, k) {
    style[k] = v;
  });
}

module.exports = css;


/***/ }),

/***/ 902:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Get HTML element's design classes.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(929);

/**
 * Get HTML element's design classes.
 * @param {(HTMLElement|SVGElement)} element target element
 * @returns {string} element css class name
 * @memberof module:domUtil
 */
function getClass(element) {
  if (!element || !element.className) {
    return '';
  }

  if (isUndefined(element.className.baseVal)) {
    return element.className;
  }

  return element.className.baseVal;
}

module.exports = getClass;


/***/ }),

/***/ 714:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Check element has specific css class
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(928);
var getClass = __webpack_require__(902);

/**
 * Check element has specific css class
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {string} cssClass - css class
 * @returns {boolean}
 * @memberof module:domUtil
 */
function hasClass(element, cssClass) {
  var origin;

  if (element.classList) {
    return element.classList.contains(cssClass);
  }

  origin = getClass(element).split(/\s+/);

  return inArray(cssClass, origin) > -1;
}

module.exports = hasClass;


/***/ }),

/***/ 462:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @fileoverview Remove css class from element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(893);
var inArray = __webpack_require__(928);
var getClass = __webpack_require__(902);
var setClassName = __webpack_require__(24);

/**
 * Remove css class from element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to remove
 * @memberof module:domUtil
 */
function removeClass(element) {
  var cssClass = Array.prototype.slice.call(arguments, 1);
  var classList = element.classList;
  var origin, newClass;

  if (classList) {
    forEachArray(cssClass, function(name) {
      classList.remove(name);
    });

    return;
  }

  origin = getClass(element).split(/\s+/);
  newClass = [];
  forEachArray(origin, function(name) {
    if (inArray(name, cssClass) < 0) {
      newClass.push(name);
    }
  });

  setClassName(element, newClass);
}

module.exports = removeClass;


/***/ }),

/***/ 322:
/***/ (function(module) {

/**
 * @fileoverview Check whether the given variable is an instance of Array or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is an instance of Array or not.
 * If the given variable is an instance of Array, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is array instance?
 * @memberof module:type
 */
function isArray(obj) {
  return obj instanceof Array;
}

module.exports = isArray;


/***/ }),

/***/ 294:
/***/ (function(module) {

/**
 * @fileoverview Check whether the given variable is a function or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a function or not.
 * If the given variable is a function, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is function?
 * @memberof module:type
 */
function isFunction(obj) {
  return obj instanceof Function;
}

module.exports = isFunction;


/***/ }),

/***/ 758:
/***/ (function(module) {

/**
 * @fileoverview Check whether the given variable is a string or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a string or not.
 * If the given variable is a string, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is string?
 * @memberof module:type
 */
function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

module.exports = isString;


/***/ }),

/***/ 929:
/***/ (function(module) {

/**
 * @fileoverview Check whether the given variable is undefined or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is undefined or not.
 * If the given variable is undefined, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is undefined?
 * @memberof module:type
 */
function isUndefined(obj) {
  return obj === undefined; // eslint-disable-line no-undefined
}

module.exports = isUndefined;


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

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src; }
});

// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isFunction.js
var isFunction = __webpack_require__(294);
var isFunction_default = /*#__PURE__*/__webpack_require__.n(isFunction);
;// CONCATENATED MODULE: ./src/renderers/toHTMLRenderers.ts
var BACKTICK_COUNT = 3;
function getHTMLRenderers(prism) {
    return {
        codeBlock: function (node) {
            var _a = node, fenceLength = _a.fenceLength, info = _a.info;
            var infoWords = info ? info.split(/\s+/) : [];
            var preClasses = [];
            var codeAttrs = {};
            if (fenceLength > BACKTICK_COUNT) {
                codeAttrs['data-backticks'] = fenceLength;
            }
            var content = node.literal;
            if (infoWords.length && infoWords[0].length) {
                var lang = infoWords[0];
                preClasses.push("lang-" + lang);
                codeAttrs['data-language'] = lang;
                var registeredLang = prism.languages[lang];
                if (registeredLang) {
                    content = prism.highlight(node.literal, registeredLang, lang);
                }
            }
            return [
                { type: 'openTag', tagName: 'pre', classNames: preClasses },
                { type: 'openTag', tagName: 'code', attributes: codeAttrs },
                { type: 'html', content: content },
                { type: 'closeTag', tagName: 'code' },
                { type: 'closeTag', tagName: 'pre' },
            ];
        },
    };
}

// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isString.js
var isString = __webpack_require__(758);
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);
;// CONCATENATED MODULE: ./src/utils/common.ts
function flatten(arr) {
    return arr.reduce(function (a, b) { return a.concat(Array.isArray(b) ? flatten(b) : b); }, []);
}

;// CONCATENATED MODULE: ./src/plugins/codeSyntaxHighlighting.ts
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};


var NODE_TYPE = 'codeBlock';
function findCodeBlocks(doc) {
    var descendants = [];
    doc.descendants(function (node, pos) {
        if (node.isBlock && node.type.name === NODE_TYPE) {
            descendants.push({ node: node, pos: pos });
        }
    });
    return descendants;
}
function parseTokens(tokens, classNames) {
    if (classNames === void 0) { classNames = []; }
    if (isString_default()(tokens)) {
        return [{ text: tokens, classes: classNames }];
    }
    return tokens.map(function (token) {
        var _a = token, type = _a.type, alias = _a.alias;
        var typeClassNames = [];
        var aliasClassNames = [];
        if (type) {
            typeClassNames = ['token', type];
        }
        if (alias) {
            aliasClassNames = isString_default()(alias) ? [alias] : alias;
        }
        var classes = __spreadArray(__spreadArray(__spreadArray([], classNames), typeClassNames), aliasClassNames);
        return isString_default()(token)
            ? {
                text: token,
                classes: classes,
            }
            : parseTokens(token.content, classes);
    });
}
function getDecorations(doc, context, prism) {
    var pmView = context.pmView;
    var decorations = [];
    var codeBlocks = findCodeBlocks(doc);
    codeBlocks.forEach(function (_a) {
        var pos = _a.pos, node = _a.node;
        var language = node.attrs.language;
        var registeredLang = prism.languages[language];
        var prismTokens = registeredLang ? prism.tokenize(node.textContent, registeredLang) : [];
        var nodeInfos = flatten(parseTokens(prismTokens));
        var startPos = pos + 1;
        nodeInfos.forEach(function (_a) {
            var text = _a.text, classes = _a.classes;
            var from = startPos;
            var to = from + text.length;
            startPos = to;
            var classNames = classes.join(' ');
            var decoration = pmView.Decoration.inline(from, to, {
                class: classNames,
            });
            if (classNames.length) {
                decorations.push(decoration);
            }
        });
    });
    return pmView.DecorationSet.create(doc, decorations);
}
function codeSyntaxHighlighting(context, prism) {
    return new context.pmState.Plugin({
        state: {
            init: function (_, _a) {
                var doc = _a.doc;
                return getDecorations(doc, context, prism);
            },
            apply: function (tr, set) {
                if (!tr.docChanged) {
                    return set.map(tr.mapping, tr.doc);
                }
                return getDecorations(tr.doc, context, prism);
            },
        },
        props: {
            decorations: function (state) {
                return this.getState(state);
            },
        },
    });
}

// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/domUtil/addClass.js
var addClass = __webpack_require__(204);
var addClass_default = /*#__PURE__*/__webpack_require__.n(addClass);
;// CONCATENATED MODULE: ./src/utils/dom.ts
function stringToNumber(value) {
    return parseInt(value, 10);
}
function isPositionInBox(style, offsetX, offsetY) {
    var left = stringToNumber(style.left);
    var top = stringToNumber(style.top);
    var width = stringToNumber(style.width) +
        stringToNumber(style.paddingLeft) +
        stringToNumber(style.paddingRight);
    var height = stringToNumber(style.height) +
        stringToNumber(style.paddingTop) +
        stringToNumber(style.paddingBottom);
    return offsetX >= left && offsetX <= left + width && offsetY >= top && offsetY <= top + height;
}
function removeNode(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
var CLS_PREFIX = 'toastui-editor-';
function cls() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    return names.map(function (className) { return "" + CLS_PREFIX + className; }).join(' ');
}

// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/domUtil/css.js
var css = __webpack_require__(522);
var css_default = /*#__PURE__*/__webpack_require__.n(css);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/domUtil/removeClass.js
var removeClass = __webpack_require__(462);
var removeClass_default = /*#__PURE__*/__webpack_require__.n(removeClass);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/domUtil/hasClass.js
var hasClass = __webpack_require__(714);
var hasClass_default = /*#__PURE__*/__webpack_require__.n(hasClass);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/collection/toArray.js
var toArray = __webpack_require__(990);
var toArray_default = /*#__PURE__*/__webpack_require__.n(toArray);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/array/inArray.js
var inArray = __webpack_require__(928);
var inArray_default = /*#__PURE__*/__webpack_require__.n(inArray);
;// CONCATENATED MODULE: ./src/nodeViews/languageSelectBox.ts







var WRAPPER_CLASS_NAME = 'code-block-language';
var INPUT_CLASS_NANE = 'code-block-language-input';
var LIST_CLASS_NAME = 'code-block-language-list';
var LANG_ATTR = 'data-language';
var CODE_BLOCK_PADDING = 10;
function getButtonsHTML(languages) {
    return languages
        .map(function (language) { return "<button type=\"button\" data-language=\"" + language + "\">" + language + "</button>"; })
        .join('');
}
var LanguageSelectBox = /** @class */ (function () {
    function LanguageSelectBox(rootEl, eventEmitter, languages) {
        var _this = this;
        this.buttons = [];
        this.prevStoredLanguage = '';
        this.onSelectToggleButton = function (ev) {
            var target = ev.target;
            var style = getComputedStyle(target, ':after');
            var offsetX = ev.offsetX, offsetY = ev.offsetY;
            if (isPositionInBox(style, offsetX, offsetY)) {
                ev.preventDefault();
                _this.toggleFocus();
            }
        };
        this.onSelectLanguageButtons = function (ev) {
            var target = ev.target;
            var language = target.getAttribute(LANG_ATTR);
            if (language) {
                _this.selectLanguage(language);
            }
        };
        this.handleKeydown = function (ev) {
            var key = ev.key;
            if (key === 'ArrowUp') {
                _this.selectPrevLanguage();
                ev.preventDefault();
            }
            else if (key === 'ArrowDown') {
                _this.selectNextLanguage();
                ev.preventDefault();
            }
            else if (key === 'Enter' || key === 'Tab') {
                _this.storeInputLanguage();
                ev.preventDefault();
            }
            else {
                _this.hideList();
            }
        };
        this.showLangugaeSelectBox = function (_a, language) {
            var top = _a.top, right = _a.right;
            if (language) {
                _this.setLanguage(language);
            }
            _this.show();
            var width = _this.input.parentElement.getBoundingClientRect().width;
            css_default()(_this.wrapper, {
                top: top + CODE_BLOCK_PADDING + "px",
                left: right - width - CODE_BLOCK_PADDING + "px",
            });
            _this.toggleFocus();
        };
        this.rootEl = rootEl;
        this.eventEmitter = eventEmitter;
        this.languages = languages;
        this.createElement();
        this.bindDOMEvent();
        this.bindEvent();
    }
    LanguageSelectBox.prototype.createElement = function () {
        this.wrapper = document.createElement('div');
        addClass_default()(this.wrapper, cls(WRAPPER_CLASS_NAME));
        this.createInputElement();
        this.createLanguageListElement();
        this.rootEl.appendChild(this.wrapper);
        this.hide();
    };
    LanguageSelectBox.prototype.createInputElement = function () {
        var wrapper = document.createElement('span');
        addClass_default()(wrapper, cls(INPUT_CLASS_NANE));
        var input = document.createElement('input');
        input.type = 'text';
        input.setAttribute('maxlength', '20');
        this.input = input;
        wrapper.appendChild(this.input);
        this.wrapper.appendChild(wrapper);
    };
    LanguageSelectBox.prototype.createLanguageListElement = function () {
        this.list = document.createElement('div');
        addClass_default()(this.list, cls(LIST_CLASS_NAME));
        var buttonsContainer = document.createElement('div');
        addClass_default()(buttonsContainer, 'buttons');
        buttonsContainer.innerHTML = getButtonsHTML(this.languages);
        this.buttons = toArray_default()(buttonsContainer.children);
        this.list.appendChild(buttonsContainer);
        this.wrapper.appendChild(this.list);
        this.activateButtonByIndex(0);
        this.hideList();
    };
    LanguageSelectBox.prototype.bindDOMEvent = function () {
        var _this = this;
        this.wrapper.addEventListener('mousedown', this.onSelectToggleButton);
        this.input.addEventListener('keydown', this.handleKeydown);
        this.input.addEventListener('focus', function () { return _this.activateSelectBox(); });
        this.input.addEventListener('blur', function () { return _this.inactivateSelectBox(); });
        this.list.addEventListener('mousedown', this.onSelectLanguageButtons);
    };
    LanguageSelectBox.prototype.bindEvent = function () {
        this.eventEmitter.listen('showCodeBlockLanguages', this.showLangugaeSelectBox);
    };
    LanguageSelectBox.prototype.activateSelectBox = function () {
        addClass_default()(this.wrapper, 'active');
        css_default()(this.list, { display: 'block' });
    };
    LanguageSelectBox.prototype.inactivateSelectBox = function () {
        this.input.value = this.prevStoredLanguage;
        removeClass_default()(this.wrapper, 'active');
        this.hideList();
    };
    LanguageSelectBox.prototype.toggleFocus = function () {
        if (hasClass_default()(this.wrapper, 'active')) {
            this.input.blur();
        }
        else {
            this.input.focus();
        }
    };
    LanguageSelectBox.prototype.storeInputLanguage = function () {
        var selectedLanguage = this.input.value;
        this.setLanguage(selectedLanguage);
        this.hideList();
        this.eventEmitter.emit('selectLanguage', selectedLanguage);
    };
    LanguageSelectBox.prototype.activateButtonByIndex = function (index) {
        if (this.currentButton) {
            removeClass_default()(this.currentButton, 'active');
        }
        if (this.buttons.length) {
            this.currentButton = this.buttons[index];
            this.input.value = this.currentButton.getAttribute(LANG_ATTR);
            addClass_default()(this.currentButton, 'active');
            this.currentButton.scrollIntoView();
        }
    };
    LanguageSelectBox.prototype.selectLanguage = function (selectedLanguage) {
        this.input.value = selectedLanguage;
        this.storeInputLanguage();
    };
    LanguageSelectBox.prototype.selectPrevLanguage = function () {
        var index = inArray_default()(this.currentButton, this.buttons) - 1;
        if (index < 0) {
            index = this.buttons.length - 1;
        }
        this.activateButtonByIndex(index);
    };
    LanguageSelectBox.prototype.selectNextLanguage = function () {
        var index = inArray_default()(this.currentButton, this.buttons) + 1;
        if (index >= this.buttons.length) {
            index = 0;
        }
        this.activateButtonByIndex(index);
    };
    LanguageSelectBox.prototype.hideList = function () {
        css_default()(this.list, { display: 'none' });
    };
    LanguageSelectBox.prototype.show = function () {
        css_default()(this.wrapper, { display: 'inline-block' });
    };
    LanguageSelectBox.prototype.hide = function () {
        css_default()(this.wrapper, { display: 'none' });
    };
    LanguageSelectBox.prototype.setLanguage = function (language) {
        this.prevStoredLanguage = language;
        this.input.value = language;
        var item = this.buttons.filter(function (button) { return button.getAttribute(LANG_ATTR) === language; });
        if (item.length) {
            var index = inArray_default()(item[0], this.buttons);
            this.activateButtonByIndex(index);
        }
    };
    LanguageSelectBox.prototype.destroy = function () {
        removeNode(this.wrapper);
        this.eventEmitter.removeEventHandler('showCodeBlockLanguages', this.showLangugaeSelectBox);
    };
    return LanguageSelectBox;
}());


;// CONCATENATED MODULE: ./src/nodeViews/codeSyntaxHighlightView.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var codeSyntaxHighlightView_WRAPPER_CLASS_NAME = 'ww-code-block-highlighting';
function getCustomAttrs(attrs) {
    var htmlAttrs = attrs.htmlAttrs, classNames = attrs.classNames;
    return __assign(__assign({}, htmlAttrs), { class: classNames ? classNames.join(' ') : null });
}
var CodeSyntaxHighlightView = /** @class */ (function () {
    // eslint-disable-next-line max-params
    function CodeSyntaxHighlightView(node, view, getPos, eventEmitter, languages) {
        var _this = this;
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.eventEmitter = eventEmitter;
        this.languages = languages;
        this.contentDOM = null;
        this.languageSelectBox = null;
        this.onSelectLanguage = function (language) {
            if (_this.languageEditing) {
                _this.changeLanguage(language);
            }
        };
        this.onClickEditingButton = function (ev) {
            var target = ev.target;
            var style = getComputedStyle(target, ':after');
            // judge to click pseudo element with background image for IE11
            if (style.backgroundImage !== 'none' && isFunction_default()(_this.getPos)) {
                var pos = _this.view.coordsAtPos(_this.getPos());
                _this.openLanguageSelectBox(pos);
            }
        };
        this.finishLanguageEditing = function () {
            if (_this.languageEditing) {
                _this.reset();
            }
        };
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.eventEmitter = eventEmitter;
        this.languageEditing = false;
        this.languages = languages;
        this.createElement();
        this.bindDOMEvent();
        this.bindEvent();
    }
    CodeSyntaxHighlightView.prototype.createElement = function () {
        var language = this.node.attrs.language;
        var wrapper = document.createElement('div');
        wrapper.setAttribute('data-language', language || 'text');
        addClass_default()(wrapper, cls(codeSyntaxHighlightView_WRAPPER_CLASS_NAME));
        var pre = this.createCodeBlockElement();
        var code = pre.firstChild;
        if (language) {
            addClass_default()(pre, "language-" + language);
            addClass_default()(code, "language-" + language);
        }
        wrapper.appendChild(pre);
        this.dom = wrapper;
        this.contentDOM = code;
    };
    CodeSyntaxHighlightView.prototype.createCodeBlockElement = function () {
        var pre = document.createElement('pre');
        var code = document.createElement('code');
        var language = this.node.attrs.language;
        var attrs = getCustomAttrs(this.node.attrs);
        if (language) {
            code.setAttribute('data-language', language);
        }
        Object.keys(attrs).forEach(function (attrName) {
            if (attrs[attrName]) {
                pre.setAttribute(attrName, attrs[attrName]);
            }
        });
        pre.appendChild(code);
        return pre;
    };
    CodeSyntaxHighlightView.prototype.bindDOMEvent = function () {
        if (this.dom) {
            this.dom.addEventListener('click', this.onClickEditingButton);
            this.view.dom.addEventListener('mousedown', this.finishLanguageEditing);
            window.addEventListener('resize', this.finishLanguageEditing);
        }
    };
    CodeSyntaxHighlightView.prototype.bindEvent = function () {
        this.eventEmitter.listen('selectLanguage', this.onSelectLanguage);
        this.eventEmitter.listen('scroll', this.finishLanguageEditing);
        this.eventEmitter.listen('finishLanguageEditing', this.finishLanguageEditing);
    };
    CodeSyntaxHighlightView.prototype.openLanguageSelectBox = function (pos) {
        this.languageSelectBox = new LanguageSelectBox(this.view.dom.parentElement, this.eventEmitter, this.languages);
        this.eventEmitter.emit('showCodeBlockLanguages', pos, this.node.attrs.language);
        this.languageEditing = true;
    };
    CodeSyntaxHighlightView.prototype.changeLanguage = function (language) {
        if (isFunction_default()(this.getPos)) {
            this.reset();
            var pos = this.getPos();
            var tr = this.view.state.tr;
            tr.setNodeMarkup(pos, null, { language: language });
            this.view.dispatch(tr);
        }
    };
    CodeSyntaxHighlightView.prototype.reset = function () {
        if (this.languageSelectBox) {
            this.languageSelectBox.destroy();
            this.languageSelectBox = null;
        }
        this.languageEditing = false;
    };
    CodeSyntaxHighlightView.prototype.stopEvent = function () {
        return true;
    };
    CodeSyntaxHighlightView.prototype.update = function (node) {
        if (!node.sameMarkup(this.node)) {
            return false;
        }
        this.node = node;
        return true;
    };
    CodeSyntaxHighlightView.prototype.destroy = function () {
        this.reset();
        if (this.dom) {
            this.dom.removeEventListener('click', this.onClickEditingButton);
            this.view.dom.removeEventListener('mousedown', this.finishLanguageEditing);
            window.removeEventListener('resize', this.finishLanguageEditing);
        }
        this.eventEmitter.removeEventHandler('selectLanguage', this.onSelectLanguage);
        this.eventEmitter.removeEventHandler('scroll', this.finishLanguageEditing);
        this.eventEmitter.removeEventHandler('finishLanguageEditing', this.finishLanguageEditing);
    };
    return CodeSyntaxHighlightView;
}());
function createCodeSyntaxHighlightView(languages) {
    return function (node, view, getPos, emitter) {
        return new CodeSyntaxHighlightView(node, view, getPos, emitter, languages);
    };
}

;// CONCATENATED MODULE: ./src/plugin.ts




function codeSyntaxHighlightPlugin(context, options) {
    if (options) {
        var eventEmitter = context.eventEmitter;
        var prism_1 = options.highlighter;
        eventEmitter.addEventType('showCodeBlockLanguages');
        eventEmitter.addEventType('selectLanguage');
        eventEmitter.addEventType('finishLanguageEditing');
        var languages_1 = prism_1.languages;
        var registerdlanguages = Object.keys(languages_1).filter(function (language) { return !isFunction_default()(languages_1[language]); });
        return {
            toHTMLRenderers: getHTMLRenderers(prism_1),
            wysiwygPlugins: [function () { return codeSyntaxHighlighting(context, prism_1); }],
            wysiwygNodeViews: {
                codeBlock: createCodeSyntaxHighlightView(registerdlanguages),
            },
        };
    }
    return {};
}

;// CONCATENATED MODULE: ./src/index.ts


// Prevent to highlight all code elements automatically.
// @link https://prismjs.com/docs/Prism.html#.manual
// eslint-disable-next-line no-undefined
if (typeof window !== undefined) {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;
}
/* harmony default export */ var src = (codeSyntaxHighlightPlugin);

}();
module.exports = __webpack_exports__["default"];
/******/ })()
;