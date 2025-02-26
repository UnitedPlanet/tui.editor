/*!
 * TOAST UI Editor : Chart Plugin
 * @version 3.0.1 | Fri Jan 13 2023
 * @author NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@toast-ui/chart"));
	else if(typeof define === 'function' && define.amd)
		define(["@toast-ui/chart"], factory);
	else if(typeof exports === 'object')
		exports["toastui"] = factory(require("@toast-ui/chart"));
	else
		root["toastui"] = root["toastui"] || {}, root["toastui"]["Editor"] = root["toastui"]["Editor"] || {}, root["toastui"]["Editor"]["plugin"] = root["toastui"]["Editor"]["plugin"] || {}, root["toastui"]["Editor"]["plugin"]["chart"] = factory(root["toastui"]["Chart"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__571__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 72:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
    }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1)
        validLen = len;
    var placeHoldersLen = validLen === len
        ? 0
        : 4 - (validLen % 4);
    return [validLen, placeHoldersLen];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0
        ? validLen - 4
        : validLen;
    var i;
    for (i = 0; i < len; i += 4) {
        tmp =
            (revLookup[b64.charCodeAt(i)] << 18) |
                (revLookup[b64.charCodeAt(i + 1)] << 12) |
                (revLookup[b64.charCodeAt(i + 2)] << 6) |
                revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = (tmp >> 16) & 0xFF;
        arr[curByte++] = (tmp >> 8) & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp =
            (revLookup[b64.charCodeAt(i)] << 2) |
                (revLookup[b64.charCodeAt(i + 1)] >> 4);
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp =
            (revLookup[b64.charCodeAt(i)] << 10) |
                (revLookup[b64.charCodeAt(i + 1)] << 4) |
                (revLookup[b64.charCodeAt(i + 2)] >> 2);
        arr[curByte++] = (tmp >> 8) & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] +
        lookup[num >> 12 & 0x3F] +
        lookup[num >> 6 & 0x3F] +
        lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
        tmp =
            ((uint8[i] << 16) & 0xFF0000) +
                ((uint8[i + 1] << 8) & 0xFF00) +
                (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join('');
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3
    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
    }
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] +
            lookup[(tmp << 4) & 0x3F] +
            '==');
    }
    else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] +
            lookup[(tmp >> 4) & 0x3F] +
            lookup[(tmp << 2) & 0x3F] +
            '=');
    }
    return parts.join('');
}


/***/ }),

/***/ 636:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

var base64 = __webpack_require__(72);
var ieee754 = __webpack_require__(74);
var customInspectSymbol = (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
    console.error('This browser lacks typed array (Uint8Array) support which is required by ' +
        '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
}
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        var arr = new Uint8Array(1);
        var proto = { foo: function () { return 42; } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    }
    catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, 'parent', {
    enumerable: true,
    get: function () {
        if (!Buffer.isBuffer(this))
            return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, 'offset', {
    enumerable: true,
    get: function () {
        if (!Buffer.isBuffer(this))
            return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    // Return an augmented `Uint8Array` instance
    var buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */
function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
            throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192; // not used by this implementation
function from(value, encodingOrOffset, length) {
    if (typeof value === 'string') {
        return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
    }
    if (value == null) {
        throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
            'or Array-like Object. Received type ' + (typeof value));
    }
    if (isInstance(value, ArrayBuffer) ||
        (value && isInstance(value.buffer, ArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== 'undefined' &&
        (isInstance(value, SharedArrayBuffer) ||
            (value && isInstance(value.buffer, SharedArrayBuffer)))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === 'number') {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    var valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
        return Buffer.from(valueOf, encodingOrOffset, length);
    }
    var b = fromObject(value);
    if (b)
        return b;
    if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
        typeof value[Symbol.toPrimitive] === 'function') {
        return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
    }
    throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
        'or Array-like Object. Received type ' + (typeof value));
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number');
    }
    else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
        return createBuffer(size);
    }
    if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpreted as a start offset.
        return typeof encoding === 'string'
            ? createBuffer(size).fill(fill, encoding)
            : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
    }
    if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding);
    }
    var length = byteLength(string, encoding) | 0;
    var buf = createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        buf = buf.slice(0, actual);
    }
    return buf;
}
function fromArrayLike(array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(length);
    for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
    }
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
    }
    var buf;
    if (byteOffset === undefined && length === undefined) {
        buf = new Uint8Array(array);
    }
    else if (length === undefined) {
        buf = new Uint8Array(array, byteOffset);
    }
    else {
        buf = new Uint8Array(array, byteOffset, length);
    }
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) {
            return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
            return createBuffer(0);
        }
        return fromArrayLike(obj);
    }
    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
    }
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
            'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
    }
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) { // eslint-disable-line eqeqeq
        length = 0;
    }
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true &&
        b !== Buffer.prototype; // so Buffer.isBuffer(Buffer.prototype) will be false
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array))
        a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array))
        b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b)
        return 0;
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
        }
    }
    if (x < y)
        return -1;
    if (y < x)
        return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
        return Buffer.alloc(0);
    }
    var i;
    if (length === undefined) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
            length += list[i].length;
        }
    }
    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                Buffer.from(buf).copy(buffer, pos);
            }
            else {
                Uint8Array.prototype.set.call(buffer, buf, pos);
            }
        }
        else if (!Buffer.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
        }
        else {
            buf.copy(buffer, pos);
        }
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) {
        return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
    }
    if (typeof string !== 'string') {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
            'Received type ' + typeof string);
    }
    var len = string.length;
    var mustMatch = (arguments.length > 2 && arguments[2] === true);
    if (!mustMatch && len === 0)
        return 0;
    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
        switch (encoding) {
            case 'ascii':
            case 'latin1':
            case 'binary':
                return len;
            case 'utf8':
            case 'utf-8':
                return utf8ToBytes(string).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return len * 2;
            case 'hex':
                return len >>> 1;
            case 'base64':
                return base64ToBytes(string).length;
            default:
                if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string).length; // assume utf8
                }
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
        }
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    var loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
        start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
        return '';
    }
    if (end === undefined || end > this.length) {
        end = this.length;
    }
    if (end <= 0) {
        return '';
    }
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
        return '';
    }
    if (!encoding)
        encoding = 'utf8';
    while (true) {
        switch (encoding) {
            case 'hex':
                return hexSlice(this, start, end);
            case 'utf8':
            case 'utf-8':
                return utf8Slice(this, start, end);
            case 'ascii':
                return asciiSlice(this, start, end);
            case 'latin1':
            case 'binary':
                return latin1Slice(this, start, end);
            case 'base64':
                return base64Slice(this, start, end);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return utf16leSlice(this, start, end);
            default:
                if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding);
                encoding = (encoding + '').toLowerCase();
                loweredCase = true;
        }
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
    }
    for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
    }
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
    }
    for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
    }
    for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0)
        return '';
    if (arguments.length === 0)
        return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b))
        throw new TypeError('Argument must be a Buffer');
    if (this === b)
        return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    var str = '';
    var max = exports.INSPECT_MAX_BYTES;
    str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
    if (this.length > max)
        str += ' ... ';
    return '<Buffer ' + str + '>';
};
if (customInspectSymbol) {
    Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
    }
    if (!Buffer.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' +
            'Received type ' + (typeof target));
    }
    if (start === undefined) {
        start = 0;
    }
    if (end === undefined) {
        end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
        thisStart = 0;
    }
    if (thisEnd === undefined) {
        thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
    }
    if (thisStart >= thisEnd && start >= end) {
        return 0;
    }
    if (thisStart >= thisEnd) {
        return -1;
    }
    if (start >= end) {
        return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
        return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
        }
    }
    if (x < y)
        return -1;
    if (y < x)
        return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0)
        return -1;
    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
    }
    else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
    }
    else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset; // Coerce to Number.
    if (numberIsNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : (buffer.length - 1);
    }
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir)
            return -1;
        else
            byteOffset = buffer.length - 1;
    }
    else if (byteOffset < 0) {
        if (dir)
            byteOffset = 0;
        else
            return -1;
    }
    // Normalize val
    if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
    }
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
            return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    }
    else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]
        if (typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            }
            else {
                return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === 'ucs2' || encoding === 'ucs-2' ||
            encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) {
                return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) {
            return buf[i];
        }
        else {
            return buf.readUInt16BE(i * indexSize);
        }
    }
    var i;
    if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1)
                    foundIndex = i;
                if (i - foundIndex + 1 === valLength)
                    return foundIndex * indexSize;
            }
            else {
                if (foundIndex !== -1)
                    i -= i - foundIndex;
                foundIndex = -1;
            }
        }
    }
    else {
        if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
                if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                }
            }
            if (found)
                return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
        length = remaining;
    }
    else {
        length = Number(length);
        if (length > remaining) {
            length = remaining;
        }
    }
    var strLen = string.length;
    if (length > strLen / 2) {
        length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
            return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
        // Buffer#write(string, encoding)
    }
    else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
        // Buffer#write(string, offset[, length][, encoding])
    }
    else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined)
                encoding = 'utf8';
        }
        else {
            encoding = length;
            length = undefined;
        }
    }
    else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
    }
    var remaining = this.length - offset;
    if (length === undefined || length > remaining)
        length = remaining;
    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
    }
    if (!encoding)
        encoding = 'utf8';
    var loweredCase = false;
    for (;;) {
        switch (encoding) {
            case 'hex':
                return hexWrite(this, string, offset, length);
            case 'utf8':
            case 'utf-8':
                return utf8Write(this, string, offset, length);
            case 'ascii':
            case 'latin1':
            case 'binary':
                return asciiWrite(this, string, offset, length);
            case 'base64':
                // Warning: maxLength not taken into account in base64Write
                return base64Write(this, string, offset, length);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return ucs2Write(this, string, offset, length);
            default:
                if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding);
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
        }
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
    }
    else {
        return base64.fromByteArray(buf.slice(start, end));
    }
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = (firstByte > 0xEF)
            ? 4
            : (firstByte > 0xDF)
                ? 3
                : (firstByte > 0xBF)
                    ? 2
                    : 1;
        if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
                case 1:
                    if (firstByte < 0x80) {
                        codePoint = firstByte;
                    }
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                        if (tempCodePoint > 0x7F) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                            codePoint = tempCodePoint;
                        }
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        }
        else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
    }
    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
}
function asciiSlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret;
}
function latin1Slice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
    }
    return ret;
}
function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
        start = 0;
    if (!end || end < 0 || end > len)
        end = len;
    var out = '';
    for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
    }
    return out;
}
function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for (var i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
    }
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0)
            start = 0;
    }
    else if (start > len) {
        start = len;
    }
    if (end < 0) {
        end += len;
        if (end < 0)
            end = 0;
    }
    else if (end > len) {
        end = len;
    }
    if (end < start)
        end = start;
    var newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0)
        throw new RangeError('offset is not uint');
    if (offset + ext > length)
        throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUintLE =
    Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset = offset >>> 0;
        byteLength = byteLength >>> 0;
        if (!noAssert)
            checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
        }
        return val;
    };
Buffer.prototype.readUintBE =
    Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset = offset >>> 0;
        byteLength = byteLength >>> 0;
        if (!noAssert) {
            checkOffset(offset, byteLength, this.length);
        }
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 0x100)) {
            val += this[offset + --byteLength] * mul;
        }
        return val;
    };
Buffer.prototype.readUint8 =
    Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
            checkOffset(offset, 1, this.length);
        return this[offset];
    };
Buffer.prototype.readUint16LE =
    Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
            checkOffset(offset, 2, this.length);
        return this[offset] | (this[offset + 1] << 8);
    };
Buffer.prototype.readUint16BE =
    Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
            checkOffset(offset, 2, this.length);
        return (this[offset] << 8) | this[offset + 1];
    };
Buffer.prototype.readUint32LE =
    Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
            checkOffset(offset, 4, this.length);
        return ((this[offset]) |
            (this[offset + 1] << 8) |
            (this[offset + 2] << 16)) +
            (this[offset + 3] * 0x1000000);
    };
Buffer.prototype.readUint32BE =
    Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
            checkOffset(offset, 4, this.length);
        return (this[offset] * 0x1000000) +
            ((this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                this[offset + 3]);
    };
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert)
        checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
    }
    mul *= 0x80;
    if (val >= mul)
        val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert)
        checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul;
    }
    mul *= 0x80;
    if (val >= mul)
        val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80))
        return (this[offset]);
    return ((0xff - this[offset] + 1) * -1);
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 4, this.length);
    return (this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24);
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 4, this.length);
    return (this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        (this[offset + 3]);
};
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
        checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
        throw new RangeError('Index out of range');
}
Buffer.prototype.writeUintLE =
    Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength = byteLength >>> 0;
        if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
            checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 0xFF;
        while (++i < byteLength && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xFF;
        }
        return offset + byteLength;
    };
Buffer.prototype.writeUintBE =
    Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength = byteLength >>> 0;
        if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
            checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = value & 0xFF;
        while (--i >= 0 && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xFF;
        }
        return offset + byteLength;
    };
Buffer.prototype.writeUint8 =
    Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
            checkInt(this, value, offset, 1, 0xff, 0);
        this[offset] = (value & 0xff);
        return offset + 1;
    };
Buffer.prototype.writeUint16LE =
    Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
            checkInt(this, value, offset, 2, 0xffff, 0);
        this[offset] = (value & 0xff);
        this[offset + 1] = (value >>> 8);
        return offset + 2;
    };
Buffer.prototype.writeUint16BE =
    Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
            checkInt(this, value, offset, 2, 0xffff, 0);
        this[offset] = (value >>> 8);
        this[offset + 1] = (value & 0xff);
        return offset + 2;
    };
Buffer.prototype.writeUint32LE =
    Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
            checkInt(this, value, offset, 4, 0xffffffff, 0);
        this[offset + 3] = (value >>> 24);
        this[offset + 2] = (value >>> 16);
        this[offset + 1] = (value >>> 8);
        this[offset] = (value & 0xff);
        return offset + 4;
    };
Buffer.prototype.writeUint32BE =
    Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
            checkInt(this, value, offset, 4, 0xffffffff, 0);
        this[offset] = (value >>> 24);
        this[offset + 1] = (value >>> 16);
        this[offset + 2] = (value >>> 8);
        this[offset + 3] = (value & 0xff);
        return offset + 4;
    };
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        var limit = Math.pow(2, (8 * byteLength) - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        var limit = Math.pow(2, (8 * byteLength) - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
        checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (value < 0)
        value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
        checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
        checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
        checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
        checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0)
        value = 0xffffffff + value + 1;
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
    return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
        throw new RangeError('Index out of range');
    if (offset < 0)
        throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target))
        throw new TypeError('argument should be a Buffer');
    if (!start)
        start = 0;
    if (!end && end !== 0)
        end = this.length;
    if (targetStart >= target.length)
        targetStart = target.length;
    if (!targetStart)
        targetStart = 0;
    if (end > 0 && end < start)
        end = start;
    // Copy 0 bytes; we're done
    if (end === start)
        return 0;
    if (target.length === 0 || this.length === 0)
        return 0;
    // Fatal error conditions
    if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length)
        throw new RangeError('Index out of range');
    if (end < 0)
        throw new RangeError('sourceEnd out of bounds');
    // Are we oob?
    if (end > this.length)
        end = this.length;
    if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
    }
    var len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
        // Use built-in when available, missing from IE11
        this.copyWithin(targetStart, start, end);
    }
    else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
        if (typeof start === 'string') {
            encoding = start;
            start = 0;
            end = this.length;
        }
        else if (typeof end === 'string') {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== 'string') {
            throw new TypeError('encoding must be a string');
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding);
        }
        if (val.length === 1) {
            var code = val.charCodeAt(0);
            if ((encoding === 'utf8' && code < 128) ||
                encoding === 'latin1') {
                // Fast path: If `val` fits into a single byte, use that numeric value.
                val = code;
            }
        }
    }
    else if (typeof val === 'number') {
        val = val & 255;
    }
    else if (typeof val === 'boolean') {
        val = Number(val);
    }
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
    }
    if (end <= start) {
        return this;
    }
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val)
        val = 0;
    var i;
    if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
            this[i] = val;
        }
    }
    else {
        var bytes = Buffer.isBuffer(val)
            ? val
            : Buffer.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
            throw new TypeError('The value "' + val +
                '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
        }
    }
    return this;
};
// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split('=')[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2)
        return '';
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
        str = str + '=';
    }
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1)
                        bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1)
                        bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1)
                    bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        }
        else if (leadSurrogate) {
            // valid bmp char, but last char was a lead
            if ((units -= 3) > -1)
                bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0)
                break;
            bytes.push(codePoint);
        }
        else if (codePoint < 0x800) {
            if ((units -= 2) < 0)
                break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        }
        else if (codePoint < 0x10000) {
            if ((units -= 3) < 0)
                break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        }
        else if (codePoint < 0x110000) {
            if ((units -= 4) < 0)
                break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        }
        else {
            throw new Error('Invalid code point');
        }
    }
    return bytes;
}
function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray;
}
function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
            break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
        if ((i + offset >= dst.length) || (i >= src.length))
            break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type ||
        (obj != null && obj.constructor != null && obj.constructor.name != null &&
            obj.constructor.name === type.name);
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj; // eslint-disable-line no-self-compare
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
    var alphabet = '0123456789abcdef';
    var table = new Array(256);
    for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
        }
    }
    return table;
})();


/***/ }),

/***/ 722:
/***/ (function(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
    };
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
}
else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target)
            .concat(Object.getOwnPropertySymbols(target));
    };
}
else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
    };
}
function ProcessEmitWarning(warning) {
    if (console && console.warn)
        console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function () {
        return defaultMaxListeners;
    },
    set: function (arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function () {
    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
    var doError = (type === 'error');
    var events = this._events;
    if (events !== undefined)
        doError = (doError && events.error === undefined);
    else if (!doError)
        return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0)
            er = args[0];
        if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
        }
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined)
        return false;
    if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
    }
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    }
    else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    }
    else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] =
                prepend ? [listener, existing] : [existing, listener];
            // If we've already got an array, just append.
        }
        else if (prepend) {
            existing.unshift(listener);
        }
        else {
            existing.push(listener);
        }
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' +
                existing.length + ' ' + String(type) + ' listeners ' +
                'added. Use emitter.setMaxListeners() to ' +
                'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
    };
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
            return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
    };
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === undefined)
            return this;
        list = events[type];
        if (list === undefined)
            return this;
        if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
                this._events = Object.create(null);
            else {
                delete events[type];
                if (events.removeListener)
                    this.emit('removeListener', type, list.listener || listener);
            }
        }
        else if (typeof list !== 'function') {
            position = -1;
            for (i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener || list[i].listener === listener) {
                    originalListener = list[i].listener;
                    position = i;
                    break;
                }
            }
            if (position < 0)
                return this;
            if (position === 0)
                list.shift();
            else {
                spliceOne(list, position);
            }
            if (list.length === 1)
                events[type] = list[0];
            if (events.removeListener !== undefined)
                this.emit('removeListener', type, originalListener || listener);
        }
        return this;
    };
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === undefined)
            return this;
        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
            if (arguments.length === 0) {
                this._events = Object.create(null);
                this._eventsCount = 0;
            }
            else if (events[type] !== undefined) {
                if (--this._eventsCount === 0)
                    this._events = Object.create(null);
                else
                    delete events[type];
            }
            return this;
        }
        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
                key = keys[i];
                if (key === 'removeListener')
                    continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
        }
        listeners = events[type];
        if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
        }
        else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
                this.removeListener(type, listeners[i]);
            }
        }
        return this;
    };
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined)
        return [];
    var evlistener = events[type];
    if (evlistener === undefined)
        return [];
    if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ?
        unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
    }
    else {
        return listenerCount.call(emitter, type);
    }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') {
            return 1;
        }
        else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}
function once(emitter, name) {
    return new Promise(function (resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== 'error') {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) {
            emitter.once(name, listener);
        }
        else {
            emitter.on(name, listener);
        }
    }
    else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
            // IE does not have builtin `{ once: true }` support so we
            // have to do it manually.
            if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
        });
    }
    else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
}


/***/ }),

/***/ 74:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = (nBytes * 8) - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) { }
    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) { }
    if (e === 0) {
        e = 1 - eBias;
    }
    else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity);
    }
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = (nBytes * 8) - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    }
    else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) {
            value += rt / c;
        }
        else {
            value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        }
        else if (e + eBias >= 1) {
            m = ((value * c) - 1) * Math.pow(2, mLen);
            e = e + eBias;
        }
        else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) { }
    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) { }
    buffer[offset + i - d] |= s * 128;
};


/***/ }),

/***/ 409:
/***/ (function(module) {

"use strict";

if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        }
    };
}
else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function () { };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
        }
    };
}


/***/ }),

/***/ 983:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(983);


/***/ }),

/***/ 50:
/***/ (function(module) {

"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
var codes = {};
function createErrorType(code, message, Base) {
    if (!Base) {
        Base = Error;
    }
    function getMessage(arg1, arg2, arg3) {
        if (typeof message === 'string') {
            return message;
        }
        else {
            return message(arg1, arg2, arg3);
        }
    }
    var NodeError = 
    /*#__PURE__*/
    function (_Base) {
        _inheritsLoose(NodeError, _Base);
        function NodeError(arg1, arg2, arg3) {
            return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError;
    }(Base);
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function (i) {
            return String(i);
        });
        if (len > 2) {
            return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
        }
        else if (len === 2) {
            return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        }
        else {
            return "of ".concat(thing, " ").concat(expected[0]);
        }
    }
    else {
        return "of ".concat(thing, " ").concat(String(expected));
    }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
    if (this_len === undefined || this_len > str.length) {
        this_len = str.length;
    }
    return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
    if (typeof start !== 'number') {
        start = 0;
    }
    if (start + search.length > str.length) {
        return false;
    }
    else {
        return str.indexOf(search, start) !== -1;
    }
}
createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
    // determiner: 'must be' or 'must not be'
    var determiner;
    if (typeof expected === 'string' && startsWith(expected, 'not ')) {
        determiner = 'must not be';
        expected = expected.replace(/^not /, '');
    }
    else {
        determiner = 'must be';
    }
    var msg;
    if (endsWith(name, ' argument')) {
        // For cases like 'first argument'
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
    }
    else {
        var type = includes(name, '.') ? 'property' : 'argument';
        msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
    }
    msg += ". Received type ".concat(typeof actual);
    return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
    return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
    return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
    return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.q = codes;


/***/ }),

/***/ 298:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
};
/*</replacement>*/
module.exports = Duplex;
var Readable = __webpack_require__(58);
var Writable = __webpack_require__(880);
__webpack_require__(409)(Duplex, Readable);
{
    // Allow the keys array to be GC'ed.
    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
        var method = keys[v];
        if (!Duplex.prototype[method])
            Duplex.prototype[method] = Writable.prototype[method];
    }
}
function Duplex(options) {
    if (!(this instanceof Duplex))
        return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
        if (options.readable === false)
            this.readable = false;
        if (options.writable === false)
            this.writable = false;
        if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once('end', onend);
        }
    }
}
Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
}); // the no-half-open enforcer
function onend() {
    // If the writable side ended, then we're ok.
    if (this._writableState.ended)
        return; // no more data can be written.
    // But allow more writes to happen in this tick.
    process.nextTick(onEndNT, this);
}
function onEndNT(self) {
    self.end();
}
Object.defineProperty(Duplex.prototype, 'destroyed', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined || this._writableState === undefined) {
            return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) {
            return;
        } // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
    }
});


/***/ }),

/***/ 4:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;
var Transform = __webpack_require__(969);
__webpack_require__(409)(PassThrough, Transform);
function PassThrough(options) {
    if (!(this instanceof PassThrough))
        return new PassThrough(options);
    Transform.call(this, options);
}
PassThrough.prototype._transform = function (chunk, encoding, cb) {
    cb(null, chunk);
};


/***/ }),

/***/ 58:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;
/*<replacement>*/
var Duplex;
/*</replacement>*/
Readable.ReadableState = ReadableState;
/*<replacement>*/
var EE = (__webpack_require__(722).EventEmitter);
var EElistenerCount = function EElistenerCount(emitter, type) {
    return emitter.listeners(type).length;
};
/*</replacement>*/
/*<replacement>*/
var Stream = __webpack_require__(786);
/*</replacement>*/
var Buffer = (__webpack_require__(636).Buffer);
var OurUint8Array = __webpack_require__.g.Uint8Array || function () { };
function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk);
}
function _isUint8Array(obj) {
    return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/
var debugUtil = __webpack_require__(602);
var debug;
if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog('stream');
}
else {
    debug = function debug() { };
}
/*</replacement>*/
var BufferList = __webpack_require__(346);
var destroyImpl = __webpack_require__(974);
var _require = __webpack_require__(754), getHighWaterMark = _require.getHighWaterMark;
var _require$codes = (__webpack_require__(50)/* .codes */ .q), ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.
var StringDecoder;
var createReadableStreamAsyncIterator;
var from;
__webpack_require__(409)(Readable, Stream);
var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
function prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === 'function')
        return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
    else
        emitter._events[event] = [fn, emitter._events[event]];
}
function ReadableState(options, stream, isDuplex) {
    Duplex = Duplex || __webpack_require__(298);
    options = options || {}; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream.
    // These options can be provided separately as readableXXX and writableXXX.
    if (typeof isDuplex !== 'boolean')
        isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;
    if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    this.sync = true; // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')
    this.autoDestroy = !!options.autoDestroy; // has it been destroyed
    this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
        if (!StringDecoder)
            StringDecoder = (__webpack_require__(183)/* .StringDecoder */ .s);
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
    }
}
function Readable(options) {
    Duplex = Duplex || __webpack_require__(298);
    if (!(this instanceof Readable))
        return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
    // the ReadableState constructor, at least with V8 6.5
    var isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options, this, isDuplex); // legacy
    this.readable = true;
    if (options) {
        if (typeof options.read === 'function')
            this._read = options.read;
        if (typeof options.destroy === 'function')
            this._destroy = options.destroy;
    }
    Stream.call(this);
}
Object.defineProperty(Readable.prototype, 'destroyed', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined) {
            return false;
        }
        return this._readableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._readableState) {
            return;
        } // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
    }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
    cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
        if (typeof chunk === 'string') {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = '';
            }
            skipChunkCheck = true;
        }
    }
    else {
        skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
    return readableAddChunk(this, chunk, null, true, false);
};
function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    debug('readableAddChunk', chunk);
    var state = stream._readableState;
    if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
    }
    else {
        var er;
        if (!skipChunkCheck)
            er = chunkInvalid(state, chunk);
        if (er) {
            errorOrDestroy(stream, er);
        }
        else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
            }
            if (addToFront) {
                if (state.endEmitted)
                    errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
                else
                    addChunk(stream, state, chunk, true);
            }
            else if (state.ended) {
                errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
            }
            else if (state.destroyed) {
                return false;
            }
            else {
                state.reading = false;
                if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0)
                        addChunk(stream, state, chunk, false);
                    else
                        maybeReadMore(stream, state);
                }
                else {
                    addChunk(stream, state, chunk, false);
                }
            }
        }
        else if (!addToFront) {
            state.reading = false;
            maybeReadMore(stream, state);
        }
    } // We can push more data if we are below the highWaterMark.
    // Also, if we have no data yet, we can stand some more bytes.
    // This is to work around cases where hwm=0, such as the repl.
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit('data', chunk);
    }
    else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
            state.buffer.unshift(chunk);
        else
            state.buffer.push(chunk);
        if (state.needReadable)
            emitReadable(stream);
    }
    maybeReadMore(stream, state);
}
function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
    }
    return er;
}
Readable.prototype.isPaused = function () {
    return this._readableState.flowing === false;
}; // backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
    if (!StringDecoder)
        StringDecoder = (__webpack_require__(183)/* .StringDecoder */ .s);
    var decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8
    this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:
    var p = this._readableState.buffer.head;
    var content = '';
    while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== '')
        this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
}; // Don't raise the hwm > 1GB
var MAX_HWM = 0x40000000;
function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
        // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
        n = MAX_HWM;
    }
    else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
    }
    return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
        return 0;
    if (state.objectMode)
        return 1;
    if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length)
            return state.buffer.head.data.length;
        else
            return state.length;
    } // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length)
        return n; // Don't have enough
    if (!state.ended) {
        state.needReadable = true;
        return 0;
    }
    return state.length;
} // you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
    debug('read', n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0)
        state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended)
            endReadable(this);
        else
            emitReadable(this);
        return null;
    }
    n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
        if (state.length === 0)
            endReadable(this);
        return null;
    } // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.
    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
    } // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
    }
    else if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true; // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0)
            state.needReadable = true; // call internal read method
        this._read(state.highWaterMark);
        state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.
        if (!state.reading)
            n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0)
        ret = fromList(n, state);
    else
        ret = null;
    if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
    }
    else {
        state.length -= n;
        state.awaitDrain = 0;
    }
    if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended)
            state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.
        if (nOrig !== n && state.ended)
            endReadable(this);
    }
    if (ret !== null)
        this.emit('data', ret);
    return ret;
};
function onEofChunk(stream, state) {
    debug('onEofChunk');
    if (state.ended)
        return;
    if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
        }
    }
    state.ended = true;
    if (state.sync) {
        // if we are sync, wait until next tick to emit the data.
        // Otherwise we risk emitting data in the flow()
        // the readable code triggers during a read() call
        emitReadable(stream);
    }
    else {
        // emit 'readable' now to make sure it gets picked up.
        state.needReadable = false;
        if (!state.emittedReadable) {
            state.emittedReadable = true;
            emitReadable_(stream);
        }
    }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
    var state = stream._readableState;
    debug('emitReadable', state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
        debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
    }
}
function emitReadable_(stream) {
    var state = stream._readableState;
    debug('emitReadable_', state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
        stream.emit('readable');
        state.emittedReadable = false;
    } // The stream needs another readable event if
    // 1. It is not flowing, as the flow mechanism will take
    //    care of it.
    // 2. It is not ended.
    // 3. It is below the highWaterMark, so we can schedule
    //    another readable later.
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
    if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
    }
}
function maybeReadMore_(stream, state) {
    // Attempt to read more data if we should.
    //
    // The conditions for reading more data are (one of):
    // - Not enough data buffered (state.length < state.highWaterMark). The loop
    //   is responsible for filling the buffer with enough data if such data
    //   is available. If highWaterMark is 0 and we are not in the flowing mode
    //   we should _not_ attempt to buffer any extra data. We'll get more data
    //   when the stream consumer calls read() instead.
    // - No data in the buffer, and the stream is in flowing mode. In this mode
    //   the loop below is responsible for ensuring read() is called. Failing to
    //   call read here would abort the flow and there's no other mechanism for
    //   continuing the flow if the stream consumer has just subscribed to the
    //   'data' event.
    //
    // In addition to the above conditions to keep reading data, the following
    // conditions prevent the data from being read:
    // - The stream has ended (state.ended).
    // - There is already a pending 'read' operation (state.reading). This is a
    //   case where the the stream has called the implementation defined _read()
    //   method, but they are processing the call asynchronously and have _not_
    //   called push() with new data. In this case we skip performing more
    //   read()s. The execution ends in this method again after the _read() ends
    //   up calling push() with more data.
    while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length) // didn't get any data, stop spinning.
            break;
    }
    state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};
Readable.prototype.pipe = function (dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch (state.pipesCount) {
        case 0:
            state.pipes = dest;
            break;
        case 1:
            state.pipes = [state.pipes, dest];
            break;
        default:
            state.pipes.push(dest);
            break;
    }
    state.pipesCount += 1;
    debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted)
        process.nextTick(endFn);
    else
        src.once('end', endFn);
    dest.on('unpipe', onunpipe);
    function onunpipe(readable, unpipeInfo) {
        debug('onunpipe');
        if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
            }
        }
    }
    function onend() {
        debug('onend');
        dest.end();
    } // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = pipeOnDrain(src);
    dest.on('drain', ondrain);
    var cleanedUp = false;
    function cleanup() {
        debug('cleanup'); // cleanup event handlers once the pipe is broken
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', unpipe);
        src.removeListener('data', ondata);
        cleanedUp = true; // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
            ondrain();
    }
    src.on('data', ondata);
    function ondata(chunk) {
        debug('ondata');
        var ret = dest.write(chunk);
        debug('dest.write', ret);
        if (ret === false) {
            // If the user unpiped during `dest.write()`, it is possible
            // to get stuck in a permanently paused state if that write
            // also returned false.
            // => Check whether `dest` is still a piping destination.
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug('false write response, pause', state.awaitDrain);
                state.awaitDrain++;
            }
            src.pause();
        }
    } // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (EElistenerCount(dest, 'error') === 0)
            errorOrDestroy(dest, er);
    } // Make sure our error handler is attached before userland ones.
    prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.
    function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
    }
    dest.once('close', onclose);
    function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
    }
    dest.once('finish', onfinish);
    function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
    } // tell the dest that it's being piped to
    dest.emit('pipe', src); // start the flow if it hasn't been started already.
    if (!state.flowing) {
        debug('pipe resume');
        src.resume();
    }
    return dest;
};
function pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain)
            state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
            state.flowing = true;
            flow(src);
        }
    };
}
Readable.prototype.unpipe = function (dest) {
    var state = this._readableState;
    var unpipeInfo = {
        hasUnpiped: false
    }; // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0)
        return this; // just one destination.  most common case.
    if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes)
            return this;
        if (!dest)
            dest = state.pipes; // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
            dest.emit('unpipe', this, unpipeInfo);
        return this;
    } // slow case. multiple pipe destinations.
    if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) {
            dests[i].emit('unpipe', this, {
                hasUnpiped: false
            });
        }
        return this;
    } // try to find the right one.
    var index = indexOf(state.pipes, dest);
    if (index === -1)
        return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
    dest.emit('unpipe', this, unpipeInfo);
    return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === 'data') {
        // update readableListening so that resume() may be a no-op
        // a few lines down. This is needed to support once('readable').
        state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused
        if (state.flowing !== false)
            this.resume();
    }
    else if (ev === 'readable') {
        if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug('on readable', state.length, state.reading);
            if (state.length) {
                emitReadable(this);
            }
            else if (!state.reading) {
                process.nextTick(nReadingNextTick, this);
            }
        }
    }
    return res;
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function (ev, fn) {
    var res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === 'readable') {
        // We need to check if there is someone still listening to
        // readable and reset the state. However this needs to happen
        // after readable has been emitted but before I/O (nextTick) to
        // support once('readable', fn) cycles. This means that calling
        // resume within the same tick will have no
        // effect.
        process.nextTick(updateReadableListening, this);
    }
    return res;
};
Readable.prototype.removeAllListeners = function (ev) {
    var res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === 'readable' || ev === undefined) {
        // We need to check if there is someone still listening to
        // readable and reset the state. However this needs to happen
        // after readable has been emitted but before I/O (nextTick) to
        // support once('readable', fn) cycles. This means that calling
        // resume within the same tick will have no
        // effect.
        process.nextTick(updateReadableListening, this);
    }
    return res;
};
function updateReadableListening(self) {
    var state = self._readableState;
    state.readableListening = self.listenerCount('readable') > 0;
    if (state.resumeScheduled && !state.paused) {
        // flowing needs to be set to true now, otherwise
        // the upcoming resume will not flow.
        state.flowing = true; // crude way to check if we should resume
    }
    else if (self.listenerCount('data') > 0) {
        self.resume();
    }
}
function nReadingNextTick(self) {
    debug('readable nexttick read 0');
    self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
    var state = this._readableState;
    if (!state.flowing) {
        debug('resume'); // we flow only if there is no one listening
        // for readable, but we still have to call
        // resume()
        state.flowing = !state.readableListening;
        resume(this, state);
    }
    state.paused = false;
    return this;
};
function resume(stream, state) {
    if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
    }
}
function resume_(stream, state) {
    debug('resume', state.reading);
    if (!state.reading) {
        stream.read(0);
    }
    state.resumeScheduled = false;
    stream.emit('resume');
    flow(stream);
    if (state.flowing && !state.reading)
        stream.read(0);
}
Readable.prototype.pause = function () {
    debug('call pause flowing=%j', this._readableState.flowing);
    if (this._readableState.flowing !== false) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
    }
    this._readableState.paused = true;
    return this;
};
function flow(stream) {
    var state = stream._readableState;
    debug('flow', state.flowing);
    while (state.flowing && stream.read() !== null) {
        ;
    }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on('end', function () {
        debug('wrapped end');
        if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length)
                _this.push(chunk);
        }
        _this.push(null);
    });
    stream.on('data', function (chunk) {
        debug('wrapped data');
        if (state.decoder)
            chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined))
            return;
        else if (!state.objectMode && (!chunk || !chunk.length))
            return;
        var ret = _this.push(chunk);
        if (!ret) {
            paused = true;
            stream.pause();
        }
    }); // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for (var i in stream) {
        if (this[i] === undefined && typeof stream[i] === 'function') {
            this[i] = function methodWrap(method) {
                return function methodWrapReturnFunction() {
                    return stream[method].apply(stream, arguments);
                };
            }(i);
        }
    } // proxy certain important events.
    for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    } // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    this._read = function (n) {
        debug('wrapped _read', n);
        if (paused) {
            paused = false;
            stream.resume();
        }
    };
    return this;
};
if (typeof Symbol === 'function') {
    Readable.prototype[Symbol.asyncIterator] = function () {
        if (createReadableStreamAsyncIterator === undefined) {
            createReadableStreamAsyncIterator = __webpack_require__(262);
        }
        return createReadableStreamAsyncIterator(this);
    };
}
Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.highWaterMark;
    }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState && this._readableState.buffer;
    }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.flowing;
    },
    set: function set(state) {
        if (this._readableState) {
            this._readableState.flowing = state;
        }
    }
}); // exposed for testing purposes only.
Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.length;
    }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
    // nothing buffered
    if (state.length === 0)
        return null;
    var ret;
    if (state.objectMode)
        ret = state.buffer.shift();
    else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder)
            ret = state.buffer.join('');
        else if (state.buffer.length === 1)
            ret = state.buffer.first();
        else
            ret = state.buffer.concat(state.length);
        state.buffer.clear();
    }
    else {
        // read part of list
        ret = state.buffer.consume(n, state.decoder);
    }
    return ret;
}
function endReadable(stream) {
    var state = stream._readableState;
    debug('endReadable', state.endEmitted);
    if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
    }
}
function endReadableNT(state, stream) {
    debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
        if (state.autoDestroy) {
            // In case of duplex streams we need a way to detect
            // if the writable side is ready for autoDestroy as well
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) {
                stream.destroy();
            }
        }
    }
}
if (typeof Symbol === 'function') {
    Readable.from = function (iterable, opts) {
        if (from === undefined) {
            from = __webpack_require__(260);
        }
        return from(Readable, iterable, opts);
    };
}
function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
            return i;
    }
    return -1;
}


/***/ }),

/***/ 969:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;
var _require$codes = (__webpack_require__(50)/* .codes */ .q), ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
var Duplex = __webpack_require__(298);
__webpack_require__(409)(Transform, Duplex);
function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) {
        return this.emit('error', new ERR_MULTIPLE_CALLBACK());
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null) // single equals check for both `null` and `undefined`
        this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
    }
}
function Transform(options) {
    if (!(this instanceof Transform))
        return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
    }; // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;
    if (options) {
        if (typeof options.transform === 'function')
            this._transform = options.transform;
        if (typeof options.flush === 'function')
            this._flush = options.flush;
    } // When the writable side finishes, then flush out anything remaining.
    this.on('prefinish', prefinish);
}
function prefinish() {
    var _this = this;
    if (typeof this._flush === 'function' && !this._readableState.destroyed) {
        this._flush(function (er, data) {
            done(_this, er, data);
        });
    }
    else {
        done(this, null, null);
    }
}
Transform.prototype.push = function (chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};
Transform.prototype._write = function (chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
    }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    }
    else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
    }
};
Transform.prototype._destroy = function (err, cb) {
    Duplex.prototype._destroy.call(this, err, function (err2) {
        cb(err2);
    });
};
function done(stream, er, data) {
    if (er)
        return stream.emit('error', er);
    if (data != null) // single equals check for both `null` and `undefined`
        stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
}


/***/ }),

/***/ 880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;
/* <replacement> */
function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function () {
        onCorkedFinish(_this, state);
    };
}
/* </replacement> */
/*<replacement>*/
var Duplex;
/*</replacement>*/
Writable.WritableState = WritableState;
/*<replacement>*/
var internalUtil = {
    deprecate: __webpack_require__(485)
};
/*</replacement>*/
/*<replacement>*/
var Stream = __webpack_require__(786);
/*</replacement>*/
var Buffer = (__webpack_require__(636).Buffer);
var OurUint8Array = __webpack_require__.g.Uint8Array || function () { };
function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk);
}
function _isUint8Array(obj) {
    return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
var destroyImpl = __webpack_require__(974);
var _require = __webpack_require__(754), getHighWaterMark = _require.getHighWaterMark;
var _require$codes = (__webpack_require__(50)/* .codes */ .q), ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
var errorOrDestroy = destroyImpl.errorOrDestroy;
__webpack_require__(409)(Writable, Stream);
function nop() { }
function WritableState(options, stream, isDuplex) {
    Duplex = Duplex || __webpack_require__(298);
    options = options || {}; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream,
    // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
    if (typeof isDuplex !== 'boolean')
        isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;
    if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called
    this.finalCalled = false; // drain event flag.
    this.needDrain = false; // at the start of calling end()
    this.ending = false; // when end() has been called, and returned
    this.ended = false; // when 'finish' is emitted
    this.finished = false; // has it been destroyed
    this.destroyed = false; // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0; // a flag to see when we're in the middle of a write.
    this.writing = false; // when true all writes will be buffered until .uncork() call
    this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true; // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)
    this.onwrite = function (er) {
        onwrite(stream, er);
    }; // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null; // the amount that is being written when _write is called.
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false; // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')
    this.autoDestroy = !!options.autoDestroy; // count buffered requests
    this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
        out.push(current);
        current = current.next;
    }
    return out;
};
(function () {
    try {
        Object.defineProperty(WritableState.prototype, 'buffer', {
            get: internalUtil.deprecate(function writableStateBufferGetter() {
                return this.getBuffer();
            }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
        });
    }
    catch (_) { }
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
            if (realHasInstance.call(this, object))
                return true;
            if (this !== Writable)
                return false;
            return object && object._writableState instanceof WritableState;
        }
    });
}
else {
    realHasInstance = function realHasInstance(object) {
        return object instanceof this;
    };
}
function Writable(options) {
    Duplex = Duplex || __webpack_require__(298); // Writable ctor is applied to Duplexes, too.
    // `realHasInstance` is necessary because using plain `instanceof`
    // would return false, as no `_writableState` property is attached.
    // Trying to use the custom `instanceof` for Writable here will also break the
    // Node.js LazyTransform implementation, which has a non-trivial getter for
    // `_writableState` that would lead to infinite recursion.
    // Checking for a Stream.Duplex instance is faster here instead of inside
    // the WritableState constructor, at least with V8 6.5
    var isDuplex = this instanceof Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this))
        return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex); // legacy.
    this.writable = true;
    if (options) {
        if (typeof options.write === 'function')
            this._write = options.write;
        if (typeof options.writev === 'function')
            this._writev = options.writev;
        if (typeof options.destroy === 'function')
            this._destroy = options.destroy;
        if (typeof options.final === 'function')
            this._final = options.final;
    }
    Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};
function writeAfterEnd(stream, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
    }
    else if (typeof chunk !== 'string' && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
    }
    if (er) {
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
    }
    return true;
}
Writable.prototype.write = function (chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }
    if (isBuf)
        encoding = 'buffer';
    else if (!encoding)
        encoding = state.defaultEncoding;
    if (typeof cb !== 'function')
        cb = nop;
    if (state.ending)
        writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
};
Writable.prototype.cork = function () {
    this._writableState.corked++;
};
Writable.prototype.uncork = function () {
    var state = this._writableState;
    if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
            clearBuffer(this, state);
    }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === 'string')
        encoding = encoding.toLowerCase();
    if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
};
Object.defineProperty(Writable.prototype, 'writableBuffer', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
        chunk = Buffer.from(chunk, encoding);
    }
    return chunk;
}
Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
            isBuf = true;
            encoding = 'buffer';
            chunk = newChunk;
        }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.
    if (!ret)
        state.needDrain = true;
    if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
            chunk: chunk,
            encoding: encoding,
            isBuf: isBuf,
            callback: cb,
            next: null
        };
        if (last) {
            last.next = state.lastBufferedRequest;
        }
        else {
            state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
    }
    else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
    }
    return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED('write'));
    else if (writev)
        stream._writev(chunk, state.onwrite);
    else
        stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
        // defer the callback if we are being called synchronously
        // to avoid piling up things on the stack
        process.nextTick(cb, er); // this can emit finish, and it will always happen
        // after error
        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
    }
    else {
        // the caller expect this to happen before if
        // it is async
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er); // this can emit finish, but finish must
        // always follow error
        finishMaybe(stream, state);
    }
}
function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
}
function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== 'function')
        throw new ERR_MULTIPLE_CALLBACK();
    onwriteStateUpdate(state);
    if (er)
        onwriteError(stream, state, sync, er, cb);
    else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
        }
        if (sync) {
            process.nextTick(afterWrite, stream, state, finished, cb);
        }
        else {
            afterWrite(stream, state, finished, cb);
        }
    }
}
function afterWrite(stream, state, finished, cb) {
    if (!finished)
        onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
    }
} // if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
            buffer[count] = entry;
            if (!entry.isBuf)
                allBuffers = false;
            entry = entry.next;
            count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
        }
        else {
            state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
    }
    else {
        // Slow case, write chunks one-by-one
        while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
            // it means that we need to wait until it does.
            // also, that means that the chunk and cb are currently
            // being processed, so move the buffer counter past them.
            if (state.writing) {
                break;
            }
        }
        if (entry === null)
            state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
}
Writable.prototype._write = function (chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};
Writable.prototype._writev = null;
Writable.prototype.end = function (chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
    }
    else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }
    if (chunk !== null && chunk !== undefined)
        this.write(chunk, encoding); // .end() fully uncorks
    if (state.corked) {
        state.corked = 1;
        this.uncork();
    } // ignore unnecessary end() calls.
    if (!state.ending)
        endWritable(this, state, cb);
    return this;
};
Object.defineProperty(Writable.prototype, 'writableLength', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
});
function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
    stream._final(function (err) {
        state.pendingcb--;
        if (err) {
            errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit('prefinish');
        finishMaybe(stream, state);
    });
}
function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === 'function' && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick(callFinal, stream, state);
        }
        else {
            state.prefinished = true;
            stream.emit('prefinish');
        }
    }
}
function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit('finish');
            if (state.autoDestroy) {
                // In case of duplex streams we need a way to detect
                // if the readable side is ready for autoDestroy as well
                var rState = stream._readableState;
                if (!rState || rState.autoDestroy && rState.endEmitted) {
                    stream.destroy();
                }
            }
        }
    }
    return need;
}
function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
        if (state.finished)
            process.nextTick(cb);
        else
            stream.once('finish', cb);
    }
    state.ended = true;
    stream.writable = false;
}
function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
    } // reuse the free corkReq.
    state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty(Writable.prototype, 'destroyed', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._writableState === undefined) {
            return false;
        }
        return this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._writableState) {
            return;
        } // backward compatibility, the user is explicitly
        // managing destroyed
        this._writableState.destroyed = value;
    }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
    cb(err);
};


/***/ }),

/***/ 262:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var _Object$setPrototypeO;
function _defineProperty(obj, key, value) { if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
}
else {
    obj[key] = value;
} return obj; }
var finished = __webpack_require__(678);
var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');
function createIterResult(value, done) {
    return {
        value: value,
        done: done
    };
}
function readAndResolve(iter) {
    var resolve = iter[kLastResolve];
    if (resolve !== null) {
        var data = iter[kStream].read(); // we defer if data is null
        // we can be expecting either 'end' or
        // 'error'
        if (data !== null) {
            iter[kLastPromise] = null;
            iter[kLastResolve] = null;
            iter[kLastReject] = null;
            resolve(createIterResult(data, false));
        }
    }
}
function onReadable(iter) {
    // we wait for the next tick, because it might
    // emit an error with process.nextTick
    process.nextTick(readAndResolve, iter);
}
function wrapForNext(lastPromise, iter) {
    return function (resolve, reject) {
        lastPromise.then(function () {
            if (iter[kEnded]) {
                resolve(createIterResult(undefined, true));
                return;
            }
            iter[kHandlePromise](resolve, reject);
        }, reject);
    };
}
var AsyncIteratorPrototype = Object.getPrototypeOf(function () { });
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream() {
        return this[kStream];
    },
    next: function next() {
        var _this = this;
        // if we have detected an error in the meanwhile
        // reject straight away
        var error = this[kError];
        if (error !== null) {
            return Promise.reject(error);
        }
        if (this[kEnded]) {
            return Promise.resolve(createIterResult(undefined, true));
        }
        if (this[kStream].destroyed) {
            // We need to defer via nextTick because if .destroy(err) is
            // called, the error will be emitted via nextTick, and
            // we cannot guarantee that there is no error lingering around
            // waiting to be emitted.
            return new Promise(function (resolve, reject) {
                process.nextTick(function () {
                    if (_this[kError]) {
                        reject(_this[kError]);
                    }
                    else {
                        resolve(createIterResult(undefined, true));
                    }
                });
            });
        } // if we have multiple next() calls
        // we will wait for the previous Promise to finish
        // this logic is optimized to support for await loops,
        // where next() is only called once at a time
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
            promise = new Promise(wrapForNext(lastPromise, this));
        }
        else {
            // fast path needed to support multiple this.push()
            // without triggering the next() queue
            var data = this[kStream].read();
            if (data !== null) {
                return Promise.resolve(createIterResult(data, false));
            }
            promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
    }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
    return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    // destroy(err, cb) is a private API
    // we can guarantee we have that here, because we control the
    // Readable class this is attached to
    return new Promise(function (resolve, reject) {
        _this2[kStream].destroy(null, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(createIterResult(undefined, true));
        });
    });
}), _Object$setPrototypeO), AsyncIteratorPrototype);
var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
    var _Object$create;
    var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
    }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
    }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
    }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
    }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
    }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
            var data = iterator[kStream].read();
            if (data) {
                iterator[kLastPromise] = null;
                iterator[kLastResolve] = null;
                iterator[kLastReject] = null;
                resolve(createIterResult(data, false));
            }
            else {
                iterator[kLastResolve] = resolve;
                iterator[kLastReject] = reject;
            }
        },
        writable: true
    }), _Object$create));
    iterator[kLastPromise] = null;
    finished(stream, function (err) {
        if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
            // returned by next() and store the error
            if (reject !== null) {
                iterator[kLastPromise] = null;
                iterator[kLastResolve] = null;
                iterator[kLastReject] = null;
                reject(err);
            }
            iterator[kError] = err;
            return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(undefined, true));
        }
        iterator[kEnded] = true;
    });
    stream.on('readable', onReadable.bind(null, iterator));
    return iterator;
};
module.exports = createReadableStreamAsyncIterator;


/***/ }),

/***/ 346:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
        symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; });
    keys.push.apply(keys, symbols);
} return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); });
    }
    else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    }
    else {
        ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); });
    }
} return target; }
function _defineProperty(obj, key, value) { if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
}
else {
    obj[key] = value;
} return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps)
    _defineProperties(Constructor.prototype, protoProps); if (staticProps)
    _defineProperties(Constructor, staticProps); return Constructor; }
var _require = __webpack_require__(636), Buffer = _require.Buffer;
var _require2 = __webpack_require__(854), inspect = _require2.inspect;
var custom = inspect && inspect.custom || 'inspect';
function copyBuffer(src, target, offset) {
    Buffer.prototype.copy.call(src, target, offset);
}
module.exports =
    /*#__PURE__*/
    function () {
        function BufferList() {
            _classCallCheck(this, BufferList);
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
        _createClass(BufferList, [{
                key: "push",
                value: function push(v) {
                    var entry = {
                        data: v,
                        next: null
                    };
                    if (this.length > 0)
                        this.tail.next = entry;
                    else
                        this.head = entry;
                    this.tail = entry;
                    ++this.length;
                }
            }, {
                key: "unshift",
                value: function unshift(v) {
                    var entry = {
                        data: v,
                        next: this.head
                    };
                    if (this.length === 0)
                        this.tail = entry;
                    this.head = entry;
                    ++this.length;
                }
            }, {
                key: "shift",
                value: function shift() {
                    if (this.length === 0)
                        return;
                    var ret = this.head.data;
                    if (this.length === 1)
                        this.head = this.tail = null;
                    else
                        this.head = this.head.next;
                    --this.length;
                    return ret;
                }
            }, {
                key: "clear",
                value: function clear() {
                    this.head = this.tail = null;
                    this.length = 0;
                }
            }, {
                key: "join",
                value: function join(s) {
                    if (this.length === 0)
                        return '';
                    var p = this.head;
                    var ret = '' + p.data;
                    while (p = p.next) {
                        ret += s + p.data;
                    }
                    return ret;
                }
            }, {
                key: "concat",
                value: function concat(n) {
                    if (this.length === 0)
                        return Buffer.alloc(0);
                    var ret = Buffer.allocUnsafe(n >>> 0);
                    var p = this.head;
                    var i = 0;
                    while (p) {
                        copyBuffer(p.data, ret, i);
                        i += p.data.length;
                        p = p.next;
                    }
                    return ret;
                } // Consumes a specified amount of bytes or characters from the buffered data.
            }, {
                key: "consume",
                value: function consume(n, hasStrings) {
                    var ret;
                    if (n < this.head.data.length) {
                        // `slice` is the same for buffers and strings.
                        ret = this.head.data.slice(0, n);
                        this.head.data = this.head.data.slice(n);
                    }
                    else if (n === this.head.data.length) {
                        // First chunk is a perfect match.
                        ret = this.shift();
                    }
                    else {
                        // Result spans more than one buffer.
                        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
                    }
                    return ret;
                }
            }, {
                key: "first",
                value: function first() {
                    return this.head.data;
                } // Consumes a specified amount of characters from the buffered data.
            }, {
                key: "_getString",
                value: function _getString(n) {
                    var p = this.head;
                    var c = 1;
                    var ret = p.data;
                    n -= ret.length;
                    while (p = p.next) {
                        var str = p.data;
                        var nb = n > str.length ? str.length : n;
                        if (nb === str.length)
                            ret += str;
                        else
                            ret += str.slice(0, n);
                        n -= nb;
                        if (n === 0) {
                            if (nb === str.length) {
                                ++c;
                                if (p.next)
                                    this.head = p.next;
                                else
                                    this.head = this.tail = null;
                            }
                            else {
                                this.head = p;
                                p.data = str.slice(nb);
                            }
                            break;
                        }
                        ++c;
                    }
                    this.length -= c;
                    return ret;
                } // Consumes a specified amount of bytes from the buffered data.
            }, {
                key: "_getBuffer",
                value: function _getBuffer(n) {
                    var ret = Buffer.allocUnsafe(n);
                    var p = this.head;
                    var c = 1;
                    p.data.copy(ret);
                    n -= p.data.length;
                    while (p = p.next) {
                        var buf = p.data;
                        var nb = n > buf.length ? buf.length : n;
                        buf.copy(ret, ret.length - n, 0, nb);
                        n -= nb;
                        if (n === 0) {
                            if (nb === buf.length) {
                                ++c;
                                if (p.next)
                                    this.head = p.next;
                                else
                                    this.head = this.tail = null;
                            }
                            else {
                                this.head = p;
                                p.data = buf.slice(nb);
                            }
                            break;
                        }
                        ++c;
                    }
                    this.length -= c;
                    return ret;
                } // Make sure the linked list only shows the minimal necessary information.
            }, {
                key: custom,
                value: function value(_, options) {
                    return inspect(this, _objectSpread({}, options, {
                        // Only inspect one level.
                        depth: 0,
                        // It should not recurse.
                        customInspect: false
                    }));
                }
            }]);
        return BufferList;
    }();


/***/ }),

/***/ 974:
/***/ (function(module) {

"use strict";
 // undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
        if (cb) {
            cb(err);
        }
        else if (err) {
            if (!this._writableState) {
                process.nextTick(emitErrorNT, this, err);
            }
            else if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                process.nextTick(emitErrorNT, this, err);
            }
        }
        return this;
    } // we set destroyed to true before firing error callbacks in order
    // to make it re-entrance safe in case destroy() is called within callbacks
    if (this._readableState) {
        this._readableState.destroyed = true;
    } // if this is a duplex stream mark the writable part as destroyed as well
    if (this._writableState) {
        this._writableState.destroyed = true;
    }
    this._destroy(err || null, function (err) {
        if (!cb && err) {
            if (!_this._writableState) {
                process.nextTick(emitErrorAndCloseNT, _this, err);
            }
            else if (!_this._writableState.errorEmitted) {
                _this._writableState.errorEmitted = true;
                process.nextTick(emitErrorAndCloseNT, _this, err);
            }
            else {
                process.nextTick(emitCloseNT, _this);
            }
        }
        else if (cb) {
            process.nextTick(emitCloseNT, _this);
            cb(err);
        }
        else {
            process.nextTick(emitCloseNT, _this);
        }
    });
    return this;
}
function emitErrorAndCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
}
function emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose)
        return;
    if (self._readableState && !self._readableState.emitClose)
        return;
    self.emit('close');
}
function undestroy() {
    if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
    }
    if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
    }
}
function emitErrorNT(self, err) {
    self.emit('error', err);
}
function errorOrDestroy(stream, err) {
    // We have tests that rely on errors being emitted
    // in the same tick, so changing this is semver major.
    // For now when you opt-in to autoDestroy we allow
    // the error to be emitted nextTick. In a future
    // semver major update we should change the default to this.
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
    else
        stream.emit('error', err);
}
module.exports = {
    destroy: destroy,
    undestroy: undestroy,
    errorOrDestroy: errorOrDestroy
};


/***/ }),

/***/ 678:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).

var ERR_STREAM_PREMATURE_CLOSE = (__webpack_require__(50)/* .codes.ERR_STREAM_PREMATURE_CLOSE */ .q.ERR_STREAM_PREMATURE_CLOSE);
function once(callback) {
    var called = false;
    return function () {
        if (called)
            return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        callback.apply(this, args);
    };
}
function noop() { }
function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === 'function';
}
function eos(stream, opts, callback) {
    if (typeof opts === 'function')
        return eos(stream, null, opts);
    if (!opts)
        opts = {};
    callback = once(callback || noop);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish() {
        if (!stream.writable)
            onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish() {
        writable = false;
        writableEnded = true;
        if (!readable)
            callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend() {
        readable = false;
        readableEnded = true;
        if (!writable)
            callback.call(stream);
    };
    var onerror = function onerror(err) {
        callback.call(stream, err);
    };
    var onclose = function onclose() {
        var err;
        if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended)
                err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended)
                err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
    };
    var onrequest = function onrequest() {
        stream.req.on('finish', onfinish);
    };
    if (isRequest(stream)) {
        stream.on('complete', onfinish);
        stream.on('abort', onclose);
        if (stream.req)
            onrequest();
        else
            stream.on('request', onrequest);
    }
    else if (writable && !stream._writableState) {
        // legacy streams
        stream.on('end', onlegacyfinish);
        stream.on('close', onlegacyfinish);
    }
    stream.on('end', onend);
    stream.on('finish', onfinish);
    if (opts.error !== false)
        stream.on('error', onerror);
    stream.on('close', onclose);
    return function () {
        stream.removeListener('complete', onfinish);
        stream.removeListener('abort', onclose);
        stream.removeListener('request', onrequest);
        if (stream.req)
            stream.req.removeListener('finish', onfinish);
        stream.removeListener('end', onlegacyfinish);
        stream.removeListener('close', onlegacyfinish);
        stream.removeListener('finish', onfinish);
        stream.removeListener('end', onend);
        stream.removeListener('error', onerror);
        stream.removeListener('close', onclose);
    };
}
module.exports = eos;


/***/ }),

/***/ 260:
/***/ (function(module) {

"use strict";

module.exports = function () {
    throw new Error('Readable.from is not available in the browser');
};


/***/ }),

/***/ 732:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).

var eos;
function once(callback) {
    var called = false;
    return function () {
        if (called)
            return;
        called = true;
        callback.apply(void 0, arguments);
    };
}
var _require$codes = (__webpack_require__(50)/* .codes */ .q), ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
function noop(err) {
    // Rethrow the error if it exists to avoid swallowing it
    if (err)
        throw err;
}
function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === 'function';
}
function destroyer(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on('close', function () {
        closed = true;
    });
    if (eos === undefined)
        eos = __webpack_require__(678);
    eos(stream, {
        readable: reading,
        writable: writing
    }, function (err) {
        if (err)
            return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function (err) {
        if (closed)
            return;
        if (destroyed)
            return;
        destroyed = true; // request.destroy just do .end - .abort is what we want
        if (isRequest(stream))
            return stream.abort();
        if (typeof stream.destroy === 'function')
            return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED('pipe'));
    };
}
function call(fn) {
    fn();
}
function pipe(from, to) {
    return from.pipe(to);
}
function popCallback(streams) {
    if (!streams.length)
        return noop;
    if (typeof streams[streams.length - 1] !== 'function')
        return noop;
    return streams.pop();
}
function pipeline() {
    for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
    }
    var callback = popCallback(streams);
    if (Array.isArray(streams[0]))
        streams = streams[0];
    if (streams.length < 2) {
        throw new ERR_MISSING_ARGS('streams');
    }
    var error;
    var destroys = streams.map(function (stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function (err) {
            if (!error)
                error = err;
            if (err)
                destroys.forEach(call);
            if (reading)
                return;
            destroys.forEach(call);
            callback(error);
        });
    });
    return streams.reduce(pipe);
}
module.exports = pipeline;


/***/ }),

/***/ 754:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ERR_INVALID_OPT_VALUE = (__webpack_require__(50)/* .codes.ERR_INVALID_OPT_VALUE */ .q.ERR_INVALID_OPT_VALUE);
function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : 'highWaterMark';
            throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
    } // Default value
    return state.objectMode ? 16 : 16 * 1024;
}
module.exports = {
    getHighWaterMark: getHighWaterMark
};


/***/ }),

/***/ 786:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(722).EventEmitter;


/***/ }),

/***/ 769:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
module.exports = Stream;
var EE = (__webpack_require__(722).EventEmitter);
var inherits = __webpack_require__(409);
inherits(Stream, EE);
Stream.Readable = __webpack_require__(58);
Stream.Writable = __webpack_require__(880);
Stream.Duplex = __webpack_require__(298);
Stream.Transform = __webpack_require__(969);
Stream.PassThrough = __webpack_require__(4);
Stream.finished = __webpack_require__(678);
Stream.pipeline = __webpack_require__(732);
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;
// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.
function Stream() {
    EE.call(this);
}
Stream.prototype.pipe = function (dest, options) {
    var source = this;
    function ondata(chunk) {
        if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
                source.pause();
            }
        }
    }
    source.on('data', ondata);
    function ondrain() {
        if (source.readable && source.resume) {
            source.resume();
        }
    }
    dest.on('drain', ondrain);
    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
        source.on('end', onend);
        source.on('close', onclose);
    }
    var didOnEnd = false;
    function onend() {
        if (didOnEnd)
            return;
        didOnEnd = true;
        dest.end();
    }
    function onclose() {
        if (didOnEnd)
            return;
        didOnEnd = true;
        if (typeof dest.destroy === 'function')
            dest.destroy();
    }
    // don't leave dangling pipes when there are errors.
    function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, 'error') === 0) {
            throw er; // Unhandled stream error in pipe.
        }
    }
    source.on('error', onerror);
    dest.on('error', onerror);
    // remove all the event listeners that were added.
    function cleanup() {
        source.removeListener('data', ondata);
        dest.removeListener('drain', ondrain);
        source.removeListener('end', onend);
        source.removeListener('close', onclose);
        source.removeListener('error', onerror);
        dest.removeListener('error', onerror);
        source.removeListener('end', cleanup);
        source.removeListener('close', cleanup);
        dest.removeListener('close', cleanup);
    }
    source.on('end', cleanup);
    source.on('close', cleanup);
    dest.on('close', cleanup);
    dest.emit('pipe', source);
    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
};


/***/ }),

/***/ 183:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/*<replacement>*/
var Buffer = (__webpack_require__(805).Buffer);
/*</replacement>*/
var isEncoding = Buffer.isEncoding || function (encoding) {
    encoding = '' + encoding;
    switch (encoding && encoding.toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
        default:
            return false;
    }
};
function _normalizeEncoding(enc) {
    if (!enc)
        return 'utf8';
    var retried;
    while (true) {
        switch (enc) {
            case 'utf8':
            case 'utf-8':
                return 'utf8';
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return 'utf16le';
            case 'latin1':
            case 'binary':
                return 'latin1';
            case 'base64':
            case 'ascii':
            case 'hex':
                return enc;
            default:
                if (retried)
                    return; // undefined
                enc = ('' + enc).toLowerCase();
                retried = true;
        }
    }
}
;
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc)))
        throw new Error('Unknown encoding: ' + enc);
    return nenc || enc;
}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.s = StringDecoder;
function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
        case 'utf16le':
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
        case 'utf8':
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
        case 'base64':
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
        default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function (buf) {
    if (buf.length === 0)
        return '';
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined)
            return '';
        i = this.lastNeed;
        this.lastNeed = 0;
    }
    else {
        i = 0;
    }
    if (i < buf.length)
        return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || '';
};
StringDecoder.prototype.end = utf8End;
// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
    if (byte <= 0x7F)
        return 0;
    else if (byte >> 5 === 0x06)
        return 2;
    else if (byte >> 4 === 0x0E)
        return 3;
    else if (byte >> 3 === 0x1E)
        return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i)
        return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0)
            self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2)
        return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0)
            self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2)
        return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2)
                nb = 0;
            else
                self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return '\ufffd';
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined)
        return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
        return buf.toString('utf8', i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString('utf8', i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed)
        return r + '\ufffd';
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString('utf16le', i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
    }
    return r;
}
function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0)
        return buf.toString('base64', i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    }
    else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString('base64', i, buf.length - n);
}
function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed)
        return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : '';
}


/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(636);
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for (var key in src) {
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
}
else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
SafeBuffer.prototype = Object.create(Buffer.prototype);
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function (arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function (size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        }
        else {
            buf.fill(fill);
        }
    }
    else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function (size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function (size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};


/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _forEachArray = _interopRequireDefault(__webpack_require__(695));
var _forEachOwnProperties = _interopRequireDefault(__webpack_require__(175));
var _extend = _interopRequireDefault(__webpack_require__(867));
var _isArray = _interopRequireDefault(__webpack_require__(383));
var _isEmpty = _interopRequireDefault(__webpack_require__(440));
var _isFunction = _interopRequireDefault(__webpack_require__(494));
var _isNull = _interopRequireDefault(__webpack_require__(948));
var _isObject = _interopRequireDefault(__webpack_require__(873));
var _isUndefined = _interopRequireDefault(__webpack_require__(895));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function encodePairs(key, value) {
    return encodeURIComponent(key) + "=" + encodeURIComponent((0, _isNull["default"])(value) || (0, _isUndefined["default"])(value) ? '' : value);
}
function serializeParams(key, value, serializedList) {
    if ((0, _isArray["default"])(value)) {
        (0, _forEachArray["default"])(value, function (arrVal, index) {
            serializeParams(key + "[" + ((0, _isObject["default"])(arrVal) ? index : '') + "]", arrVal, serializedList);
        });
    }
    else if ((0, _isObject["default"])(value)) {
        (0, _forEachOwnProperties["default"])(value, function (objValue, objKey) {
            serializeParams(key + "[" + objKey + "]", objValue, serializedList);
        });
    }
    else {
        serializedList.push(encodePairs(key, value));
    }
}
function serialize(params) {
    if (!params || (0, _isEmpty["default"])(params)) {
        return '';
    }
    var serializedList = [];
    (0, _forEachOwnProperties["default"])(params, function (value, key) {
        serializeParams(key, value, serializedList);
    });
    return serializedList.join('&');
}
var getDefaultOptions = function getDefaultOptions() {
    return {
        baseURL: '',
        headers: {
            common: {},
            get: {},
            post: {},
            put: {},
            "delete": {},
            patch: {},
            options: {},
            head: {}
        },
        serializer: serialize
    };
};
var HTTP_PROTOCOL_REGEXP = /^(http|https):\/\//i;
function combineURL(baseURL, url) {
    if (HTTP_PROTOCOL_REGEXP.test(url)) {
        return url;
    }
    if (baseURL.slice(-1) === '/' && url.slice(0, 1) === '/') {
        url = url.slice(1);
    }
    return baseURL + url;
}
function getComputedOptions(defaultOptions, customOptions) {
    var baseURL = defaultOptions.baseURL, defaultHeaders = defaultOptions.headers, defaultSerializer = defaultOptions.serializer, defaultBeforeRequest = defaultOptions.beforeRequest, defaultSuccess = defaultOptions.success, defaultError = defaultOptions.error, defaultComplete = defaultOptions.complete;
    var url = customOptions.url, contentType = customOptions.contentType, method = customOptions.method, params = customOptions.params, headers = customOptions.headers, serializer = customOptions.serializer, beforeRequest = customOptions.beforeRequest, success = customOptions.success, error = customOptions.error, complete = customOptions.complete, withCredentials = customOptions.withCredentials, mimeType = customOptions.mimeType;
    var options = {
        url: combineURL(baseURL, url),
        method: method,
        params: params,
        headers: (0, _extend["default"])(defaultHeaders.common, defaultHeaders[method.toLowerCase()], headers),
        serializer: serializer || defaultSerializer || serialize,
        beforeRequest: [defaultBeforeRequest, beforeRequest],
        success: [defaultSuccess, success],
        error: [defaultError, error],
        complete: [defaultComplete, complete],
        withCredentials: withCredentials,
        mimeType: mimeType
    };
    options.contentType = contentType || options.headers['Content-Type'];
    delete options.headers['Content-Type'];
    return options;
}
function validateStatus(status) {
    return status >= 200 && status < 300;
}
function hasRequestBody(method) {
    return /^(?:POST|PUT|PATCH)$/.test(method.toUpperCase());
}
function executeCallback(callback, param) {
    if ((0, _isArray["default"])(callback)) {
        (0, _forEachArray["default"])(callback, function (fn) {
            return executeCallback(fn, param);
        });
    }
    else if ((0, _isFunction["default"])(callback)) {
        callback(param);
    }
}
function parseHeaders(text) {
    var headers = {};
    (0, _forEachArray["default"])(text.split('\r\n'), function (header) {
        var _header$split = header.split(': '), key = _header$split[0], value = _header$split[1];
        if (key !== '' && !(0, _isUndefined["default"])(value)) {
            headers[key] = value;
        }
    });
    return headers;
}
function parseJSONData(data) {
    var result = '';
    try {
        result = JSON.parse(data);
    }
    catch (_) {
        result = data;
    }
    return result;
}
var REQUEST_DONE = 4;
function handleReadyStateChange(xhr, options) {
    var readyState = xhr.readyState;
    if (readyState != REQUEST_DONE) {
        return;
    }
    var status = xhr.status, statusText = xhr.statusText, responseText = xhr.responseText;
    var success = options.success, resolve = options.resolve, error = options.error, reject = options.reject, complete = options.complete;
    if (validateStatus(status)) {
        var contentType = xhr.getResponseHeader('Content-Type');
        var data = responseText;
        if (contentType && contentType.indexOf('application/json') > -1) {
            data = parseJSONData(data);
        }
        executeCallback([success, resolve], {
            status: status,
            statusText: statusText,
            data: data,
            headers: parseHeaders(xhr.getAllResponseHeaders())
        });
    }
    else {
        executeCallback([error, reject], {
            status: status,
            statusText: statusText
        });
    }
    executeCallback(complete, {
        status: status,
        statusText: statusText
    });
}
var QS_DELIM_REGEXP = /\?/;
function open(xhr, options) {
    var url = options.url, method = options.method, serializer = options.serializer, params = options.params;
    var requestUrl = url;
    if (!hasRequestBody(method) && params) {
        var qs = (QS_DELIM_REGEXP.test(url) ? '&' : '?') + serializer(params);
        requestUrl = "" + url + qs;
    }
    xhr.open(method, requestUrl);
}
function applyConfig(xhr, options) {
    var method = options.method, contentType = options.contentType, mimeType = options.mimeType, headers = options.headers, _options$withCredenti = options.withCredentials, withCredentials = _options$withCredenti === void 0 ? false : _options$withCredenti;
    if (withCredentials) {
        xhr.withCredentials = withCredentials;
    }
    if (mimeType) {
        xhr.overrideMimeType(mimeType);
    }
    (0, _forEachOwnProperties["default"])(headers, function (value, header) {
        if (!(0, _isObject["default"])(value)) {
            xhr.setRequestHeader(header, value);
        }
    });
    if (hasRequestBody(method)) {
        xhr.setRequestHeader('Content-Type', contentType + "; charset=UTF-8");
    }
    xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
}
var ENCODED_SPACE_REGEXP = /%20/g;
function send(xhr, options) {
    var method = options.method, serializer = options.serializer, beforeRequest = options.beforeRequest, _options$params = options.params, params = _options$params === void 0 ? {} : _options$params, _options$contentType = options.contentType, contentType = _options$contentType === void 0 ? 'application/x-www-form-urlencoded' : _options$contentType;
    var body = null;
    if (hasRequestBody(method)) {
        body = contentType.indexOf('application/x-www-form-urlencoded') > -1 ? serializer(params).replace(ENCODED_SPACE_REGEXP, '+') : JSON.stringify(params);
    }
    xhr.onreadystatechange = function () {
        return handleReadyStateChange(xhr, options);
    };
    executeCallback(beforeRequest, xhr);
    xhr.send(body);
}
function ajax(options) {
    var xhr = new XMLHttpRequest();
    var request = function request(opts) {
        return (0, _forEachArray["default"])([open, applyConfig, send], function (fn) {
            return fn(xhr, opts);
        });
    };
    options = getComputedOptions(ajax.defaults, options);
    if (typeof Promise !== 'undefined') {
        return new Promise(function (resolve, reject) {
            request((0, _extend["default"])(options, {
                resolve: resolve,
                reject: reject
            }));
        });
    }
    request(options);
    return null;
}
ajax.defaults = getDefaultOptions();
ajax._reset = function () {
    ajax.defaults = getDefaultOptions();
};
ajax._request = function (url, method, options) {
    if (options === void 0) {
        options = {};
    }
    return ajax((0, _extend["default"])(options, {
        url: url,
        method: method
    }));
};
(0, _forEachArray["default"])(['get', 'post', 'put', 'delete', 'patch', 'options', 'head'], function (type) {
    ajax[type] = function (url, options) {
        return ajax._request(url, type.toUpperCase(), options);
    };
});
var _default = ajax;
exports["default"] = _default;
module.exports = exports["default"];


/***/ }),

/***/ 187:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* eslint-disable complexity */
/**
 * @fileoverview Returns the first index at which a given element can be found in the array.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

var isArray = __webpack_require__(383);
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

/***/ 695:
/***/ (function(module) {

"use strict";
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

/***/ 175:
/***/ (function(module) {

"use strict";
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

/***/ 867:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Extend the target object from other objects.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

/**
 * @module object
 */
/**
 * Extend the target object from other objects.
 * @param {object} target - Object that will be extended
 * @param {...object} objects - Objects as sources
 * @returns {object} Extended object
 * @memberof module:object
 */
function extend(target, objects) {
    var hasOwnProp = Object.prototype.hasOwnProperty;
    var source, prop, i, len;
    for (i = 1, len = arguments.length; i < len; i += 1) {
        source = arguments[i];
        for (prop in source) {
            if (hasOwnProp.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
}
module.exports = extend;


/***/ }),

/***/ 947:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an arguments object or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

var isExisty = __webpack_require__(325);
/**
 * @module type
 */
/**
 * Check whether the given variable is an arguments object or not.
 * If the given variable is an arguments object, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is arguments?
 * @memberof module:type
 */
function isArguments(obj) {
    var result = isExisty(obj) &&
        ((Object.prototype.toString.call(obj) === '[object Arguments]') || !!obj.callee);
    return result;
}
module.exports = isArguments;


/***/ }),

/***/ 383:
/***/ (function(module) {

"use strict";
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

/***/ 440:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* eslint-disable complexity */
/**
 * @fileoverview Check whether the given variable is empty(null, undefined, or empty array, empty object) or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

var isString = __webpack_require__(994);
var isExisty = __webpack_require__(325);
var isArray = __webpack_require__(383);
var isArguments = __webpack_require__(947);
var isObject = __webpack_require__(873);
var isFunction = __webpack_require__(494);
/**
 * Check whether given argument is empty string
 * @param {*} obj - Target for checking
 * @returns {boolean} whether given argument is empty string
 * @private
 */
function _isEmptyString(obj) {
    return isString(obj) && obj === '';
}
/**
 * Check whether given argument has own property
 * @param {Object} obj - Target for checking
 * @returns {boolean} - whether given argument has own property
 * @private
 */
function _hasOwnProperty(obj) {
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}
/**
 * Check whether the given variable is empty(null, undefined, or empty array, empty object) or not.
 *  If the given variables is empty, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is empty?
 * @memberof module:type
 */
function isEmpty(obj) {
    if (!isExisty(obj) || _isEmptyString(obj)) {
        return true;
    }
    if (isArray(obj) || isArguments(obj)) {
        return obj.length === 0;
    }
    if (isObject(obj) && !isFunction(obj)) {
        return !_hasOwnProperty(obj);
    }
    return true;
}
module.exports = isEmpty;


/***/ }),

/***/ 325:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is existing or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

var isUndefined = __webpack_require__(895);
var isNull = __webpack_require__(948);
/**
 * Check whether the given variable is existing or not.
 * If the given variable is not null and not undefined, returns true.
 * @param {*} param - Target for checking
 * @returns {boolean} Is existy?
 * @memberof module:type
 * @example
 * // ES6
 * import isExisty from 'tui-code-snippet/type/isExisty');
 *
 * // CommonJS
 * const isExisty = require('tui-code-snippet/type/isExisty');
 *
 * isExisty(''); //true
 * isExisty(0); //true
 * isExisty([]); //true
 * isExisty({}); //true
 * isExisty(null); //false
 * isExisty(undefined); //false
*/
function isExisty(param) {
    return !isUndefined(param) && !isNull(param);
}
module.exports = isExisty;


/***/ }),

/***/ 494:
/***/ (function(module) {

"use strict";
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

/***/ 948:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is null or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

/**
 * Check whether the given variable is null or not.
 * If the given variable(arguments[0]) is null, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is null?
 * @memberof module:type
 */
function isNull(obj) {
    return obj === null;
}
module.exports = isNull;


/***/ }),

/***/ 873:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an object or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

/**
 * Check whether the given variable is an object or not.
 * If the given variable is an object, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is object?
 * @memberof module:type
 */
function isObject(obj) {
    return obj === Object(obj);
}
module.exports = isObject;


/***/ }),

/***/ 994:
/***/ (function(module) {

"use strict";
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

/***/ 895:
/***/ (function(module) {

"use strict";
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


/***/ }),

/***/ 485:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/**
 * Module exports.
 */
module.exports = deprecate;
/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */
function deprecate(fn, msg) {
    if (config('noDeprecation')) {
        return fn;
    }
    var warned = false;
    function deprecated() {
        if (!warned) {
            if (config('throwDeprecation')) {
                throw new Error(msg);
            }
            else if (config('traceDeprecation')) {
                console.trace(msg);
            }
            else {
                console.warn(msg);
            }
            warned = true;
        }
        return fn.apply(this, arguments);
    }
    return deprecated;
}
/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */
function config(name) {
    // accessing global.localStorage can trigger a DOMException in sandboxed iframes
    try {
        if (!__webpack_require__.g.localStorage)
            return false;
    }
    catch (_) {
        return false;
    }
    var val = __webpack_require__.g.localStorage[name];
    if (null == val)
        return false;
    return String(val).toLowerCase() === 'true';
}


/***/ }),

/***/ 571:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__571__;

/***/ }),

/***/ 854:
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ 602:
/***/ (function() {

/* (ignored) */

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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ chartPlugin; }
});

// UNUSED EXPORTS: detectDelimiter, parse, parseToChartData, parseToChartOption, setDefaultOptions

// EXTERNAL MODULE: external {"commonjs":"@toast-ui/chart","commonjs2":"@toast-ui/chart","amd":"@toast-ui/chart","root":["toastui","Chart"]}
var chart_root_toastui_Chart_ = __webpack_require__(571);
var chart_root_toastui_Chart_default = /*#__PURE__*/__webpack_require__.n(chart_root_toastui_Chart_);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isString.js
var isString = __webpack_require__(994);
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isUndefined.js
var isUndefined = __webpack_require__(895);
var isUndefined_default = /*#__PURE__*/__webpack_require__.n(isUndefined);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/array/inArray.js
var inArray = __webpack_require__(187);
var inArray_default = /*#__PURE__*/__webpack_require__.n(inArray);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/object/extend.js
var extend = __webpack_require__(867);
var extend_default = /*#__PURE__*/__webpack_require__.n(extend);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/ajax/index.js
var ajax = __webpack_require__(863);
var ajax_default = /*#__PURE__*/__webpack_require__.n(ajax);
;// CONCATENATED MODULE: ./src/csv.js
/* eslint-disable */
/*
 CSV-JS - A Comma-Separated Values parser for JS

 Built to rfc4180 standard, with options for adjusting strictness:
    - optional carriage returns for non-microsoft sources
    - automatically type-cast numeric an boolean values
    - relaxed mode which: ignores blank lines, ignores gargabe following quoted tokens, does not enforce a consistent record length

 Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 Author Greg Kindel (twitter @gkindel), 2014
 */
/**
 * @modifier NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 */

/**
 * @name CSV
 * @namespace
 * @ignore
 */
// implemented as a singleton because JS is single threaded
var CSV = {};
CSV.RELAXED = false;
CSV.IGNORE_RECORD_LENGTH = false;
CSV.IGNORE_QUOTES = false;
CSV.LINE_FEED_OK = true;
CSV.CARRIAGE_RETURN_OK = true;
CSV.DETECT_TYPES = true;
CSV.IGNORE_QUOTE_WHITESPACE = true;
CSV.DEBUG = false;
CSV.COLUMN_SEPARATOR = ',';
CSV.ERROR_EOF = 'UNEXPECTED_END_OF_FILE';
CSV.ERROR_CHAR = 'UNEXPECTED_CHARACTER';
CSV.ERROR_EOL = 'UNEXPECTED_END_OF_RECORD';
CSV.WARN_SPACE = 'UNEXPECTED_WHITESPACE'; // not per spec, but helps debugging
var QUOTE = '"', CR = '\r', LF = '\n', SPACE = ' ', TAB = '\t';
// states
var PRE_TOKEN = 0, MID_TOKEN = 1, POST_TOKEN = 2, POST_RECORD = 4;
/**
 * @name CSV.parse
 * @function
 * @description rfc4180 standard csv parse
 * with options for strictness and data type conversion
 * By default, will automatically type-cast numeric an boolean values.
 * @param {String} str A CSV string
 * @return {Array} An array records, each of which is an array of scalar values.
 * @example
 * // simple
 * var rows = CSV.parse("one,two,three\nfour,five,six")
 * // rows equals [["one","two","three"],["four","five","six"]]
 * @example
 * // Though not a jQuery plugin, it is recommended to use with the $.ajax pipe() method:
 * $.get("csv.txt")
 *    .pipe( CSV.parse )
 *    .done( function(rows) {
 *        for( var i =0; i < rows.length; i++){
 *            console.log(rows[i])
 *        }
 *  });
 * @see http://www.ietf.org/rfc/rfc4180.txt
 */
CSV.parse = function (str) {
    var result = (CSV.result = []);
    CSV.COLUMN_SEPARATOR =
        CSV.COLUMN_SEPARATOR instanceof RegExp
            ? new RegExp('^' + CSV.COLUMN_SEPARATOR.source)
            : CSV.COLUMN_SEPARATOR;
    CSV.offset = 0;
    CSV.str = str;
    CSV.record_begin();
    CSV.debug('parse()', str);
    var c;
    while (1) {
        // pull char
        c = str[CSV.offset++];
        CSV.debug('c', c);
        // detect eof
        if (c == null) {
            if (CSV.escaped) {
                CSV.error(CSV.ERROR_EOF);
            }
            if (CSV.record) {
                CSV.token_end();
                CSV.record_end();
            }
            CSV.debug('...bail', c, CSV.state, CSV.record);
            CSV.reset();
            break;
        }
        if (CSV.record == null) {
            // if relaxed mode, ignore blank lines
            if (CSV.RELAXED && (c == LF || (c == CR && str[CSV.offset + 1] == LF))) {
                continue;
            }
            CSV.record_begin();
        }
        // pre-token: look for start of escape sequence
        if (CSV.state == PRE_TOKEN) {
            if ((c === SPACE || c === TAB) && CSV.next_nonspace() == QUOTE) {
                if (CSV.RELAXED || CSV.IGNORE_QUOTE_WHITESPACE) {
                    continue;
                }
                else {
                    // not technically an error, but ambiguous and hard to debug otherwise
                    CSV.warn(CSV.WARN_SPACE);
                }
            }
            if (c == QUOTE && !CSV.IGNORE_QUOTES) {
                CSV.debug('...escaped start', c);
                CSV.escaped = true;
                CSV.state = MID_TOKEN;
                continue;
            }
            CSV.state = MID_TOKEN;
        }
        // mid-token and escaped, look for sequences and end quote
        if (CSV.state == MID_TOKEN && CSV.escaped) {
            if (c == QUOTE) {
                if (str[CSV.offset] == QUOTE) {
                    CSV.debug('...escaped quote', c);
                    CSV.token += QUOTE;
                    CSV.offset++;
                }
                else {
                    CSV.debug('...escaped end', c);
                    CSV.escaped = false;
                    CSV.state = POST_TOKEN;
                }
            }
            else {
                CSV.token += c;
                CSV.debug('...escaped add', c, CSV.token);
            }
            continue;
        }
        // fall-through: mid-token or post-token, not escaped
        if (c == CR) {
            if (str[CSV.offset] == LF)
                CSV.offset++;
            else if (!CSV.CARRIAGE_RETURN_OK)
                CSV.error(CSV.ERROR_CHAR);
            CSV.token_end();
            CSV.record_end();
        }
        else if (c == LF) {
            if (!(CSV.LINE_FEED_OK || CSV.RELAXED))
                CSV.error(CSV.ERROR_CHAR);
            CSV.token_end();
            CSV.record_end();
        }
        else if (CSV.test_regex_separator(str) || CSV.COLUMN_SEPARATOR == c) {
            CSV.token_end();
        }
        else if (CSV.state == MID_TOKEN) {
            CSV.token += c;
            CSV.debug('...add', c, CSV.token);
        }
        else if (c === SPACE || c === TAB) {
            if (!CSV.IGNORE_QUOTE_WHITESPACE)
                CSV.error(CSV.WARN_SPACE);
        }
        else if (!CSV.RELAXED) {
            CSV.error(CSV.ERROR_CHAR);
        }
    }
    return result;
};
/**
 * @name CSV.stream
 * @function
 * @description stream a CSV file
 * @example
 * node -e "c=require('CSV-JS');require('fs').createReadStream('csv.txt').pipe(c.stream()).pipe(c.stream.json()).pipe(process.stdout)"
 * @ignore
 */
CSV.stream = function () {
    var stream = __webpack_require__(769);
    var s = new stream.Transform({ objectMode: true });
    s.EOL = '\n';
    s.prior = '';
    s.emitter = (function (s) {
        return function (e) {
            s.push(CSV.parse(e + s.EOL));
        };
    })(s);
    s._transform = function (chunk, encoding, done) {
        var lines = this.prior == ''
            ? chunk.toString().split(this.EOL)
            : (this.prior + chunk.toString()).split(this.EOL);
        this.prior = lines.pop();
        lines.forEach(this.emitter);
        done();
    };
    s._flush = function (done) {
        if (this.prior != '') {
            this.emitter(this.prior);
            this.prior = '';
        }
        done();
    };
    return s;
};
CSV.test_regex_separator = function (str) {
    if (!(CSV.COLUMN_SEPARATOR instanceof RegExp)) {
        return false;
    }
    var match;
    str = str.slice(CSV.offset - 1);
    match = CSV.COLUMN_SEPARATOR.exec(str);
    if (match) {
        CSV.offset += match[0].length - 1;
    }
    return match !== null;
};
CSV.stream.json = function () {
    var os = __webpack_require__(983);
    var stream = __webpack_require__(769);
    var s = new streamTransform({ objectMode: true });
    s._transform = function (chunk, encoding, done) {
        s.push(JSON.stringify(chunk.toString()) + os.EOL);
        done();
    };
    return s;
};
CSV.reset = function () {
    CSV.state = null;
    CSV.token = null;
    CSV.escaped = null;
    CSV.record = null;
    CSV.offset = null;
    CSV.result = null;
    CSV.str = null;
};
CSV.next_nonspace = function () {
    var i = CSV.offset;
    var c;
    while (i < CSV.str.length) {
        c = CSV.str[i++];
        if (!(c == SPACE || c === TAB)) {
            return c;
        }
    }
    return null;
};
CSV.record_begin = function () {
    CSV.escaped = false;
    CSV.record = [];
    CSV.token_begin();
    CSV.debug('record_begin');
};
CSV.record_end = function () {
    CSV.state = POST_RECORD;
    if (!(CSV.IGNORE_RECORD_LENGTH || CSV.RELAXED) &&
        CSV.result.length > 0 &&
        CSV.record.length != CSV.result[0].length) {
        CSV.error(CSV.ERROR_EOL);
    }
    CSV.result.push(CSV.record);
    CSV.debug('record end', CSV.record);
    CSV.record = null;
};
CSV.resolve_type = function (token) {
    if (token.match(/^[-+]?[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?$/)) {
        token = parseFloat(token);
    }
    else if (token.match(/^(true|false)$/i)) {
        token = Boolean(token.match(/true/i));
    }
    else if (token === 'undefined') {
        token = undefined;
    }
    else if (token === 'null') {
        token = null;
    }
    return token;
};
CSV.token_begin = function () {
    CSV.state = PRE_TOKEN;
    // considered using array, but http://www.sitepen.com/blog/2008/05/09/string-performance-an-analysis/
    CSV.token = '';
};
CSV.token_end = function () {
    if (CSV.DETECT_TYPES) {
        CSV.token = CSV.resolve_type(CSV.token);
    }
    CSV.record.push(CSV.token);
    CSV.debug('token end', CSV.token);
    CSV.token_begin();
};
CSV.debug = function () {
    if (CSV.DEBUG)
        console.log(arguments);
};
CSV.dump = function (msg) {
    return [
        msg,
        'at char',
        CSV.offset,
        ':',
        CSV.str
            .substr(CSV.offset - 50, 50)
            .replace(/\r/gm, '\\r')
            .replace(/\n/gm, '\\n')
            .replace(/\t/gm, '\\t'),
    ].join(' ');
};
CSV.error = function (err) {
    var msg = CSV.dump(err);
    CSV.reset();
    throw msg;
};
CSV.warn = function (err) {
    if (!CSV.DEBUG) {
        return;
    }
    var msg = CSV.dump(err);
    try {
        console.warn(msg);
        return;
    }
    catch (e) { }
    try {
        console.log(msg);
    }
    catch (e) { }
};
/* harmony default export */ var csv = (CSV);

;// CONCATENATED MODULE: ./src/util.ts
function trimKeepingTabs(text) {
    return text.replace(/(^(\s*[\n\r])+)|([\n\r]+\s*$)/g, '');
}
function isNumeric(text) {
    var mayBeNum = Number(text);
    return !isNaN(mayBeNum) && isFinite(mayBeNum);
}
function clamp(value, min, max) {
    var _a;
    if (min > max) {
        _a = [min, max], max = _a[0], min = _a[1];
    }
    return Math.max(min, Math.min(value, max));
}

;// CONCATENATED MODULE: ./src/index.ts
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





// @ts-ignore



// csv configuration
csv.IGNORE_QUOTE_WHITESPACE = false;
csv.IGNORE_RECORD_LENGTH = true;
csv.DETECT_TYPES = false;
var reEOL = /[\n\r]/;
var reGroupByDelimiter = /([^:]+)?:?(.*)/;
var DEFAULT_DELIMITER = /\s+/;
var DELIMITERS = [',', '\t'];
var MINIMUM_DELIM_CNT = 2;
var SUPPORTED_CHART_TYPES = ['bar', 'column', 'line', 'area', 'pie'];
var CATEGORY_CHART_TYPES = ['line', 'area'];
var DEFAULT_DIMENSION_OPTIONS = {
    minWidth: 0,
    maxWidth: Infinity,
    minHeight: 0,
    maxHeight: Infinity,
    height: 'auto',
    width: 'auto',
};
var RESERVED_KEYS = ['type', 'url'];
var chart = {
    bar: (chart_root_toastui_Chart_default()).barChart,
    column: (chart_root_toastui_Chart_default()).columnChart,
    area: (chart_root_toastui_Chart_default()).areaChart,
    line: (chart_root_toastui_Chart_default()).lineChart,
    pie: (chart_root_toastui_Chart_default()).pieChart,
};
var chartMap = {};
function parse(text, callback) {
    var _a;
    text = trimKeepingTabs(text);
    var _b = text.split(/\n{2,}/), firstTexts = _b[0], secondTexts = _b[1];
    var urlOptions = parseToChartOption(firstTexts);
    var url = (_a = urlOptions === null || urlOptions === void 0 ? void 0 : urlOptions.editorChart) === null || _a === void 0 ? void 0 : _a.url;
    // if first text is `options` and has `url` option, fetch data from url
    if (isString_default()(url)) {
        // url option provided
        // fetch data from url
        var success = function (_a) {
            var data = _a.data;
            callback({ data: parseToChartData(data), options: parseToChartOption(firstTexts) });
        };
        var error = function () { return callback(); };
        ajax_default().get(url, { success: success, error: error });
    }
    else {
        var data = parseToChartData(firstTexts);
        var options = parseToChartOption(secondTexts);
        callback({ data: data, options: options });
    }
}
function detectDelimiter(text) {
    var delimiter = DEFAULT_DELIMITER;
    var delimCnt = 0;
    text = trimKeepingTabs(text);
    DELIMITERS.forEach(function (delim) {
        var matched = text.match(new RegExp(delim, 'g'));
        if ((matched === null || matched === void 0 ? void 0 : matched.length) > Math.max(MINIMUM_DELIM_CNT, delimCnt)) {
            delimiter = delim;
            delimCnt = matched.length;
        }
    });
    return delimiter;
}
function parseToChartData(text, delimiter) {
    // trim all heading/trailing blank lines
    text = trimKeepingTabs(text);
    // @ts-ignore
    csv.COLUMN_SEPARATOR = delimiter || detectDelimiter(text);
    var dsv = csv.parse(text);
    // trim all values in 2D array
    dsv = dsv.map(function (arr) { return arr.map(function (val) { return val.trim(); }); });
    // test a first row for legends. ['anything', '1', '2', '3'] === false, ['anything', 't1', '2', 't3'] === true
    var hasLegends = dsv[0]
        .filter(function (_, i) { return i > 0; })
        .reduce(function (hasNaN, item) { return hasNaN || !isNumeric(item); }, false);
    var legends = hasLegends ? dsv.shift() : [];
    // test a first column for categories
    var hasCategories = dsv.slice(1).reduce(function (hasNaN, row) { return hasNaN || !isNumeric(row[0]); }, false);
    var categories = hasCategories ? dsv.map(function (arr) { return arr.shift(); }) : [];
    if (hasCategories) {
        legends.shift();
    }
    // transpose dsv, parse number
    // [['1','2','3']    [[1,4,7]
    //  ['4','5','6'] =>  [2,5,8]
    //  ['7','8','9']]    [3,6,9]]
    var tdsv = dsv[0].map(function (_, i) { return dsv.map(function (x) { return parseFloat(x[i]); }); });
    // make series
    var series = tdsv.map(function (data, i) {
        return hasLegends
            ? {
                name: legends[i],
                data: data,
            }
            : {
                data: data,
            };
    });
    return { categories: categories, series: series };
}
function createOptionKeys(keyString) {
    var keys = keyString.trim().split('.');
    var topKey = keys[0];
    if (inArray_default()(topKey, RESERVED_KEYS) >= 0) {
        // reserved keys for chart plugin option
        keys.unshift('editorChart');
    }
    else if (keys.length === 1) {
        // short names for `chart`
        keys.unshift('chart');
    }
    else if (topKey === 'x' || topKey === 'y') {
        // short-handed keys
        keys[0] = topKey + "Axis";
    }
    return keys;
}
function parseToChartOption(text) {
    var options = {};
    if (!isUndefined_default()(text)) {
        var lineTexts = text.split(reEOL);
        lineTexts.forEach(function (lineText) {
            var matched = lineText.match(reGroupByDelimiter);
            if (matched) {
                // keyString can be nested object keys
                // ex) key1.key2.key3: value
                // eslint-disable-next-line prefer-const
                var keyString = matched[1], value_1 = matched[2];
                if (value_1) {
                    try {
                        value_1 = JSON.parse(value_1.trim());
                    }
                    catch (e) {
                        value_1 = value_1.trim();
                    }
                    var keys_1 = createOptionKeys(keyString);
                    var refOptions_1 = options;
                    keys_1.forEach(function (key, index) {
                        refOptions_1[key] = refOptions_1[key] || (keys_1.length - 1 === index ? value_1 : {});
                        // should change the ref option object to assign nested property
                        refOptions_1 = refOptions_1[key];
                    });
                }
            }
        });
    }
    return options;
}
function getAdjustedDimension(size, containerWidth) {
    return size === 'auto' ? containerWidth : size;
}
function getChartDimension(chartOptions, pluginOptions, chartContainer) {
    var dimensionOptions = extend_default()(__assign({}, DEFAULT_DIMENSION_OPTIONS), pluginOptions);
    var maxWidth = dimensionOptions.maxWidth, minWidth = dimensionOptions.minWidth, maxHeight = dimensionOptions.maxHeight, minHeight = dimensionOptions.minHeight;
    // if no width or height specified, set width and height to container width
    var containerWidth = chartContainer.getBoundingClientRect().width;
    var _a = chartOptions.chart, _b = _a.width, width = _b === void 0 ? dimensionOptions.width : _b, _c = _a.height, height = _c === void 0 ? dimensionOptions.height : _c;
    width = getAdjustedDimension(width, containerWidth);
    height = getAdjustedDimension(height, containerWidth);
    return {
        width: clamp(width, minWidth, maxWidth),
        height: clamp(height, minHeight, maxHeight),
    };
}
function setDefaultOptions(chartOptions, pluginOptions, chartContainer) {
    chartOptions = extend_default()({
        editorChart: {},
        chart: {},
        exportMenu: {},
    }, chartOptions);
    var _a = getChartDimension(chartOptions, pluginOptions, chartContainer), width = _a.width, height = _a.height;
    chartOptions.chart.width = width;
    chartOptions.chart.height = height;
    // default chart type
    chartOptions.editorChart.type = chartOptions.editorChart.type || 'column';
    // default visibility of export menu
    chartOptions.exportMenu.visible = !!chartOptions.exportMenu.visible;
    return chartOptions;
}
function destroyChart() {
    Object.keys(chartMap).forEach(function (id) {
        var container = document.querySelector("[data-chart-id=" + id + "]");
        if (!container) {
            chartMap[id].destroy();
            delete chartMap[id];
        }
    });
}
function renderChart(id, text, usageStatistics, pluginOptions) {
    // should draw the chart after rendering container element
    var chartContainer = document.querySelector("[data-chart-id=" + id + "]");
    destroyChart();
    if (chartContainer) {
        try {
            parse(text, function (parsedInfo) {
                var _a = parsedInfo || {}, data = _a.data, options = _a.options;
                var chartOptions = setDefaultOptions(options, pluginOptions, chartContainer);
                var chartType = chartOptions.editorChart.type;
                if (!data ||
                    (CATEGORY_CHART_TYPES.indexOf(chartType) > -1 &&
                        data.categories.length !== data.series[0].data.length)) {
                    chartContainer.innerHTML = 'invalid chart data';
                }
                else if (SUPPORTED_CHART_TYPES.indexOf(chartType) < 0) {
                    chartContainer.innerHTML = "invalid chart type. type: bar, column, line, area, pie";
                }
                else {
                    var toastuiChart = chart[chartType];
                    chartOptions.usageStatistics = usageStatistics;
                    // @ts-ignore
                    chartMap[id] = toastuiChart({ el: chartContainer, data: data, options: chartOptions });
                }
            });
        }
        catch (e) {
            chartContainer.innerHTML = 'invalid chart data';
        }
    }
}
function generateId() {
    return "chart-" + Math.random().toString(36).substr(2, 10);
}
var timer = null;
function clearTimer() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
}
/**
 * Chart plugin
 * @param {Object} context - plugin context for communicating with editor
 * @param {Object} options - chart options
 * @param {number} [options.minWidth=0] - minimum width
 * @param {number} [options.minHeight=0] - minimum height
 * @param {number} [options.maxWidth=Infinity] - maximum width
 * @param {number} [options.maxHeight=Infinity] - maximum height
 * @param {number|string} [options.width='auto'] - default width
 * @param {number|string} [options.height='auto'] - default height
 */
function chartPlugin(_a, options) {
    var _b = _a.usageStatistics, usageStatistics = _b === void 0 ? true : _b;
    return {
        toHTMLRenderers: {
            chart: function (node) {
                var id = generateId();
                clearTimer();
                timer = setTimeout(function () {
                    renderChart(id, node.literal, usageStatistics, options);
                });
                return [
                    {
                        type: 'openTag',
                        tagName: 'div',
                        outerNewLine: true,
                        attributes: { 'data-chart-id': id },
                    },
                    { type: 'closeTag', tagName: 'div', outerNewLine: true },
                ];
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