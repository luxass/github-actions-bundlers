//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === 'object' || typeof from === 'function') for (var keys = __getOwnPropNames(from), i$1 = 0, n = keys.length, key; i$1 < n; i$1++) {
		key = keys[i$1];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, 'default', {
	value: mod,
	enumerable: true
}) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', {value: true}), mod);

//#endregion
const { default: process$1 } = __toESM(require("node:process"));

//#region ../../node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/utils.js
var require_utils = __commonJSMin((exports, module) => {
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.toCommandProperties = exports.toCommandValue = void 0;
	function toCommandValue(input) {
		if (input === null || input === undefined) {
			return '';
		} else if (typeof input === 'string' || input instanceof String) {
			return input;
		}
		return JSON.stringify(input);
	}
	exports.toCommandValue = toCommandValue;
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
	exports.toCommandProperties = toCommandProperties;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/command.js
var require_command = __commonJSMin((exports, module) => {
	var __createBinding$4 = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$4 = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
		Object.defineProperty(o, 'default', {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o['default'] = v;
	});
	var __importStar$4 = (this && this.__importStar) || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);
		}
		__setModuleDefault$4(result, mod);
		return result;
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.issue = exports.issueCommand = void 0;
	const os$2 = __importStar$4(require('os'));
	const utils_1$2 = require_utils();
	function issueCommand(command, properties, message) {
		const cmd = new Command(command, properties, message);
		process.stdout.write(cmd.toString() + os$2.EOL);
	}
	exports.issueCommand = issueCommand;
	function issue(name, message = '') {
		issueCommand(name, {}, message);
	}
	exports.issue = issue;
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
							} else {
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
		return utils_1$2.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
	}
	function escapeProperty(s) {
		return utils_1$2.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C');
	}
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/rng.js
function rng() {
	if (!getRandomValues) {
		getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
		if (!getRandomValues) {
			throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
		}
	}
	return getRandomValues(rnds8);
}
var getRandomValues, rnds8;
var init_rng = __esmMin(() => {
	rnds8 = new Uint8Array(16);
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/regex.js
var regex_default;
var init_regex = __esmMin(() => {
	regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
	return typeof uuid === 'string' && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esmMin(() => {
	init_regex();
	validate_default = validate;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/stringify.js
function stringify(arr) {
	var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
	if (!validate_default(uuid)) {
		throw TypeError('Stringified UUID is invalid');
	}
	return uuid;
}
var byteToHex, stringify_default;
var init_stringify = __esmMin(() => {
	init_validate();
	byteToHex = [];
	for (var i = 0; i < 256; ++i) {
		byteToHex.push((i + 0x100).toString(16).substr(1));
	}
	stringify_default = stringify;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/v1.js
function v1(options, buf, offset) {
	var i$1 = buf && offset || 0;
	var b = buf || new Array(16);
	options = options || {};
	var node = options.node || _nodeId;
	var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
	if (node == null || clockseq == null) {
		var seedBytes = options.random || (options.rng || rng)();
		if (node == null) {
			node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
		}
		if (clockseq == null) {
			clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
		}
	}
	var msecs = options.msecs !== undefined ? options.msecs : Date.now();
	var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
	var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
	if (dt < 0 && options.clockseq === undefined) {
		clockseq = clockseq + 1 & 0x3fff;
	}
	if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
		nsecs = 0;
	}
	if (nsecs >= 10000) {
		throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
	}
	_lastMSecs = msecs;
	_lastNSecs = nsecs;
	_clockseq = clockseq;
	msecs += 12219292800000;
	var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	b[i$1++] = tl >>> 24 & 0xff;
	b[i$1++] = tl >>> 16 & 0xff;
	b[i$1++] = tl >>> 8 & 0xff;
	b[i$1++] = tl & 0xff;
	var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
	b[i$1++] = tmh >>> 8 & 0xff;
	b[i$1++] = tmh & 0xff;
	b[i$1++] = tmh >>> 24 & 0xf | 0x10;
	b[i$1++] = tmh >>> 16 & 0xff;
	b[i$1++] = clockseq >>> 8 | 0x80;
	b[i$1++] = clockseq & 0xff;
	for (var n = 0; n < 6; ++n) {
		b[i$1 + n] = node[n];
	}
	return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esmMin(() => {
	init_rng();
	init_stringify();
	_lastMSecs = 0;
	_lastNSecs = 0;
	v1_default = v1;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
	if (!validate_default(uuid)) {
		throw TypeError('Invalid UUID');
	}
	var v;
	var arr = new Uint8Array(16);
	arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
	arr[1] = v >>> 16 & 0xff;
	arr[2] = v >>> 8 & 0xff;
	arr[3] = v & 0xff;
	arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
	arr[5] = v & 0xff;
	arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
	arr[7] = v & 0xff;
	arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
	arr[9] = v & 0xff;
	arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
	arr[11] = v / 0x100000000 & 0xff;
	arr[12] = v >>> 24 & 0xff;
	arr[13] = v >>> 16 & 0xff;
	arr[14] = v >>> 8 & 0xff;
	arr[15] = v & 0xff;
	return arr;
}
var parse_default;
var init_parse = __esmMin(() => {
	init_validate();
	parse_default = parse;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
	str = unescape(encodeURIComponent(str));
	var bytes = [];
	for (var i$1 = 0; i$1 < str.length; ++i$1) {
		bytes.push(str.charCodeAt(i$1));
	}
	return bytes;
}
function v35_default(name, version$1, hashfunc) {
	function generateUUID(value, namespace, buf, offset) {
		if (typeof value === 'string') {
			value = stringToBytes(value);
		}
		if (typeof namespace === 'string') {
			namespace = parse_default(namespace);
		}
		if (namespace.length !== 16) {
			throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
		}
		var bytes = new Uint8Array(16 + value.length);
		bytes.set(namespace);
		bytes.set(value, namespace.length);
		bytes = hashfunc(bytes);
		bytes[6] = bytes[6] & 0x0f | version$1;
		bytes[8] = bytes[8] & 0x3f | 0x80;
		if (buf) {
			offset = offset || 0;
			for (var i$1 = 0; i$1 < 16; ++i$1) {
				buf[offset + i$1] = bytes[i$1];
			}
			return buf;
		}
		return stringify_default(bytes);
	}
	try {
		generateUUID.name = name;
	} catch (err) {}
	generateUUID.DNS = DNS;
	generateUUID.URL = URL$1;
	return generateUUID;
}
var DNS, URL$1;
var init_v35 = __esmMin(() => {
	init_stringify();
	init_parse();
	DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
	URL$1 = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
	if (typeof bytes === 'string') {
		var msg = unescape(encodeURIComponent(bytes));
		bytes = new Uint8Array(msg.length);
		for (var i$1 = 0; i$1 < msg.length; ++i$1) {
			bytes[i$1] = msg.charCodeAt(i$1);
		}
	}
	return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
	var output = [];
	var length32 = input.length * 32;
	var hexTab = '0123456789abcdef';
	for (var i$1 = 0; i$1 < length32; i$1 += 8) {
		var x = input[i$1 >> 5] >>> i$1 % 32 & 0xff;
		var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
		output.push(hex);
	}
	return output;
}
function getOutputLength(inputLength8) {
	return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
	x[len >> 5] |= 0x80 << len % 32;
	x[getOutputLength(len) - 1] = len;
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	for (var i$1 = 0; i$1 < x.length; i$1 += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		a = md5ff(a, b, c, d, x[i$1], 7, -680876936);
		d = md5ff(d, a, b, c, x[i$1 + 1], 12, -389564586);
		c = md5ff(c, d, a, b, x[i$1 + 2], 17, 606105819);
		b = md5ff(b, c, d, a, x[i$1 + 3], 22, -1044525330);
		a = md5ff(a, b, c, d, x[i$1 + 4], 7, -176418897);
		d = md5ff(d, a, b, c, x[i$1 + 5], 12, 1200080426);
		c = md5ff(c, d, a, b, x[i$1 + 6], 17, -1473231341);
		b = md5ff(b, c, d, a, x[i$1 + 7], 22, -45705983);
		a = md5ff(a, b, c, d, x[i$1 + 8], 7, 1770035416);
		d = md5ff(d, a, b, c, x[i$1 + 9], 12, -1958414417);
		c = md5ff(c, d, a, b, x[i$1 + 10], 17, -42063);
		b = md5ff(b, c, d, a, x[i$1 + 11], 22, -1990404162);
		a = md5ff(a, b, c, d, x[i$1 + 12], 7, 1804603682);
		d = md5ff(d, a, b, c, x[i$1 + 13], 12, -40341101);
		c = md5ff(c, d, a, b, x[i$1 + 14], 17, -1502002290);
		b = md5ff(b, c, d, a, x[i$1 + 15], 22, 1236535329);
		a = md5gg(a, b, c, d, x[i$1 + 1], 5, -165796510);
		d = md5gg(d, a, b, c, x[i$1 + 6], 9, -1069501632);
		c = md5gg(c, d, a, b, x[i$1 + 11], 14, 643717713);
		b = md5gg(b, c, d, a, x[i$1], 20, -373897302);
		a = md5gg(a, b, c, d, x[i$1 + 5], 5, -701558691);
		d = md5gg(d, a, b, c, x[i$1 + 10], 9, 38016083);
		c = md5gg(c, d, a, b, x[i$1 + 15], 14, -660478335);
		b = md5gg(b, c, d, a, x[i$1 + 4], 20, -405537848);
		a = md5gg(a, b, c, d, x[i$1 + 9], 5, 568446438);
		d = md5gg(d, a, b, c, x[i$1 + 14], 9, -1019803690);
		c = md5gg(c, d, a, b, x[i$1 + 3], 14, -187363961);
		b = md5gg(b, c, d, a, x[i$1 + 8], 20, 1163531501);
		a = md5gg(a, b, c, d, x[i$1 + 13], 5, -1444681467);
		d = md5gg(d, a, b, c, x[i$1 + 2], 9, -51403784);
		c = md5gg(c, d, a, b, x[i$1 + 7], 14, 1735328473);
		b = md5gg(b, c, d, a, x[i$1 + 12], 20, -1926607734);
		a = md5hh(a, b, c, d, x[i$1 + 5], 4, -378558);
		d = md5hh(d, a, b, c, x[i$1 + 8], 11, -2022574463);
		c = md5hh(c, d, a, b, x[i$1 + 11], 16, 1839030562);
		b = md5hh(b, c, d, a, x[i$1 + 14], 23, -35309556);
		a = md5hh(a, b, c, d, x[i$1 + 1], 4, -1530992060);
		d = md5hh(d, a, b, c, x[i$1 + 4], 11, 1272893353);
		c = md5hh(c, d, a, b, x[i$1 + 7], 16, -155497632);
		b = md5hh(b, c, d, a, x[i$1 + 10], 23, -1094730640);
		a = md5hh(a, b, c, d, x[i$1 + 13], 4, 681279174);
		d = md5hh(d, a, b, c, x[i$1], 11, -358537222);
		c = md5hh(c, d, a, b, x[i$1 + 3], 16, -722521979);
		b = md5hh(b, c, d, a, x[i$1 + 6], 23, 76029189);
		a = md5hh(a, b, c, d, x[i$1 + 9], 4, -640364487);
		d = md5hh(d, a, b, c, x[i$1 + 12], 11, -421815835);
		c = md5hh(c, d, a, b, x[i$1 + 15], 16, 530742520);
		b = md5hh(b, c, d, a, x[i$1 + 2], 23, -995338651);
		a = md5ii(a, b, c, d, x[i$1], 6, -198630844);
		d = md5ii(d, a, b, c, x[i$1 + 7], 10, 1126891415);
		c = md5ii(c, d, a, b, x[i$1 + 14], 15, -1416354905);
		b = md5ii(b, c, d, a, x[i$1 + 5], 21, -57434055);
		a = md5ii(a, b, c, d, x[i$1 + 12], 6, 1700485571);
		d = md5ii(d, a, b, c, x[i$1 + 3], 10, -1894986606);
		c = md5ii(c, d, a, b, x[i$1 + 10], 15, -1051523);
		b = md5ii(b, c, d, a, x[i$1 + 1], 21, -2054922799);
		a = md5ii(a, b, c, d, x[i$1 + 8], 6, 1873313359);
		d = md5ii(d, a, b, c, x[i$1 + 15], 10, -30611744);
		c = md5ii(c, d, a, b, x[i$1 + 6], 15, -1560198380);
		b = md5ii(b, c, d, a, x[i$1 + 13], 21, 1309151649);
		a = md5ii(a, b, c, d, x[i$1 + 4], 6, -145523070);
		d = md5ii(d, a, b, c, x[i$1 + 11], 10, -1120210379);
		c = md5ii(c, d, a, b, x[i$1 + 2], 15, 718787259);
		b = md5ii(b, c, d, a, x[i$1 + 9], 21, -343485551);
		a = safeAdd(a, olda);
		b = safeAdd(b, oldb);
		c = safeAdd(c, oldc);
		d = safeAdd(d, oldd);
	}
	return [a, b, c, d];
}
function bytesToWords(input) {
	if (input.length === 0) {
		return [];
	}
	var length8 = input.length * 8;
	var output = new Uint32Array(getOutputLength(length8));
	for (var i$1 = 0; i$1 < length8; i$1 += 8) {
		output[i$1 >> 5] |= (input[i$1 / 8] & 0xff) << i$1 % 32;
	}
	return output;
}
function safeAdd(x, y) {
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return msw << 16 | lsw & 0xffff;
}
function bitRotateLeft(num, cnt) {
	return num << cnt | num >>> 32 - cnt;
}
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
var md5_default;
var init_md5 = __esmMin(() => {
	md5_default = md5;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/v3.js
var v3, v3_default;
var init_v3 = __esmMin(() => {
	init_v35();
	init_md5();
	v3 = v35_default('v3', 0x30, md5_default);
	v3_default = v3;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
	options = options || {};
	var rnds = options.random || (options.rng || rng)();
	rnds[6] = rnds[6] & 0x0f | 0x40;
	rnds[8] = rnds[8] & 0x3f | 0x80;
	if (buf) {
		offset = offset || 0;
		for (var i$1 = 0; i$1 < 16; ++i$1) {
			buf[offset + i$1] = rnds[i$1];
		}
		return buf;
	}
	return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esmMin(() => {
	init_rng();
	init_stringify();
	v4_default = v4;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x, y, z) {
	switch (s) {
		case 0: return x & y ^ ~x & z;
		case 1: return x ^ y ^ z;
		case 2: return x & y ^ x & z ^ y & z;
		case 3: return x ^ y ^ z;
	}
}
function ROTL(x, n) {
	return x << n | x >>> 32 - n;
}
function sha1(bytes) {
	var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
	var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
	if (typeof bytes === 'string') {
		var msg = unescape(encodeURIComponent(bytes));
		bytes = [];
		for (var i$1 = 0; i$1 < msg.length; ++i$1) {
			bytes.push(msg.charCodeAt(i$1));
		}
	} else if (!Array.isArray(bytes)) {
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
var sha1_default;
var init_sha1 = __esmMin(() => {
	sha1_default = sha1;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/v5.js
var v5, v5_default;
var init_v5 = __esmMin(() => {
	init_v35();
	init_sha1();
	v5 = v35_default('v5', 0x50, sha1_default);
	v5_default = v5;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/nil.js
var nil_default;
var init_nil = __esmMin(() => {
	nil_default = '00000000-0000-0000-0000-000000000000';
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/version.js
function version(uuid) {
	if (!validate_default(uuid)) {
		throw TypeError('Invalid UUID');
	}
	return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esmMin(() => {
	init_validate();
	version_default = version;
});

//#endregion
//#region ../../node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-browser/index.js
var esm_browser_index_ns;
var init_esm_browser_index = __esmMin(() => {
	esm_browser_index_ns = {};
	__export(esm_browser_index_ns, {
		NIL: () => nil_default,
		parse: () => parse_default,
		stringify: () => stringify_default,
		v1: () => v1_default,
		v3: () => v3_default,
		v4: () => v4_default,
		v5: () => v5_default,
		validate: () => validate_default,
		version: () => version_default
	});
	init_v1();
	init_v3();
	init_v4();
	init_v5();
	init_nil();
	init_version();
	init_validate();
	init_stringify();
	init_parse();
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJSMin((exports, module) => {
	var __createBinding$3 = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$3 = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
		Object.defineProperty(o, 'default', {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o['default'] = v;
	});
	var __importStar$3 = (this && this.__importStar) || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);
		}
		__setModuleDefault$3(result, mod);
		return result;
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
	const fs = __importStar$3(require('fs'));
	const os$1 = __importStar$3(require('os'));
	const uuid_1 = (init_esm_browser_index(), __toCommonJS(esm_browser_index_ns));
	const utils_1$1 = require_utils();
	function issueFileCommand(command, message) {
		const filePath = process.env[`GITHUB_${command}`];
		if (!filePath) {
			throw new Error(`Unable to find environment variable for file command ${command}`);
		}
		if (!fs.existsSync(filePath)) {
			throw new Error(`Missing file at path: ${filePath}`);
		}
		fs.appendFileSync(filePath, `${utils_1$1.toCommandValue(message)}${os$1.EOL}`, {encoding: 'utf8'});
	}
	exports.issueFileCommand = issueFileCommand;
	function prepareKeyValueMessage(key, value) {
		const delimiter = `ghadelimiter_${uuid_1.v4()}`;
		const convertedValue = utils_1$1.toCommandValue(value);
		if (key.includes(delimiter)) {
			throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
		}
		if (convertedValue.includes(delimiter)) {
			throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
		}
		return `${key}<<${delimiter}${os$1.EOL}${convertedValue}${os$1.EOL}${delimiter}`;
	}
	exports.prepareKeyValueMessage = prepareKeyValueMessage;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+http-client@2.1.1/node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJSMin((exports, module) => {
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.checkBypass = exports.getProxyUrl = void 0;
	function getProxyUrl$1(reqUrl) {
		const usingSsl = reqUrl.protocol === 'https:';
		if (checkBypass(reqUrl)) {
			return undefined;
		}
		const proxyVar = (() => {
			if (usingSsl) {
				return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
			} else {
				return process.env['http_proxy'] || process.env['HTTP_PROXY'];
			}
		})();
		if (proxyVar) {
			try {
				return new URL(proxyVar);
			} catch (_a) {
				if (!proxyVar.startsWith('http://') && !proxyVar.startsWith('https://')) return new URL(`http://${proxyVar}`);
			}
		} else {
			return undefined;
		}
	}
	exports.getProxyUrl = getProxyUrl$1;
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
		let reqPort;
		if (reqUrl.port) {
			reqPort = Number(reqUrl.port);
		} else if (reqUrl.protocol === 'http:') {
			reqPort = 80;
		} else if (reqUrl.protocol === 'https:') {
			reqPort = 443;
		}
		const upperReqHosts = [reqUrl.hostname.toUpperCase()];
		if (typeof reqPort === 'number') {
			upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
		}
		for (const upperNoProxyItem of noProxy.split(',').map((x) => x.trim().toUpperCase()).filter((x) => x)) {
			if (upperNoProxyItem === '*' || upperReqHosts.some((x) => x === upperNoProxyItem || x.endsWith(`.${upperNoProxyItem}`) || (upperNoProxyItem.startsWith('.') && x.endsWith(`${upperNoProxyItem}`)))) {
				return true;
			}
		}
		return false;
	}
	exports.checkBypass = checkBypass;
	function isLoopbackAddress(host) {
		const hostLower = host.toLowerCase();
		return (hostLower === 'localhost' || hostLower.startsWith('127.') || hostLower.startsWith('[::1]') || hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
	}
});

//#endregion
//#region ../../node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJSMin((exports, module) => {
	var net = require('net');
	var tls = require('tls');
	var http$1 = require('http');
	var https$1 = require('https');
	var events = require('events');
	var assert = require('assert');
	var util = require('util');
	exports.httpOverHttp = httpOverHttp;
	exports.httpsOverHttp = httpsOverHttp;
	exports.httpOverHttps = httpOverHttps;
	exports.httpsOverHttps = httpsOverHttps;
	function httpOverHttp(options) {
		var agent = new TunnelingAgent(options);
		agent.request = http$1.request;
		return agent;
	}
	function httpsOverHttp(options) {
		var agent = new TunnelingAgent(options);
		agent.request = http$1.request;
		agent.createSocket = createSecureSocket;
		agent.defaultPort = 443;
		return agent;
	}
	function httpOverHttps(options) {
		var agent = new TunnelingAgent(options);
		agent.request = https$1.request;
		return agent;
	}
	function httpsOverHttps(options) {
		var agent = new TunnelingAgent(options);
		agent.request = https$1.request;
		agent.createSocket = createSecureSocket;
		agent.defaultPort = 443;
		return agent;
	}
	function TunnelingAgent(options) {
		var self = this;
		self.options = options || {};
		self.proxyOptions = self.options.proxy || {};
		self.maxSockets = self.options.maxSockets || http$1.Agent.defaultMaxSockets;
		self.requests = [];
		self.sockets = [];
		self.on('free', function onFree(socket, host, port, localAddress) {
			var options$1 = toOptions(host, port, localAddress);
			for (var i$1 = 0, len = self.requests.length; i$1 < len; ++i$1) {
				var pending = self.requests[i$1];
				if (pending.host === options$1.host && pending.port === options$1.port) {
					self.requests.splice(i$1, 1);
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
			self.requests.push(options);
			return;
		}
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
			headers: {host: options.host + ':' + options.port}
		});
		if (options.localAddress) {
			connectOptions.localAddress = options.localAddress;
		}
		if (connectOptions.proxyAuth) {
			connectOptions.headers = connectOptions.headers || {};
			connectOptions.headers['Proxy-Authorization'] = 'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
		}
		debug$1('making CONNECT request');
		var connectReq = self.request(connectOptions);
		connectReq.useChunkedEncodingByDefault = false;
		connectReq.once('response', onResponse);
		connectReq.once('upgrade', onUpgrade);
		connectReq.once('connect', onConnect);
		connectReq.once('error', onError);
		connectReq.end();
		function onResponse(res) {
			res.upgrade = true;
		}
		function onUpgrade(res, socket, head) {
			process.nextTick(function() {
				onConnect(res, socket, head);
			});
		}
		function onConnect(res, socket, head) {
			connectReq.removeAllListeners();
			socket.removeAllListeners();
			if (res.statusCode !== 200) {
				debug$1('tunneling socket could not be established, statusCode=%d', res.statusCode);
				socket.destroy();
				var error$1 = new Error('tunneling socket could not be established, ' + 'statusCode=' + res.statusCode);
				error$1.code = 'ECONNRESET';
				options.request.emit('error', error$1);
				self.removeSocket(placeholder);
				return;
			}
			if (head.length > 0) {
				debug$1('got illegal response body from proxy');
				socket.destroy();
				var error$1 = new Error('got illegal response body from proxy');
				error$1.code = 'ECONNRESET';
				options.request.emit('error', error$1);
				self.removeSocket(placeholder);
				return;
			}
			debug$1('tunneling connection has established');
			self.sockets[self.sockets.indexOf(placeholder)] = socket;
			return cb(socket);
		}
		function onError(cause) {
			connectReq.removeAllListeners();
			debug$1('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
			var error$1 = new Error('tunneling socket could not be established, ' + 'cause=' + cause.message);
			error$1.code = 'ECONNRESET';
			options.request.emit('error', error$1);
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
			this.createSocket(pending, function(socket$1) {
				pending.request.onSocket(socket$1);
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
			var secureSocket = tls.connect(0, tlsOptions);
			self.sockets[self.sockets.indexOf(socket)] = secureSocket;
			cb(secureSocket);
		});
	}
	function toOptions(host, port, localAddress) {
		if (typeof host === 'string') {
			return {
				host: host,
				port: port,
				localAddress: localAddress
			};
		}
		return host;
	}
	function mergeOptions(target) {
		for (var i$1 = 1, len = arguments.length; i$1 < len; ++i$1) {
			var overrides = arguments[i$1];
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
	var debug$1;
	if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
		debug$1 = function() {
			var args = Array.prototype.slice.call(arguments);
			if (typeof args[0] === 'string') {
				args[0] = 'TUNNEL: ' + args[0];
			} else {
				args.unshift('TUNNEL:');
			}
			console.error.apply(console, args);
		};
	} else {
		debug$1 = function() {};
	}
	exports.debug = debug$1;
});

//#endregion
//#region ../../node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/index.js
var require_tunnel_index = __commonJSMin((exports, module) => {
	module.exports = require_tunnel();
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+http-client@2.1.1/node_modules/@actions/http-client/lib/index.js
var require_lib_index = __commonJSMin((exports, module) => {
	var __createBinding$2 = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$2 = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
		Object.defineProperty(o, 'default', {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o['default'] = v;
	});
	var __importStar$2 = (this && this.__importStar) || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
		}
		__setModuleDefault$2(result, mod);
		return result;
	};
	var __awaiter$4 = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
	const http = __importStar$2(require('http'));
	const https = __importStar$2(require('https'));
	const pm = __importStar$2(require_proxy());
	const tunnel = __importStar$2(require_tunnel_index());
	var HttpCodes;
	(function(HttpCodes$1) {
		HttpCodes$1[HttpCodes$1['OK'] = 200] = 'OK';
		HttpCodes$1[HttpCodes$1['MultipleChoices'] = 300] = 'MultipleChoices';
		HttpCodes$1[HttpCodes$1['MovedPermanently'] = 301] = 'MovedPermanently';
		HttpCodes$1[HttpCodes$1['ResourceMoved'] = 302] = 'ResourceMoved';
		HttpCodes$1[HttpCodes$1['SeeOther'] = 303] = 'SeeOther';
		HttpCodes$1[HttpCodes$1['NotModified'] = 304] = 'NotModified';
		HttpCodes$1[HttpCodes$1['UseProxy'] = 305] = 'UseProxy';
		HttpCodes$1[HttpCodes$1['SwitchProxy'] = 306] = 'SwitchProxy';
		HttpCodes$1[HttpCodes$1['TemporaryRedirect'] = 307] = 'TemporaryRedirect';
		HttpCodes$1[HttpCodes$1['PermanentRedirect'] = 308] = 'PermanentRedirect';
		HttpCodes$1[HttpCodes$1['BadRequest'] = 400] = 'BadRequest';
		HttpCodes$1[HttpCodes$1['Unauthorized'] = 401] = 'Unauthorized';
		HttpCodes$1[HttpCodes$1['PaymentRequired'] = 402] = 'PaymentRequired';
		HttpCodes$1[HttpCodes$1['Forbidden'] = 403] = 'Forbidden';
		HttpCodes$1[HttpCodes$1['NotFound'] = 404] = 'NotFound';
		HttpCodes$1[HttpCodes$1['MethodNotAllowed'] = 405] = 'MethodNotAllowed';
		HttpCodes$1[HttpCodes$1['NotAcceptable'] = 406] = 'NotAcceptable';
		HttpCodes$1[HttpCodes$1['ProxyAuthenticationRequired'] = 407] = 'ProxyAuthenticationRequired';
		HttpCodes$1[HttpCodes$1['RequestTimeout'] = 408] = 'RequestTimeout';
		HttpCodes$1[HttpCodes$1['Conflict'] = 409] = 'Conflict';
		HttpCodes$1[HttpCodes$1['Gone'] = 410] = 'Gone';
		HttpCodes$1[HttpCodes$1['TooManyRequests'] = 429] = 'TooManyRequests';
		HttpCodes$1[HttpCodes$1['InternalServerError'] = 500] = 'InternalServerError';
		HttpCodes$1[HttpCodes$1['NotImplemented'] = 501] = 'NotImplemented';
		HttpCodes$1[HttpCodes$1['BadGateway'] = 502] = 'BadGateway';
		HttpCodes$1[HttpCodes$1['ServiceUnavailable'] = 503] = 'ServiceUnavailable';
		HttpCodes$1[HttpCodes$1['GatewayTimeout'] = 504] = 'GatewayTimeout';
	})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
	var Headers;
	(function(Headers$1) {
		Headers$1['Accept'] = 'accept';
		Headers$1['ContentType'] = 'content-type';
	})(Headers = exports.Headers || (exports.Headers = {}));
	var MediaTypes;
	(function(MediaTypes$1) {
		MediaTypes$1['ApplicationJson'] = 'application/json';
	})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
	function getProxyUrl(serverUrl) {
		const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
		return proxyUrl ? proxyUrl.href : '';
	}
	exports.getProxyUrl = getProxyUrl;
	const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
	const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
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
			return __awaiter$4(this, void 0, void 0, function* () {
				return new Promise((resolve) => __awaiter$4(this, void 0, void 0, function* () {
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
			return __awaiter$4(this, void 0, void 0, function* () {
				return new Promise((resolve) => __awaiter$4(this, void 0, void 0, function* () {
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
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
			});
		}
		get(requestUrl, additionalHeaders) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request('GET', requestUrl, null, additionalHeaders || {});
			});
		}
		del(requestUrl, additionalHeaders) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request('DELETE', requestUrl, null, additionalHeaders || {});
			});
		}
		post(requestUrl, data, additionalHeaders) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request('POST', requestUrl, data, additionalHeaders || {});
			});
		}
		patch(requestUrl, data, additionalHeaders) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request('PATCH', requestUrl, data, additionalHeaders || {});
			});
		}
		put(requestUrl, data, additionalHeaders) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request('PUT', requestUrl, data, additionalHeaders || {});
			});
		}
		head(requestUrl, additionalHeaders) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request('HEAD', requestUrl, null, additionalHeaders || {});
			});
		}
		sendStream(verb, requestUrl, stream, additionalHeaders) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return this.request(verb, requestUrl, stream, additionalHeaders);
			});
		}
		getJson(requestUrl, additionalHeaders = {}) {
			return __awaiter$4(this, void 0, void 0, function* () {
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				const res = yield this.get(requestUrl, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		postJson(requestUrl, obj, additionalHeaders = {}) {
			return __awaiter$4(this, void 0, void 0, function* () {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
				const res = yield this.post(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		putJson(requestUrl, obj, additionalHeaders = {}) {
			return __awaiter$4(this, void 0, void 0, function* () {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
				const res = yield this.put(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		patchJson(requestUrl, obj, additionalHeaders = {}) {
			return __awaiter$4(this, void 0, void 0, function* () {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
				const res = yield this.patch(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		request(verb, requestUrl, data, headers) {
			return __awaiter$4(this, void 0, void 0, function* () {
				if (this._disposed) {
					throw new Error('Client has already been disposed.');
				}
				const parsedUrl = new URL(requestUrl);
				let info$1 = this._prepareRequest(verb, parsedUrl, headers);
				const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
				let numTries = 0;
				let response;
				do {
					response = yield this.requestRaw(info$1, data);
					if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
						let authenticationHandler;
						for (const handler of this.handlers) {
							if (handler.canHandleAuthentication(response)) {
								authenticationHandler = handler;
								break;
							}
						}
						if (authenticationHandler) {
							return authenticationHandler.handleAuthentication(this, info$1, data);
						} else {
							return response;
						}
					}
					let redirectsRemaining = this._maxRedirects;
					while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
						const redirectUrl = response.message.headers['location'];
						if (!redirectUrl) {
							break;
						}
						const parsedRedirectUrl = new URL(redirectUrl);
						if (parsedUrl.protocol === 'https:' && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
							throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
						}
						yield response.readBody();
						if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
							for (const header in headers) {
								if (header.toLowerCase() === 'authorization') {
									delete headers[header];
								}
							}
						}
						info$1 = this._prepareRequest(verb, parsedRedirectUrl, headers);
						response = yield this.requestRaw(info$1, data);
						redirectsRemaining--;
					}
					if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
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
		dispose() {
			if (this._agent) {
				this._agent.destroy();
			}
			this._disposed = true;
		}
		requestRaw(info$1, data) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return new Promise((resolve, reject) => {
					function callbackForResult(err, res) {
						if (err) {
							reject(err);
						} else if (!res) {
							reject(new Error('Unknown error'));
						} else {
							resolve(res);
						}
					}
					this.requestRawWithCallback(info$1, data, callbackForResult);
				});
			});
		}
		requestRawWithCallback(info$1, data, onResult) {
			if (typeof data === 'string') {
				if (!info$1.options.headers) {
					info$1.options.headers = {};
				}
				info$1.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
			}
			let callbackCalled = false;
			function handleResult(err, res) {
				if (!callbackCalled) {
					callbackCalled = true;
					onResult(err, res);
				}
			}
			const req = info$1.httpModule.request(info$1.options, (msg) => {
				const res = new HttpClientResponse(msg);
				handleResult(undefined, res);
			});
			let socket;
			req.on('socket', (sock) => {
				socket = sock;
			});
			req.setTimeout(this._socketTimeout || 3 * 60000, () => {
				if (socket) {
					socket.end();
				}
				handleResult(new Error(`Request timeout: ${info$1.options.path}`));
			});
			req.on('error', function(err) {
				handleResult(err);
			});
			if (data && typeof data === 'string') {
				req.write(data, 'utf8');
			}
			if (data && typeof data !== 'string') {
				data.on('close', function() {
					req.end();
				});
				data.pipe(req);
			} else {
				req.end();
			}
		}
		getAgent(serverUrl) {
			const parsedUrl = new URL(serverUrl);
			return this._getAgent(parsedUrl);
		}
		_prepareRequest(method, requestUrl, headers) {
			const info$1 = {};
			info$1.parsedUrl = requestUrl;
			const usingSsl = info$1.parsedUrl.protocol === 'https:';
			info$1.httpModule = usingSsl ? https : http;
			const defaultPort = usingSsl ? 443 : 80;
			info$1.options = {};
			info$1.options.host = info$1.parsedUrl.hostname;
			info$1.options.port = info$1.parsedUrl.port ? parseInt(info$1.parsedUrl.port) : defaultPort;
			info$1.options.path = (info$1.parsedUrl.pathname || '') + (info$1.parsedUrl.search || '');
			info$1.options.method = method;
			info$1.options.headers = this._mergeHeaders(headers);
			if (this.userAgent != null) {
				info$1.options.headers['user-agent'] = this.userAgent;
			}
			info$1.options.agent = this._getAgent(info$1.parsedUrl);
			if (this.handlers) {
				for (const handler of this.handlers) {
					handler.prepareRequest(info$1.options);
				}
			}
			return info$1;
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
			if (agent) {
				return agent;
			}
			const usingSsl = parsedUrl.protocol === 'https:';
			let maxSockets = 100;
			if (this.requestOptions) {
				maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
			}
			if (proxyUrl && proxyUrl.hostname) {
				const agentOptions = {
					maxSockets,
					keepAlive: this._keepAlive,
					proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`})), {
						host: proxyUrl.hostname,
						port: proxyUrl.port
					})
				};
				let tunnelAgent;
				const overHttps = proxyUrl.protocol === 'https:';
				if (usingSsl) {
					tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
				} else {
					tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
				}
				agent = tunnelAgent(agentOptions);
				this._proxyAgent = agent;
			}
			if (this._keepAlive && !agent) {
				const options = {
					keepAlive: this._keepAlive,
					maxSockets
				};
				agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
				this._agent = agent;
			}
			if (!agent) {
				agent = usingSsl ? https.globalAgent : http.globalAgent;
			}
			if (usingSsl && this._ignoreSslError) {
				agent.options = Object.assign(agent.options || {}, {rejectUnauthorized: false});
			}
			return agent;
		}
		_performExponentialBackoff(retryNumber) {
			return __awaiter$4(this, void 0, void 0, function* () {
				retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
				const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
				return new Promise((resolve) => setTimeout(() => resolve(), ms));
			});
		}
		_processResponse(res, options) {
			return __awaiter$4(this, void 0, void 0, function* () {
				return new Promise((resolve, reject) => __awaiter$4(this, void 0, void 0, function* () {
					const statusCode = res.message.statusCode || 0;
					const response = {
						statusCode,
						result: null,
						headers: {}
					};
					if (statusCode === HttpCodes.NotFound) {
						resolve(response);
					}
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
							} else {
								obj = JSON.parse(contents);
							}
							response.result = obj;
						}
						response.headers = res.message.headers;
					} catch (err) {}
					if (statusCode > 299) {
						let msg;
						if (obj && obj.message) {
							msg = obj.message;
						} else if (contents && contents.length > 0) {
							msg = contents;
						} else {
							msg = `Failed request: (${statusCode})`;
						}
						const err = new HttpClientError(msg, statusCode);
						err.result = response.result;
						reject(err);
					} else {
						resolve(response);
					}
				}));
			});
		}
	}
	exports.HttpClient = HttpClient;
	const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+http-client@2.1.1/node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJSMin((exports, module) => {
	var __awaiter$3 = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
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
		canHandleAuthentication() {
			return false;
		}
		handleAuthentication() {
			return __awaiter$3(this, void 0, void 0, function* () {
				throw new Error('not implemented');
			});
		}
	}
	exports.BasicCredentialHandler = BasicCredentialHandler;
	class BearerCredentialHandler {
		constructor(token) {
			this.token = token;
		}
		prepareRequest(options) {
			if (!options.headers) {
				throw Error('The request has no headers');
			}
			options.headers['Authorization'] = `Bearer ${this.token}`;
		}
		canHandleAuthentication() {
			return false;
		}
		handleAuthentication() {
			return __awaiter$3(this, void 0, void 0, function* () {
				throw new Error('not implemented');
			});
		}
	}
	exports.BearerCredentialHandler = BearerCredentialHandler;
	class PersonalAccessTokenCredentialHandler {
		constructor(token) {
			this.token = token;
		}
		prepareRequest(options) {
			if (!options.headers) {
				throw Error('The request has no headers');
			}
			options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
		}
		canHandleAuthentication() {
			return false;
		}
		handleAuthentication() {
			return __awaiter$3(this, void 0, void 0, function* () {
				throw new Error('not implemented');
			});
		}
	}
	exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJSMin((exports, module) => {
	var __awaiter$2 = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.OidcClient = void 0;
	const http_client_1 = require_lib_index();
	const auth_1 = require_auth();
	const core_1 = require_core();
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
			return __awaiter$2(this, void 0, void 0, function* () {
				const httpclient = OidcClient.createHttpClient();
				const res = yield httpclient.getJson(id_token_url).catch((error$1) => {
					throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error$1.statusCode}\n 
        Error Message: ${error$1.message}`);
				});
				const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
				if (!id_token) {
					throw new Error('Response json body do not have ID Token field');
				}
				return id_token;
			});
		}
		static getIDToken(audience) {
			return __awaiter$2(this, void 0, void 0, function* () {
				try {
					let id_token_url = OidcClient.getIDTokenUrl();
					if (audience) {
						const encodedAudience = encodeURIComponent(audience);
						id_token_url = `${id_token_url}&audience=${encodedAudience}`;
					}
					core_1.debug(`ID token url is ${id_token_url}`);
					const id_token = yield OidcClient.getCall(id_token_url);
					core_1.setSecret(id_token);
					return id_token;
				} catch (error$1) {
					throw new Error(`Error message: ${error$1.message}`);
				}
			});
		}
	}
	exports.OidcClient = OidcClient;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/summary.js
var require_summary = __commonJSMin((exports, module) => {
	var __awaiter$1 = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
	const os_1 = require('os');
	const fs_1 = require('fs');
	const { access, appendFile, writeFile } = fs_1.promises;
	exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
	exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
	class Summary {
		constructor() {
			this._buffer = '';
		}
		filePath() {
			return __awaiter$1(this, void 0, void 0, function* () {
				if (this._filePath) {
					return this._filePath;
				}
				const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
				if (!pathFromEnv) {
					throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
				}
				try {
					yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
				} catch (_a) {
					throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
				}
				this._filePath = pathFromEnv;
				return this._filePath;
			});
		}
		wrap(tag, content, attrs = {}) {
			const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join('');
			if (!content) {
				return `<${tag}${htmlAttrs}>`;
			}
			return `<${tag}${htmlAttrs}>${content}</${tag}>`;
		}
		write(options) {
			return __awaiter$1(this, void 0, void 0, function* () {
				const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
				const filePath = yield this.filePath();
				const writeFunc = overwrite ? writeFile : appendFile;
				yield writeFunc(filePath, this._buffer, {encoding: 'utf8'});
				return this.emptyBuffer();
			});
		}
		clear() {
			return __awaiter$1(this, void 0, void 0, function* () {
				return this.emptyBuffer().write({overwrite: true});
			});
		}
		stringify() {
			return this._buffer;
		}
		isEmptyBuffer() {
			return this._buffer.length === 0;
		}
		emptyBuffer() {
			this._buffer = '';
			return this;
		}
		addRaw(text, addEOL = false) {
			this._buffer += text;
			return addEOL ? this.addEOL() : this;
		}
		addEOL() {
			return this.addRaw(os_1.EOL);
		}
		addCodeBlock(code, lang) {
			const attrs = Object.assign({}, (lang && {lang}));
			const element = this.wrap('pre', this.wrap('code', code), attrs);
			return this.addRaw(element).addEOL();
		}
		addList(items, ordered = false) {
			const tag = ordered ? 'ol' : 'ul';
			const listItems = items.map((item) => this.wrap('li', item)).join('');
			const element = this.wrap(tag, listItems);
			return this.addRaw(element).addEOL();
		}
		addTable(rows) {
			const tableBody = rows.map((row) => {
				const cells = row.map((cell) => {
					if (typeof cell === 'string') {
						return this.wrap('td', cell);
					}
					const { header, data, colspan, rowspan } = cell;
					const tag = header ? 'th' : 'td';
					const attrs = Object.assign(Object.assign({}, (colspan && {colspan})), (rowspan && {rowspan}));
					return this.wrap(tag, data, attrs);
				}).join('');
				return this.wrap('tr', cells);
			}).join('');
			const element = this.wrap('table', tableBody);
			return this.addRaw(element).addEOL();
		}
		addDetails(label, content) {
			const element = this.wrap('details', this.wrap('summary', label) + content);
			return this.addRaw(element).addEOL();
		}
		addImage(src, alt, options) {
			const { width, height } = options || {};
			const attrs = Object.assign(Object.assign({}, (width && {width})), (height && {height}));
			const element = this.wrap('img', null, Object.assign({
				src,
				alt
			}, attrs));
			return this.addRaw(element).addEOL();
		}
		addHeading(text, level) {
			const tag = `h${level}`;
			const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h1';
			const element = this.wrap(allowedTag, text);
			return this.addRaw(element).addEOL();
		}
		addSeparator() {
			const element = this.wrap('hr', null);
			return this.addRaw(element).addEOL();
		}
		addBreak() {
			const element = this.wrap('br', null);
			return this.addRaw(element).addEOL();
		}
		addQuote(text, cite) {
			const attrs = Object.assign({}, (cite && {cite}));
			const element = this.wrap('blockquote', text, attrs);
			return this.addRaw(element).addEOL();
		}
		addLink(text, href) {
			const element = this.wrap('a', text, {href});
			return this.addRaw(element).addEOL();
		}
	}
	const _summary = new Summary();
	exports.markdownSummary = _summary;
	exports.summary = _summary;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJSMin((exports, module) => {
	var __createBinding$1 = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$1 = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
		Object.defineProperty(o, 'default', {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o['default'] = v;
	});
	var __importStar$1 = (this && this.__importStar) || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
		}
		__setModuleDefault$1(result, mod);
		return result;
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
	const path$1 = __importStar$1(require('path'));
	function toPosixPath(pth) {
		return pth.replace(/[\\]/g, '/');
	}
	exports.toPosixPath = toPosixPath;
	function toWin32Path(pth) {
		return pth.replace(/[/]/g, '\\');
	}
	exports.toWin32Path = toWin32Path;
	function toPlatformPath(pth) {
		return pth.replace(/[/\\]/g, path$1.sep);
	}
	exports.toPlatformPath = toPlatformPath;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/core.js
var require_core = __commonJSMin((exports, module) => {
	var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	}) : (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
		Object.defineProperty(o, 'default', {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o['default'] = v;
	});
	var __importStar = (this && this.__importStar) || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, '__esModule', {value: true});
	exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
	const command_1 = require_command();
	const file_command_1 = require_file_command();
	const utils_1 = require_utils();
	const os = __importStar(require('os'));
	const path = __importStar(require('path'));
	const oidc_utils_1 = require_oidc_utils();
	var ExitCode;
	(function(ExitCode$1) {
		ExitCode$1[ExitCode$1['Success'] = 0] = 'Success';
		ExitCode$1[ExitCode$1['Failure'] = 1] = 'Failure';
	})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
	function exportVariable(name, val) {
		const convertedVal = utils_1.toCommandValue(val);
		process.env[name] = convertedVal;
		const filePath = process.env['GITHUB_ENV'] || '';
		if (filePath) {
			return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
		}
		command_1.issueCommand('set-env', {name}, convertedVal);
	}
	exports.exportVariable = exportVariable;
	function setSecret(secret) {
		command_1.issueCommand('add-mask', {}, secret);
	}
	exports.setSecret = setSecret;
	function addPath(inputPath) {
		const filePath = process.env['GITHUB_PATH'] || '';
		if (filePath) {
			file_command_1.issueFileCommand('PATH', inputPath);
		} else {
			command_1.issueCommand('add-path', {}, inputPath);
		}
		process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
	}
	exports.addPath = addPath;
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
	function getMultilineInput(name, options) {
		const inputs = getInput(name, options).split('\n').filter((x) => x !== '');
		if (options && options.trimWhitespace === false) {
			return inputs;
		}
		return inputs.map((input) => input.trim());
	}
	exports.getMultilineInput = getMultilineInput;
	function getBooleanInput(name, options) {
		const trueValue = ['true', 'True', 'TRUE'];
		const falseValue = ['false', 'False', 'FALSE'];
		const val = getInput(name, options);
		if (trueValue.includes(val)) return true;
		if (falseValue.includes(val)) return false;
		throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
	}
	exports.getBooleanInput = getBooleanInput;
	function setOutput(name, value) {
		const filePath = process.env['GITHUB_OUTPUT'] || '';
		if (filePath) {
			return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
		}
		process.stdout.write(os.EOL);
		command_1.issueCommand('set-output', {name}, utils_1.toCommandValue(value));
	}
	exports.setOutput = setOutput;
	function setCommandEcho(enabled) {
		command_1.issue('echo', enabled ? 'on' : 'off');
	}
	exports.setCommandEcho = setCommandEcho;
	function setFailed(message) {
		process.exitCode = ExitCode.Failure;
		error(message);
	}
	exports.setFailed = setFailed;
	function isDebug() {
		return process.env['RUNNER_DEBUG'] === '1';
	}
	exports.isDebug = isDebug;
	function debug(message) {
		command_1.issueCommand('debug', {}, message);
	}
	exports.debug = debug;
	function error(message, properties = {}) {
		command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
	}
	exports.error = error;
	function warning(message, properties = {}) {
		command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
	}
	exports.warning = warning;
	function notice(message, properties = {}) {
		command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
	}
	exports.notice = notice;
	function info(message) {
		process.stdout.write(message + os.EOL);
	}
	exports.info = info;
	function startGroup(name) {
		command_1.issue('group', name);
	}
	exports.startGroup = startGroup;
	function endGroup() {
		command_1.issue('endgroup');
	}
	exports.endGroup = endGroup;
	function group(name, fn) {
		return __awaiter(this, void 0, void 0, function* () {
			startGroup(name);
			let result;
			try {
				result = yield fn();
			} finally {
				endGroup();
			}
			return result;
		});
	}
	exports.group = group;
	function saveState(name, value) {
		const filePath = process.env['GITHUB_STATE'] || '';
		if (filePath) {
			return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
		}
		command_1.issueCommand('save-state', {name}, utils_1.toCommandValue(value));
	}
	exports.saveState = saveState;
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
	var summary_1 = require_summary();
	Object.defineProperty(exports, 'summary', {
		enumerable: true,
		get: function() {
			return summary_1.summary;
		}
	});
	var summary_2 = require_summary();
	Object.defineProperty(exports, 'markdownSummary', {
		enumerable: true,
		get: function() {
			return summary_2.markdownSummary;
		}
	});
	var path_utils_1 = require_path_utils();
	Object.defineProperty(exports, 'toPosixPath', {
		enumerable: true,
		get: function() {
			return path_utils_1.toPosixPath;
		}
	});
	Object.defineProperty(exports, 'toWin32Path', {
		enumerable: true,
		get: function() {
			return path_utils_1.toWin32Path;
		}
	});
	Object.defineProperty(exports, 'toPlatformPath', {
		enumerable: true,
		get: function() {
			return path_utils_1.toPlatformPath;
		}
	});
});

//#endregion
//#region src/index.ts
var import_core = __toESM(require_core());
async function run() {
	try {
		const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json());
		import_core.info(`fetched data: ${JSON.stringify(data)}`);
	} catch (error$1) {
		if (error$1 instanceof Error) {
			import_core.setFailed(error$1.message);
		} else {
			import_core.setFailed('An unexpected error occurred');
		}
	}
}
run().catch((err) => {
	console.error(err);
	import_core.setFailed(err);
	process$1.exit(1);
});

//#endregion