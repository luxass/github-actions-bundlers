'use strict';

var process$1 = require('node:process');
var require$$0 = require('os');
var require$$0$1 = require('fs');
var require$$0$2 = require('path');
var require$$2$1 = require('http');
var require$$3 = require('https');
require('net');
var require$$1 = require('tls');
var require$$4 = require('events');
require('assert');
var require$$6 = require('util');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var core = {};

var command = {};

var utils = {};

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(utils, "__esModule", { value: true });
utils.toCommandProperties = utils.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
utils.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
utils.toCommandProperties = toCommandProperties;

var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(command, "__esModule", { value: true });
command.issue = command.issueCommand = void 0;
const os$1 = __importStar$1(require$$0);
const utils_1$1 = utils;
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os$1.EOL);
}
command.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
command.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1$1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1$1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}

var fileCommand = {};

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || stringify(b);
}

function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL$1 = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35 (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = parse(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return stringify(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL$1;
  return generateUUID;
}

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var v3 = v35('v3', 0x30, md5);
var v3$1 = v3;

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var v5 = v35('v5', 0x50, sha1);
var v5$1 = v5;

var nil = '00000000-0000-0000-0000-000000000000';

function version(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var esmBrowser = /*#__PURE__*/Object.freeze({
	__proto__: null,
	NIL: nil,
	parse: parse,
	stringify: stringify,
	v1: v1,
	v3: v3$1,
	v4: v4,
	v5: v5$1,
	validate: validate,
	version: version
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(esmBrowser);

// For internal use, subject to change.
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(fileCommand, "__esModule", { value: true });
fileCommand.prepareKeyValueMessage = fileCommand.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(require$$0$1);
const os = __importStar(require$$0);
const uuid_1 = require$$2;
const utils_1 = utils;
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
fileCommand.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
fileCommand.prepareKeyValueMessage = prepareKeyValueMessage;

var oidcUtils = {};

var lib = {};

var proxy = {};

Object.defineProperty(proxy, "__esModule", { value: true });
proxy.checkBypass = proxy.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        try {
            return new URL(proxyVar);
        }
        catch (_a) {
            if (!proxyVar.startsWith('http://') && !proxyVar.startsWith('https://'))
                return new URL(`http://${proxyVar}`);
        }
    }
    else {
        return undefined;
    }
}
proxy.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
        return true;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperNoProxyItem === '*' ||
            upperReqHosts.some(x => x === upperNoProxyItem ||
                x.endsWith(`.${upperNoProxyItem}`) ||
                (upperNoProxyItem.startsWith('.') &&
                    x.endsWith(`${upperNoProxyItem}`)))) {
            return true;
        }
    }
    return false;
}
proxy.checkBypass = checkBypass;
function isLoopbackAddress(host) {
    const hostLower = host.toLowerCase();
    return (hostLower === 'localhost' ||
        hostLower.startsWith('127.') ||
        hostLower.startsWith('[::1]') ||
        hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
}

var tunnel$1 = {};

var tls = require$$1;
var http = require$$2$1;
var https = require$$3;
var events = require$$4;
var util = require$$6;


tunnel$1.httpOverHttp = httpOverHttp;
tunnel$1.httpsOverHttp = httpsOverHttp;
tunnel$1.httpOverHttps = httpOverHttps;
tunnel$1.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket);
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  };
} else {
  debug = function() {};
}
tunnel$1.debug = debug; // for test

var tunnel = tunnel$1;

(function (exports) {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
	const http = __importStar(require$$2$1);
	const https = __importStar(require$$3);
	const pm = __importStar(proxy);
	const tunnel$1 = __importStar(tunnel);
	var HttpCodes;
	(function (HttpCodes) {
	    HttpCodes[HttpCodes["OK"] = 200] = "OK";
	    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
	    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
	    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
	    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
	    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
	    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
	    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
	    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
	    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
	    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
	    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
	    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
	    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
	    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
	    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
	    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
	    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
	    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
	    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
	    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
	    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
	    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
	    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
	    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
	    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
	    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
	})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
	var Headers;
	(function (Headers) {
	    Headers["Accept"] = "accept";
	    Headers["ContentType"] = "content-type";
	})(Headers = exports.Headers || (exports.Headers = {}));
	var MediaTypes;
	(function (MediaTypes) {
	    MediaTypes["ApplicationJson"] = "application/json";
	})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
	/**
	 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
	 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
	 */
	function getProxyUrl(serverUrl) {
	    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
	    return proxyUrl ? proxyUrl.href : '';
	}
	exports.getProxyUrl = getProxyUrl;
	const HttpRedirectCodes = [
	    HttpCodes.MovedPermanently,
	    HttpCodes.ResourceMoved,
	    HttpCodes.SeeOther,
	    HttpCodes.TemporaryRedirect,
	    HttpCodes.PermanentRedirect
	];
	const HttpResponseRetryCodes = [
	    HttpCodes.BadGateway,
	    HttpCodes.ServiceUnavailable,
	    HttpCodes.GatewayTimeout
	];
	const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
	const ExponentialBackoffCeiling = 10;
	const ExponentialBackoffTimeSlice = 5;
	class HttpClientError extends Error {
	    constructor(message, statusCode) {
	        super(message);
	        this.name = 'HttpClientError';
	        this.statusCode = statusCode;
	        Object.setPrototypeOf(this, HttpClientError.prototype);
	    }
	}
	exports.HttpClientError = HttpClientError;
	class HttpClientResponse {
	    constructor(message) {
	        this.message = message;
	    }
	    readBody() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
	                let output = Buffer.alloc(0);
	                this.message.on('data', (chunk) => {
	                    output = Buffer.concat([output, chunk]);
	                });
	                this.message.on('end', () => {
	                    resolve(output.toString());
	                });
	            }));
	        });
	    }
	    readBodyBuffer() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
	                const chunks = [];
	                this.message.on('data', (chunk) => {
	                    chunks.push(chunk);
	                });
	                this.message.on('end', () => {
	                    resolve(Buffer.concat(chunks));
	                });
	            }));
	        });
	    }
	}
	exports.HttpClientResponse = HttpClientResponse;
	function isHttps(requestUrl) {
	    const parsedUrl = new URL(requestUrl);
	    return parsedUrl.protocol === 'https:';
	}
	exports.isHttps = isHttps;
	class HttpClient {
	    constructor(userAgent, handlers, requestOptions) {
	        this._ignoreSslError = false;
	        this._allowRedirects = true;
	        this._allowRedirectDowngrade = false;
	        this._maxRedirects = 50;
	        this._allowRetries = false;
	        this._maxRetries = 1;
	        this._keepAlive = false;
	        this._disposed = false;
	        this.userAgent = userAgent;
	        this.handlers = handlers || [];
	        this.requestOptions = requestOptions;
	        if (requestOptions) {
	            if (requestOptions.ignoreSslError != null) {
	                this._ignoreSslError = requestOptions.ignoreSslError;
	            }
	            this._socketTimeout = requestOptions.socketTimeout;
	            if (requestOptions.allowRedirects != null) {
	                this._allowRedirects = requestOptions.allowRedirects;
	            }
	            if (requestOptions.allowRedirectDowngrade != null) {
	                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
	            }
	            if (requestOptions.maxRedirects != null) {
	                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
	            }
	            if (requestOptions.keepAlive != null) {
	                this._keepAlive = requestOptions.keepAlive;
	            }
	            if (requestOptions.allowRetries != null) {
	                this._allowRetries = requestOptions.allowRetries;
	            }
	            if (requestOptions.maxRetries != null) {
	                this._maxRetries = requestOptions.maxRetries;
	            }
	        }
	    }
	    options(requestUrl, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
	        });
	    }
	    get(requestUrl, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request('GET', requestUrl, null, additionalHeaders || {});
	        });
	    }
	    del(requestUrl, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
	        });
	    }
	    post(requestUrl, data, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request('POST', requestUrl, data, additionalHeaders || {});
	        });
	    }
	    patch(requestUrl, data, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
	        });
	    }
	    put(requestUrl, data, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request('PUT', requestUrl, data, additionalHeaders || {});
	        });
	    }
	    head(requestUrl, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
	        });
	    }
	    sendStream(verb, requestUrl, stream, additionalHeaders) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.request(verb, requestUrl, stream, additionalHeaders);
	        });
	    }
	    /**
	     * Gets a typed object from an endpoint
	     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
	     */
	    getJson(requestUrl, additionalHeaders = {}) {
	        return __awaiter(this, void 0, void 0, function* () {
	            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
	            const res = yield this.get(requestUrl, additionalHeaders);
	            return this._processResponse(res, this.requestOptions);
	        });
	    }
	    postJson(requestUrl, obj, additionalHeaders = {}) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const data = JSON.stringify(obj, null, 2);
	            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
	            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
	            const res = yield this.post(requestUrl, data, additionalHeaders);
	            return this._processResponse(res, this.requestOptions);
	        });
	    }
	    putJson(requestUrl, obj, additionalHeaders = {}) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const data = JSON.stringify(obj, null, 2);
	            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
	            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
	            const res = yield this.put(requestUrl, data, additionalHeaders);
	            return this._processResponse(res, this.requestOptions);
	        });
	    }
	    patchJson(requestUrl, obj, additionalHeaders = {}) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const data = JSON.stringify(obj, null, 2);
	            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
	            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
	            const res = yield this.patch(requestUrl, data, additionalHeaders);
	            return this._processResponse(res, this.requestOptions);
	        });
	    }
	    /**
	     * Makes a raw http request.
	     * All other methods such as get, post, patch, and request ultimately call this.
	     * Prefer get, del, post and patch
	     */
	    request(verb, requestUrl, data, headers) {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this._disposed) {
	                throw new Error('Client has already been disposed.');
	            }
	            const parsedUrl = new URL(requestUrl);
	            let info = this._prepareRequest(verb, parsedUrl, headers);
	            // Only perform retries on reads since writes may not be idempotent.
	            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
	                ? this._maxRetries + 1
	                : 1;
	            let numTries = 0;
	            let response;
	            do {
	                response = yield this.requestRaw(info, data);
	                // Check if it's an authentication challenge
	                if (response &&
	                    response.message &&
	                    response.message.statusCode === HttpCodes.Unauthorized) {
	                    let authenticationHandler;
	                    for (const handler of this.handlers) {
	                        if (handler.canHandleAuthentication(response)) {
	                            authenticationHandler = handler;
	                            break;
	                        }
	                    }
	                    if (authenticationHandler) {
	                        return authenticationHandler.handleAuthentication(this, info, data);
	                    }
	                    else {
	                        // We have received an unauthorized response but have no handlers to handle it.
	                        // Let the response return to the caller.
	                        return response;
	                    }
	                }
	                let redirectsRemaining = this._maxRedirects;
	                while (response.message.statusCode &&
	                    HttpRedirectCodes.includes(response.message.statusCode) &&
	                    this._allowRedirects &&
	                    redirectsRemaining > 0) {
	                    const redirectUrl = response.message.headers['location'];
	                    if (!redirectUrl) {
	                        // if there's no location to redirect to, we won't
	                        break;
	                    }
	                    const parsedRedirectUrl = new URL(redirectUrl);
	                    if (parsedUrl.protocol === 'https:' &&
	                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
	                        !this._allowRedirectDowngrade) {
	                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
	                    }
	                    // we need to finish reading the response before reassigning response
	                    // which will leak the open socket.
	                    yield response.readBody();
	                    // strip authorization header if redirected to a different hostname
	                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
	                        for (const header in headers) {
	                            // header names are case insensitive
	                            if (header.toLowerCase() === 'authorization') {
	                                delete headers[header];
	                            }
	                        }
	                    }
	                    // let's make the request with the new redirectUrl
	                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
	                    response = yield this.requestRaw(info, data);
	                    redirectsRemaining--;
	                }
	                if (!response.message.statusCode ||
	                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
	                    // If not a retry code, return immediately instead of retrying
	                    return response;
	                }
	                numTries += 1;
	                if (numTries < maxTries) {
	                    yield response.readBody();
	                    yield this._performExponentialBackoff(numTries);
	                }
	            } while (numTries < maxTries);
	            return response;
	        });
	    }
	    /**
	     * Needs to be called if keepAlive is set to true in request options.
	     */
	    dispose() {
	        if (this._agent) {
	            this._agent.destroy();
	        }
	        this._disposed = true;
	    }
	    /**
	     * Raw request.
	     * @param info
	     * @param data
	     */
	    requestRaw(info, data) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                function callbackForResult(err, res) {
	                    if (err) {
	                        reject(err);
	                    }
	                    else if (!res) {
	                        // If `err` is not passed, then `res` must be passed.
	                        reject(new Error('Unknown error'));
	                    }
	                    else {
	                        resolve(res);
	                    }
	                }
	                this.requestRawWithCallback(info, data, callbackForResult);
	            });
	        });
	    }
	    /**
	     * Raw request with callback.
	     * @param info
	     * @param data
	     * @param onResult
	     */
	    requestRawWithCallback(info, data, onResult) {
	        if (typeof data === 'string') {
	            if (!info.options.headers) {
	                info.options.headers = {};
	            }
	            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
	        }
	        let callbackCalled = false;
	        function handleResult(err, res) {
	            if (!callbackCalled) {
	                callbackCalled = true;
	                onResult(err, res);
	            }
	        }
	        const req = info.httpModule.request(info.options, (msg) => {
	            const res = new HttpClientResponse(msg);
	            handleResult(undefined, res);
	        });
	        let socket;
	        req.on('socket', sock => {
	            socket = sock;
	        });
	        // If we ever get disconnected, we want the socket to timeout eventually
	        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
	            if (socket) {
	                socket.end();
	            }
	            handleResult(new Error(`Request timeout: ${info.options.path}`));
	        });
	        req.on('error', function (err) {
	            // err has statusCode property
	            // res should have headers
	            handleResult(err);
	        });
	        if (data && typeof data === 'string') {
	            req.write(data, 'utf8');
	        }
	        if (data && typeof data !== 'string') {
	            data.on('close', function () {
	                req.end();
	            });
	            data.pipe(req);
	        }
	        else {
	            req.end();
	        }
	    }
	    /**
	     * Gets an http agent. This function is useful when you need an http agent that handles
	     * routing through a proxy server - depending upon the url and proxy environment variables.
	     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
	     */
	    getAgent(serverUrl) {
	        const parsedUrl = new URL(serverUrl);
	        return this._getAgent(parsedUrl);
	    }
	    _prepareRequest(method, requestUrl, headers) {
	        const info = {};
	        info.parsedUrl = requestUrl;
	        const usingSsl = info.parsedUrl.protocol === 'https:';
	        info.httpModule = usingSsl ? https : http;
	        const defaultPort = usingSsl ? 443 : 80;
	        info.options = {};
	        info.options.host = info.parsedUrl.hostname;
	        info.options.port = info.parsedUrl.port
	            ? parseInt(info.parsedUrl.port)
	            : defaultPort;
	        info.options.path =
	            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
	        info.options.method = method;
	        info.options.headers = this._mergeHeaders(headers);
	        if (this.userAgent != null) {
	            info.options.headers['user-agent'] = this.userAgent;
	        }
	        info.options.agent = this._getAgent(info.parsedUrl);
	        // gives handlers an opportunity to participate
	        if (this.handlers) {
	            for (const handler of this.handlers) {
	                handler.prepareRequest(info.options);
	            }
	        }
	        return info;
	    }
	    _mergeHeaders(headers) {
	        if (this.requestOptions && this.requestOptions.headers) {
	            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
	        }
	        return lowercaseKeys(headers || {});
	    }
	    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
	        let clientHeader;
	        if (this.requestOptions && this.requestOptions.headers) {
	            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
	        }
	        return additionalHeaders[header] || clientHeader || _default;
	    }
	    _getAgent(parsedUrl) {
	        let agent;
	        const proxyUrl = pm.getProxyUrl(parsedUrl);
	        const useProxy = proxyUrl && proxyUrl.hostname;
	        if (this._keepAlive && useProxy) {
	            agent = this._proxyAgent;
	        }
	        if (this._keepAlive && !useProxy) {
	            agent = this._agent;
	        }
	        // if agent is already assigned use that agent.
	        if (agent) {
	            return agent;
	        }
	        const usingSsl = parsedUrl.protocol === 'https:';
	        let maxSockets = 100;
	        if (this.requestOptions) {
	            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
	        }
	        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
	        if (proxyUrl && proxyUrl.hostname) {
	            const agentOptions = {
	                maxSockets,
	                keepAlive: this._keepAlive,
	                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
	                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
	                })), { host: proxyUrl.hostname, port: proxyUrl.port })
	            };
	            let tunnelAgent;
	            const overHttps = proxyUrl.protocol === 'https:';
	            if (usingSsl) {
	                tunnelAgent = overHttps ? tunnel$1.httpsOverHttps : tunnel$1.httpsOverHttp;
	            }
	            else {
	                tunnelAgent = overHttps ? tunnel$1.httpOverHttps : tunnel$1.httpOverHttp;
	            }
	            agent = tunnelAgent(agentOptions);
	            this._proxyAgent = agent;
	        }
	        // if reusing agent across request and tunneling agent isn't assigned create a new agent
	        if (this._keepAlive && !agent) {
	            const options = { keepAlive: this._keepAlive, maxSockets };
	            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
	            this._agent = agent;
	        }
	        // if not using private agent and tunnel agent isn't setup then use global agent
	        if (!agent) {
	            agent = usingSsl ? https.globalAgent : http.globalAgent;
	        }
	        if (usingSsl && this._ignoreSslError) {
	            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
	            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
	            // we have to cast it to any and change it directly
	            agent.options = Object.assign(agent.options || {}, {
	                rejectUnauthorized: false
	            });
	        }
	        return agent;
	    }
	    _performExponentialBackoff(retryNumber) {
	        return __awaiter(this, void 0, void 0, function* () {
	            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
	            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
	            return new Promise(resolve => setTimeout(() => resolve(), ms));
	        });
	    }
	    _processResponse(res, options) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
	                const statusCode = res.message.statusCode || 0;
	                const response = {
	                    statusCode,
	                    result: null,
	                    headers: {}
	                };
	                // not found leads to null obj returned
	                if (statusCode === HttpCodes.NotFound) {
	                    resolve(response);
	                }
	                // get the result from the body
	                function dateTimeDeserializer(key, value) {
	                    if (typeof value === 'string') {
	                        const a = new Date(value);
	                        if (!isNaN(a.valueOf())) {
	                            return a;
	                        }
	                    }
	                    return value;
	                }
	                let obj;
	                let contents;
	                try {
	                    contents = yield res.readBody();
	                    if (contents && contents.length > 0) {
	                        if (options && options.deserializeDates) {
	                            obj = JSON.parse(contents, dateTimeDeserializer);
	                        }
	                        else {
	                            obj = JSON.parse(contents);
	                        }
	                        response.result = obj;
	                    }
	                    response.headers = res.message.headers;
	                }
	                catch (err) {
	                    // Invalid resource (contents not json);  leaving result obj null
	                }
	                // note that 3xx redirects are handled by the http layer.
	                if (statusCode > 299) {
	                    let msg;
	                    // if exception/error in body, attempt to get better error
	                    if (obj && obj.message) {
	                        msg = obj.message;
	                    }
	                    else if (contents && contents.length > 0) {
	                        // it may be the case that the exception is in the body message as string
	                        msg = contents;
	                    }
	                    else {
	                        msg = `Failed request: (${statusCode})`;
	                    }
	                    const err = new HttpClientError(msg, statusCode);
	                    err.result = response.result;
	                    reject(err);
	                }
	                else {
	                    resolve(response);
	                }
	            }));
	        });
	    }
	}
	exports.HttpClient = HttpClient;
	const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
	
} (lib));

var auth = {};

var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(auth, "__esModule", { value: true });
auth.PersonalAccessTokenCredentialHandler = auth.BearerCredentialHandler = auth.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
auth.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
auth.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
auth.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;

var hasRequiredOidcUtils;

function requireOidcUtils () {
	if (hasRequiredOidcUtils) return oidcUtils;
	hasRequiredOidcUtils = 1;
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(oidcUtils, "__esModule", { value: true });
	oidcUtils.OidcClient = void 0;
	const http_client_1 = lib;
	const auth_1 = auth;
	const core_1 = requireCore();
	class OidcClient {
	    static createHttpClient(allowRetry = true, maxRetry = 10) {
	        const requestOptions = {
	            allowRetries: allowRetry,
	            maxRetries: maxRetry
	        };
	        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
	    }
	    static getRequestToken() {
	        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
	        if (!token) {
	            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
	        }
	        return token;
	    }
	    static getIDTokenUrl() {
	        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
	        if (!runtimeUrl) {
	            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
	        }
	        return runtimeUrl;
	    }
	    static getCall(id_token_url) {
	        var _a;
	        return __awaiter(this, void 0, void 0, function* () {
	            const httpclient = OidcClient.createHttpClient();
	            const res = yield httpclient
	                .getJson(id_token_url)
	                .catch(error => {
	                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
	            });
	            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
	            if (!id_token) {
	                throw new Error('Response json body do not have ID Token field');
	            }
	            return id_token;
	        });
	    }
	    static getIDToken(audience) {
	        return __awaiter(this, void 0, void 0, function* () {
	            try {
	                // New ID Token is requested from action service
	                let id_token_url = OidcClient.getIDTokenUrl();
	                if (audience) {
	                    const encodedAudience = encodeURIComponent(audience);
	                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
	                }
	                core_1.debug(`ID token url is ${id_token_url}`);
	                const id_token = yield OidcClient.getCall(id_token_url);
	                core_1.setSecret(id_token);
	                return id_token;
	            }
	            catch (error) {
	                throw new Error(`Error message: ${error.message}`);
	            }
	        });
	    }
	}
	oidcUtils.OidcClient = OidcClient;
	
	return oidcUtils;
}

var summary = {};

var hasRequiredSummary;

function requireSummary () {
	if (hasRequiredSummary) return summary;
	hasRequiredSummary = 1;
	(function (exports) {
		var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
		const os_1 = require$$0;
		const fs_1 = require$$0$1;
		const { access, appendFile, writeFile } = fs_1.promises;
		exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
		exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
		class Summary {
		    constructor() {
		        this._buffer = '';
		    }
		    /**
		     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
		     * Also checks r/w permissions.
		     *
		     * @returns step summary file path
		     */
		    filePath() {
		        return __awaiter(this, void 0, void 0, function* () {
		            if (this._filePath) {
		                return this._filePath;
		            }
		            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
		            if (!pathFromEnv) {
		                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
		            }
		            try {
		                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
		            }
		            catch (_a) {
		                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
		            }
		            this._filePath = pathFromEnv;
		            return this._filePath;
		        });
		    }
		    /**
		     * Wraps content in an HTML tag, adding any HTML attributes
		     *
		     * @param {string} tag HTML tag to wrap
		     * @param {string | null} content content within the tag
		     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
		     *
		     * @returns {string} content wrapped in HTML element
		     */
		    wrap(tag, content, attrs = {}) {
		        const htmlAttrs = Object.entries(attrs)
		            .map(([key, value]) => ` ${key}="${value}"`)
		            .join('');
		        if (!content) {
		            return `<${tag}${htmlAttrs}>`;
		        }
		        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
		    }
		    /**
		     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
		     *
		     * @param {SummaryWriteOptions} [options] (optional) options for write operation
		     *
		     * @returns {Promise<Summary>} summary instance
		     */
		    write(options) {
		        return __awaiter(this, void 0, void 0, function* () {
		            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
		            const filePath = yield this.filePath();
		            const writeFunc = overwrite ? writeFile : appendFile;
		            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
		            return this.emptyBuffer();
		        });
		    }
		    /**
		     * Clears the summary buffer and wipes the summary file
		     *
		     * @returns {Summary} summary instance
		     */
		    clear() {
		        return __awaiter(this, void 0, void 0, function* () {
		            return this.emptyBuffer().write({ overwrite: true });
		        });
		    }
		    /**
		     * Returns the current summary buffer as a string
		     *
		     * @returns {string} string of summary buffer
		     */
		    stringify() {
		        return this._buffer;
		    }
		    /**
		     * If the summary buffer is empty
		     *
		     * @returns {boolen} true if the buffer is empty
		     */
		    isEmptyBuffer() {
		        return this._buffer.length === 0;
		    }
		    /**
		     * Resets the summary buffer without writing to summary file
		     *
		     * @returns {Summary} summary instance
		     */
		    emptyBuffer() {
		        this._buffer = '';
		        return this;
		    }
		    /**
		     * Adds raw text to the summary buffer
		     *
		     * @param {string} text content to add
		     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
		     *
		     * @returns {Summary} summary instance
		     */
		    addRaw(text, addEOL = false) {
		        this._buffer += text;
		        return addEOL ? this.addEOL() : this;
		    }
		    /**
		     * Adds the operating system-specific end-of-line marker to the buffer
		     *
		     * @returns {Summary} summary instance
		     */
		    addEOL() {
		        return this.addRaw(os_1.EOL);
		    }
		    /**
		     * Adds an HTML codeblock to the summary buffer
		     *
		     * @param {string} code content to render within fenced code block
		     * @param {string} lang (optional) language to syntax highlight code
		     *
		     * @returns {Summary} summary instance
		     */
		    addCodeBlock(code, lang) {
		        const attrs = Object.assign({}, (lang && { lang }));
		        const element = this.wrap('pre', this.wrap('code', code), attrs);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML list to the summary buffer
		     *
		     * @param {string[]} items list of items to render
		     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
		     *
		     * @returns {Summary} summary instance
		     */
		    addList(items, ordered = false) {
		        const tag = ordered ? 'ol' : 'ul';
		        const listItems = items.map(item => this.wrap('li', item)).join('');
		        const element = this.wrap(tag, listItems);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML table to the summary buffer
		     *
		     * @param {SummaryTableCell[]} rows table rows
		     *
		     * @returns {Summary} summary instance
		     */
		    addTable(rows) {
		        const tableBody = rows
		            .map(row => {
		            const cells = row
		                .map(cell => {
		                if (typeof cell === 'string') {
		                    return this.wrap('td', cell);
		                }
		                const { header, data, colspan, rowspan } = cell;
		                const tag = header ? 'th' : 'td';
		                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
		                return this.wrap(tag, data, attrs);
		            })
		                .join('');
		            return this.wrap('tr', cells);
		        })
		            .join('');
		        const element = this.wrap('table', tableBody);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds a collapsable HTML details element to the summary buffer
		     *
		     * @param {string} label text for the closed state
		     * @param {string} content collapsable content
		     *
		     * @returns {Summary} summary instance
		     */
		    addDetails(label, content) {
		        const element = this.wrap('details', this.wrap('summary', label) + content);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML image tag to the summary buffer
		     *
		     * @param {string} src path to the image you to embed
		     * @param {string} alt text description of the image
		     * @param {SummaryImageOptions} options (optional) addition image attributes
		     *
		     * @returns {Summary} summary instance
		     */
		    addImage(src, alt, options) {
		        const { width, height } = options || {};
		        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
		        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML section heading element
		     *
		     * @param {string} text heading text
		     * @param {number | string} [level=1] (optional) the heading level, default: 1
		     *
		     * @returns {Summary} summary instance
		     */
		    addHeading(text, level) {
		        const tag = `h${level}`;
		        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
		            ? tag
		            : 'h1';
		        const element = this.wrap(allowedTag, text);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML thematic break (<hr>) to the summary buffer
		     *
		     * @returns {Summary} summary instance
		     */
		    addSeparator() {
		        const element = this.wrap('hr', null);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML line break (<br>) to the summary buffer
		     *
		     * @returns {Summary} summary instance
		     */
		    addBreak() {
		        const element = this.wrap('br', null);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML blockquote to the summary buffer
		     *
		     * @param {string} text quote text
		     * @param {string} cite (optional) citation url
		     *
		     * @returns {Summary} summary instance
		     */
		    addQuote(text, cite) {
		        const attrs = Object.assign({}, (cite && { cite }));
		        const element = this.wrap('blockquote', text, attrs);
		        return this.addRaw(element).addEOL();
		    }
		    /**
		     * Adds an HTML anchor tag to the summary buffer
		     *
		     * @param {string} text link text/content
		     * @param {string} href hyperlink
		     *
		     * @returns {Summary} summary instance
		     */
		    addLink(text, href) {
		        const element = this.wrap('a', text, { href });
		        return this.addRaw(element).addEOL();
		    }
		}
		const _summary = new Summary();
		/**
		 * @deprecated use `core.summary`
		 */
		exports.markdownSummary = _summary;
		exports.summary = _summary;
		
	} (summary));
	return summary;
}

var pathUtils = {};

var hasRequiredPathUtils;

function requirePathUtils () {
	if (hasRequiredPathUtils) return pathUtils;
	hasRequiredPathUtils = 1;
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(pathUtils, "__esModule", { value: true });
	pathUtils.toPlatformPath = pathUtils.toWin32Path = pathUtils.toPosixPath = void 0;
	const path = __importStar(require$$0$2);
	/**
	 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
	 * replaced with /.
	 *
	 * @param pth. Path to transform.
	 * @return string Posix path.
	 */
	function toPosixPath(pth) {
	    return pth.replace(/[\\]/g, '/');
	}
	pathUtils.toPosixPath = toPosixPath;
	/**
	 * toWin32Path converts the given path to the win32 form. On Linux, / will be
	 * replaced with \\.
	 *
	 * @param pth. Path to transform.
	 * @return string Win32 path.
	 */
	function toWin32Path(pth) {
	    return pth.replace(/[/]/g, '\\');
	}
	pathUtils.toWin32Path = toWin32Path;
	/**
	 * toPlatformPath converts the given path to a platform-specific path. It does
	 * this by replacing instances of / and \ with the platform-specific path
	 * separator.
	 *
	 * @param pth The path to platformize.
	 * @return string The platform-specific path.
	 */
	function toPlatformPath(pth) {
	    return pth.replace(/[/\\]/g, path.sep);
	}
	pathUtils.toPlatformPath = toPlatformPath;
	
	return pathUtils;
}

var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
		const command_1 = command;
		const file_command_1 = fileCommand;
		const utils_1 = utils;
		const os = __importStar(require$$0);
		const path = __importStar(require$$0$2);
		const oidc_utils_1 = requireOidcUtils();
		/**
		 * The code to exit an action
		 */
		var ExitCode;
		(function (ExitCode) {
		    /**
		     * A code indicating that the action was successful
		     */
		    ExitCode[ExitCode["Success"] = 0] = "Success";
		    /**
		     * A code indicating that the action was a failure
		     */
		    ExitCode[ExitCode["Failure"] = 1] = "Failure";
		})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
		//-----------------------------------------------------------------------
		// Variables
		//-----------------------------------------------------------------------
		/**
		 * Sets env variable for this action and future actions in the job
		 * @param name the name of the variable to set
		 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function exportVariable(name, val) {
		    const convertedVal = utils_1.toCommandValue(val);
		    process.env[name] = convertedVal;
		    const filePath = process.env['GITHUB_ENV'] || '';
		    if (filePath) {
		        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
		    }
		    command_1.issueCommand('set-env', { name }, convertedVal);
		}
		exports.exportVariable = exportVariable;
		/**
		 * Registers a secret which will get masked from logs
		 * @param secret value of the secret
		 */
		function setSecret(secret) {
		    command_1.issueCommand('add-mask', {}, secret);
		}
		exports.setSecret = setSecret;
		/**
		 * Prepends inputPath to the PATH (for this action and future actions)
		 * @param inputPath
		 */
		function addPath(inputPath) {
		    const filePath = process.env['GITHUB_PATH'] || '';
		    if (filePath) {
		        file_command_1.issueFileCommand('PATH', inputPath);
		    }
		    else {
		        command_1.issueCommand('add-path', {}, inputPath);
		    }
		    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
		}
		exports.addPath = addPath;
		/**
		 * Gets the value of an input.
		 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
		 * Returns an empty string if the value is not defined.
		 *
		 * @param     name     name of the input to get
		 * @param     options  optional. See InputOptions.
		 * @returns   string
		 */
		function getInput(name, options) {
		    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
		    if (options && options.required && !val) {
		        throw new Error(`Input required and not supplied: ${name}`);
		    }
		    if (options && options.trimWhitespace === false) {
		        return val;
		    }
		    return val.trim();
		}
		exports.getInput = getInput;
		/**
		 * Gets the values of an multiline input.  Each value is also trimmed.
		 *
		 * @param     name     name of the input to get
		 * @param     options  optional. See InputOptions.
		 * @returns   string[]
		 *
		 */
		function getMultilineInput(name, options) {
		    const inputs = getInput(name, options)
		        .split('\n')
		        .filter(x => x !== '');
		    if (options && options.trimWhitespace === false) {
		        return inputs;
		    }
		    return inputs.map(input => input.trim());
		}
		exports.getMultilineInput = getMultilineInput;
		/**
		 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
		 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
		 * The return value is also in boolean type.
		 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
		 *
		 * @param     name     name of the input to get
		 * @param     options  optional. See InputOptions.
		 * @returns   boolean
		 */
		function getBooleanInput(name, options) {
		    const trueValue = ['true', 'True', 'TRUE'];
		    const falseValue = ['false', 'False', 'FALSE'];
		    const val = getInput(name, options);
		    if (trueValue.includes(val))
		        return true;
		    if (falseValue.includes(val))
		        return false;
		    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
		        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
		}
		exports.getBooleanInput = getBooleanInput;
		/**
		 * Sets the value of an output.
		 *
		 * @param     name     name of the output to set
		 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function setOutput(name, value) {
		    const filePath = process.env['GITHUB_OUTPUT'] || '';
		    if (filePath) {
		        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
		    }
		    process.stdout.write(os.EOL);
		    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
		}
		exports.setOutput = setOutput;
		/**
		 * Enables or disables the echoing of commands into stdout for the rest of the step.
		 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
		 *
		 */
		function setCommandEcho(enabled) {
		    command_1.issue('echo', enabled ? 'on' : 'off');
		}
		exports.setCommandEcho = setCommandEcho;
		//-----------------------------------------------------------------------
		// Results
		//-----------------------------------------------------------------------
		/**
		 * Sets the action status to failed.
		 * When the action exits it will be with an exit code of 1
		 * @param message add error issue message
		 */
		function setFailed(message) {
		    process.exitCode = ExitCode.Failure;
		    error(message);
		}
		exports.setFailed = setFailed;
		//-----------------------------------------------------------------------
		// Logging Commands
		//-----------------------------------------------------------------------
		/**
		 * Gets whether Actions Step Debug is on or not
		 */
		function isDebug() {
		    return process.env['RUNNER_DEBUG'] === '1';
		}
		exports.isDebug = isDebug;
		/**
		 * Writes debug message to user log
		 * @param message debug message
		 */
		function debug(message) {
		    command_1.issueCommand('debug', {}, message);
		}
		exports.debug = debug;
		/**
		 * Adds an error issue
		 * @param message error issue message. Errors will be converted to string via toString()
		 * @param properties optional properties to add to the annotation.
		 */
		function error(message, properties = {}) {
		    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
		}
		exports.error = error;
		/**
		 * Adds a warning issue
		 * @param message warning issue message. Errors will be converted to string via toString()
		 * @param properties optional properties to add to the annotation.
		 */
		function warning(message, properties = {}) {
		    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
		}
		exports.warning = warning;
		/**
		 * Adds a notice issue
		 * @param message notice issue message. Errors will be converted to string via toString()
		 * @param properties optional properties to add to the annotation.
		 */
		function notice(message, properties = {}) {
		    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
		}
		exports.notice = notice;
		/**
		 * Writes info to log with console.log.
		 * @param message info message
		 */
		function info(message) {
		    process.stdout.write(message + os.EOL);
		}
		exports.info = info;
		/**
		 * Begin an output group.
		 *
		 * Output until the next `groupEnd` will be foldable in this group
		 *
		 * @param name The name of the output group
		 */
		function startGroup(name) {
		    command_1.issue('group', name);
		}
		exports.startGroup = startGroup;
		/**
		 * End an output group.
		 */
		function endGroup() {
		    command_1.issue('endgroup');
		}
		exports.endGroup = endGroup;
		/**
		 * Wrap an asynchronous function call in a group.
		 *
		 * Returns the same type as the function itself.
		 *
		 * @param name The name of the group
		 * @param fn The function to wrap in the group
		 */
		function group(name, fn) {
		    return __awaiter(this, void 0, void 0, function* () {
		        startGroup(name);
		        let result;
		        try {
		            result = yield fn();
		        }
		        finally {
		            endGroup();
		        }
		        return result;
		    });
		}
		exports.group = group;
		//-----------------------------------------------------------------------
		// Wrapper action state
		//-----------------------------------------------------------------------
		/**
		 * Saves state for current action, the state can only be retrieved by this action's post job execution.
		 *
		 * @param     name     name of the state to store
		 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function saveState(name, value) {
		    const filePath = process.env['GITHUB_STATE'] || '';
		    if (filePath) {
		        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
		    }
		    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
		}
		exports.saveState = saveState;
		/**
		 * Gets the value of an state set by this action's main execution.
		 *
		 * @param     name     name of the state to get
		 * @returns   string
		 */
		function getState(name) {
		    return process.env[`STATE_${name}`] || '';
		}
		exports.getState = getState;
		function getIDToken(aud) {
		    return __awaiter(this, void 0, void 0, function* () {
		        return yield oidc_utils_1.OidcClient.getIDToken(aud);
		    });
		}
		exports.getIDToken = getIDToken;
		/**
		 * Summary exports
		 */
		var summary_1 = requireSummary();
		Object.defineProperty(exports, "summary", { enumerable: true, get: function () { return summary_1.summary; } });
		/**
		 * @deprecated use core.summary
		 */
		var summary_2 = requireSummary();
		Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function () { return summary_2.markdownSummary; } });
		/**
		 * Path exports
		 */
		var path_utils_1 = requirePathUtils();
		Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function () { return path_utils_1.toPosixPath; } });
		Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function () { return path_utils_1.toWin32Path; } });
		Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function () { return path_utils_1.toPlatformPath; } });
		
	} (core));
	return core;
}

var coreExports = requireCore();

async function run() {
    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json());
        coreExports.info(`fetched data: ${JSON.stringify(data)}`);
    }
    catch (error) {
        if (error instanceof Error) {
            coreExports.setFailed(error.message);
        }
        else {
            coreExports.setFailed("An unexpected error occurred");
        }
    }
}
run().catch((err) => {
    console.error(err);
    coreExports.setFailed(err);
    process$1.exit(1);
});
