//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
const { default: process$1 } = __toESM(require("node:process"));

//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/utils.js
var require_utils = __commonJSMin((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toCommandProperties = exports.toCommandValue = void 0;
	function toCommandValue(input) {
		if (input === null || input === undefined) {
			return "";
		} else if (typeof input === "string" || input instanceof String) {
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
//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/command.js
var require_command = __commonJSMin((exports, module) => {
	var __createBinding$9 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			desc = {
				enumerable: true,
				get: function() {
					return m[k];
				}
			};
		}
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$9 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$9 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$9(result, mod, k);
		}
		__setModuleDefault$9(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.issue = exports.issueCommand = void 0;
	const os$3 = __importStar$9(require("os"));
	const utils_1$2 = require_utils();
	function issueCommand(command, properties, message) {
		const cmd = new Command(command, properties, message);
		process.stdout.write(cmd.toString() + os$3.EOL);
	}
	exports.issueCommand = issueCommand;
	function issue(name, message = "") {
		issueCommand(name, {}, message);
	}
	exports.issue = issue;
	const CMD_STRING = "::";
	class Command {
		constructor(command, properties, message) {
			if (!command) {
				command = "missing.command";
			}
			this.command = command;
			this.properties = properties;
			this.message = message;
		}
		toString() {
			let cmdStr = CMD_STRING + this.command;
			if (this.properties && Object.keys(this.properties).length > 0) {
				cmdStr += " ";
				let first = true;
				for (const key in this.properties) {
					if (this.properties.hasOwnProperty(key)) {
						const val = this.properties[key];
						if (val) {
							if (first) {
								first = false;
							} else {
								cmdStr += ",";
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
		return (0, utils_1$2.toCommandValue)(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
	}
	function escapeProperty(s) {
		return (0, utils_1$2.toCommandValue)(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
	}
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJSMin((exports, module) => {
	var __createBinding$8 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			desc = {
				enumerable: true,
				get: function() {
					return m[k];
				}
			};
		}
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$8 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$8 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$8(result, mod, k);
		}
		__setModuleDefault$8(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
	const crypto = __importStar$8(require("crypto"));
	const fs$1 = __importStar$8(require("fs"));
	const os$2 = __importStar$8(require("os"));
	const utils_1$1 = require_utils();
	function issueFileCommand(command, message) {
		const filePath = process.env[`GITHUB_${command}`];
		if (!filePath) {
			throw new Error(`Unable to find environment variable for file command ${command}`);
		}
		if (!fs$1.existsSync(filePath)) {
			throw new Error(`Missing file at path: ${filePath}`);
		}
		fs$1.appendFileSync(filePath, `${(0, utils_1$1.toCommandValue)(message)}${os$2.EOL}`, { encoding: "utf8" });
	}
	exports.issueFileCommand = issueFileCommand;
	function prepareKeyValueMessage(key, value) {
		const delimiter = `ghadelimiter_${crypto.randomUUID()}`;
		const convertedValue = (0, utils_1$1.toCommandValue)(value);
		if (key.includes(delimiter)) {
			throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
		}
		if (convertedValue.includes(delimiter)) {
			throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
		}
		return `${key}<<${delimiter}${os$2.EOL}${convertedValue}${os$2.EOL}${delimiter}`;
	}
	exports.prepareKeyValueMessage = prepareKeyValueMessage;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+http-client@2.1.1/node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJSMin((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkBypass = exports.getProxyUrl = void 0;
	function getProxyUrl$1(reqUrl) {
		const usingSsl = reqUrl.protocol === "https:";
		if (checkBypass(reqUrl)) {
			return undefined;
		}
		const proxyVar = (() => {
			if (usingSsl) {
				return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
			} else {
				return process.env["http_proxy"] || process.env["HTTP_PROXY"];
			}
		})();
		if (proxyVar) {
			try {
				return new URL(proxyVar);
			} catch (_a$1) {
				if (!proxyVar.startsWith("http://") && !proxyVar.startsWith("https://")) return new URL(`http://${proxyVar}`);
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
		const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
		if (!noProxy) {
			return false;
		}
		let reqPort;
		if (reqUrl.port) {
			reqPort = Number(reqUrl.port);
		} else if (reqUrl.protocol === "http:") {
			reqPort = 80;
		} else if (reqUrl.protocol === "https:") {
			reqPort = 443;
		}
		const upperReqHosts = [reqUrl.hostname.toUpperCase()];
		if (typeof reqPort === "number") {
			upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
		}
		for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
			if (upperNoProxyItem === "*" || upperReqHosts.some((x) => x === upperNoProxyItem || x.endsWith(`.${upperNoProxyItem}`) || upperNoProxyItem.startsWith(".") && x.endsWith(`${upperNoProxyItem}`))) {
				return true;
			}
		}
		return false;
	}
	exports.checkBypass = checkBypass;
	function isLoopbackAddress(host) {
		const hostLower = host.toLowerCase();
		return hostLower === "localhost" || hostLower.startsWith("127.") || hostLower.startsWith("[::1]") || hostLower.startsWith("[0:0:0:0:0:0:0:1]");
	}
});

//#endregion
//#region ../../node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJSMin((exports, module) => {
	var net = require("net");
	var tls = require("tls");
	var http$1 = require("http");
	var https$1 = require("https");
	var events$1 = require("events");
	var assert = require("assert");
	var util = require("util");
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
		self.on("free", function onFree(socket, host, port, localAddress) {
			var options$1 = toOptions(host, port, localAddress);
			for (var i = 0, len = self.requests.length; i < len; ++i) {
				var pending = self.requests[i];
				if (pending.host === options$1.host && pending.port === options$1.port) {
					self.requests.splice(i, 1);
					pending.request.onSocket(socket);
					return;
				}
			}
			socket.destroy();
			self.removeSocket(socket);
		});
	}
	util.inherits(TunnelingAgent, events$1.EventEmitter);
	TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
		var self = this;
		var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
		if (self.sockets.length >= this.maxSockets) {
			self.requests.push(options);
			return;
		}
		self.createSocket(options, function(socket) {
			socket.on("free", onFree);
			socket.on("close", onCloseOrRemove);
			socket.on("agentRemove", onCloseOrRemove);
			req.onSocket(socket);
			function onFree() {
				self.emit("free", socket, options);
			}
			function onCloseOrRemove(err) {
				self.removeSocket(socket);
				socket.removeListener("free", onFree);
				socket.removeListener("close", onCloseOrRemove);
				socket.removeListener("agentRemove", onCloseOrRemove);
			}
		});
	};
	TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
		var self = this;
		var placeholder = {};
		self.sockets.push(placeholder);
		var connectOptions = mergeOptions({}, self.proxyOptions, {
			method: "CONNECT",
			path: options.host + ":" + options.port,
			agent: false,
			headers: { host: options.host + ":" + options.port }
		});
		if (options.localAddress) {
			connectOptions.localAddress = options.localAddress;
		}
		if (connectOptions.proxyAuth) {
			connectOptions.headers = connectOptions.headers || {};
			connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
		}
		debug$1("making CONNECT request");
		var connectReq = self.request(connectOptions);
		connectReq.useChunkedEncodingByDefault = false;
		connectReq.once("response", onResponse);
		connectReq.once("upgrade", onUpgrade);
		connectReq.once("connect", onConnect);
		connectReq.once("error", onError);
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
				debug$1("tunneling socket could not be established, statusCode=%d", res.statusCode);
				socket.destroy();
				var error$1 = new Error("tunneling socket could not be established, " + "statusCode=" + res.statusCode);
				error$1.code = "ECONNRESET";
				options.request.emit("error", error$1);
				self.removeSocket(placeholder);
				return;
			}
			if (head.length > 0) {
				debug$1("got illegal response body from proxy");
				socket.destroy();
				var error$1 = new Error("got illegal response body from proxy");
				error$1.code = "ECONNRESET";
				options.request.emit("error", error$1);
				self.removeSocket(placeholder);
				return;
			}
			debug$1("tunneling connection has established");
			self.sockets[self.sockets.indexOf(placeholder)] = socket;
			return cb(socket);
		}
		function onError(cause) {
			connectReq.removeAllListeners();
			debug$1("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
			var error$1 = new Error("tunneling socket could not be established, " + "cause=" + cause.message);
			error$1.code = "ECONNRESET";
			options.request.emit("error", error$1);
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
			var hostHeader = options.request.getHeader("host");
			var tlsOptions = mergeOptions({}, self.options, {
				socket,
				servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
			});
			var secureSocket = tls.connect(0, tlsOptions);
			self.sockets[self.sockets.indexOf(socket)] = secureSocket;
			cb(secureSocket);
		});
	}
	function toOptions(host, port, localAddress) {
		if (typeof host === "string") {
			return {
				host,
				port,
				localAddress
			};
		}
		return host;
	}
	function mergeOptions(target) {
		for (var i = 1, len = arguments.length; i < len; ++i) {
			var overrides = arguments[i];
			if (typeof overrides === "object") {
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
			if (typeof args[0] === "string") {
				args[0] = "TUNNEL: " + args[0];
			} else {
				args.unshift("TUNNEL:");
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
	var __createBinding$7 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$7 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$7 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$7(result, mod, k);
		}
		__setModuleDefault$7(result, mod);
		return result;
	};
	var __awaiter$9 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
	const http = __importStar$7(require("http"));
	const https = __importStar$7(require("https"));
	const pm = __importStar$7(require_proxy());
	const tunnel = __importStar$7(require_tunnel_index());
	var HttpCodes;
	(function(HttpCodes$1) {
		HttpCodes$1[HttpCodes$1["OK"] = 200] = "OK";
		HttpCodes$1[HttpCodes$1["MultipleChoices"] = 300] = "MultipleChoices";
		HttpCodes$1[HttpCodes$1["MovedPermanently"] = 301] = "MovedPermanently";
		HttpCodes$1[HttpCodes$1["ResourceMoved"] = 302] = "ResourceMoved";
		HttpCodes$1[HttpCodes$1["SeeOther"] = 303] = "SeeOther";
		HttpCodes$1[HttpCodes$1["NotModified"] = 304] = "NotModified";
		HttpCodes$1[HttpCodes$1["UseProxy"] = 305] = "UseProxy";
		HttpCodes$1[HttpCodes$1["SwitchProxy"] = 306] = "SwitchProxy";
		HttpCodes$1[HttpCodes$1["TemporaryRedirect"] = 307] = "TemporaryRedirect";
		HttpCodes$1[HttpCodes$1["PermanentRedirect"] = 308] = "PermanentRedirect";
		HttpCodes$1[HttpCodes$1["BadRequest"] = 400] = "BadRequest";
		HttpCodes$1[HttpCodes$1["Unauthorized"] = 401] = "Unauthorized";
		HttpCodes$1[HttpCodes$1["PaymentRequired"] = 402] = "PaymentRequired";
		HttpCodes$1[HttpCodes$1["Forbidden"] = 403] = "Forbidden";
		HttpCodes$1[HttpCodes$1["NotFound"] = 404] = "NotFound";
		HttpCodes$1[HttpCodes$1["MethodNotAllowed"] = 405] = "MethodNotAllowed";
		HttpCodes$1[HttpCodes$1["NotAcceptable"] = 406] = "NotAcceptable";
		HttpCodes$1[HttpCodes$1["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
		HttpCodes$1[HttpCodes$1["RequestTimeout"] = 408] = "RequestTimeout";
		HttpCodes$1[HttpCodes$1["Conflict"] = 409] = "Conflict";
		HttpCodes$1[HttpCodes$1["Gone"] = 410] = "Gone";
		HttpCodes$1[HttpCodes$1["TooManyRequests"] = 429] = "TooManyRequests";
		HttpCodes$1[HttpCodes$1["InternalServerError"] = 500] = "InternalServerError";
		HttpCodes$1[HttpCodes$1["NotImplemented"] = 501] = "NotImplemented";
		HttpCodes$1[HttpCodes$1["BadGateway"] = 502] = "BadGateway";
		HttpCodes$1[HttpCodes$1["ServiceUnavailable"] = 503] = "ServiceUnavailable";
		HttpCodes$1[HttpCodes$1["GatewayTimeout"] = 504] = "GatewayTimeout";
	})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
	var Headers;
	(function(Headers$1) {
		Headers$1["Accept"] = "accept";
		Headers$1["ContentType"] = "content-type";
	})(Headers = exports.Headers || (exports.Headers = {}));
	var MediaTypes;
	(function(MediaTypes$1) {
		MediaTypes$1["ApplicationJson"] = "application/json";
	})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
	function getProxyUrl(serverUrl) {
		const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
		return proxyUrl ? proxyUrl.href : "";
	}
	exports.getProxyUrl = getProxyUrl;
	const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
	const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
	const RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
	const ExponentialBackoffCeiling = 10;
	const ExponentialBackoffTimeSlice = 5;
	class HttpClientError extends Error {
		constructor(message, statusCode) {
			super(message);
			this.name = "HttpClientError";
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
			return __awaiter$9(this, void 0, void 0, function* () {
				return new Promise((resolve) => __awaiter$9(this, void 0, void 0, function* () {
					let output = Buffer.alloc(0);
					this.message.on("data", (chunk) => {
						output = Buffer.concat([output, chunk]);
					});
					this.message.on("end", () => {
						resolve(output.toString());
					});
				}));
			});
		}
		readBodyBuffer() {
			return __awaiter$9(this, void 0, void 0, function* () {
				return new Promise((resolve) => __awaiter$9(this, void 0, void 0, function* () {
					const chunks = [];
					this.message.on("data", (chunk) => {
						chunks.push(chunk);
					});
					this.message.on("end", () => {
						resolve(Buffer.concat(chunks));
					});
				}));
			});
		}
	}
	exports.HttpClientResponse = HttpClientResponse;
	function isHttps(requestUrl) {
		const parsedUrl = new URL(requestUrl);
		return parsedUrl.protocol === "https:";
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
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
			});
		}
		get(requestUrl, additionalHeaders) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request("GET", requestUrl, null, additionalHeaders || {});
			});
		}
		del(requestUrl, additionalHeaders) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request("DELETE", requestUrl, null, additionalHeaders || {});
			});
		}
		post(requestUrl, data, additionalHeaders) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request("POST", requestUrl, data, additionalHeaders || {});
			});
		}
		patch(requestUrl, data, additionalHeaders) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request("PATCH", requestUrl, data, additionalHeaders || {});
			});
		}
		put(requestUrl, data, additionalHeaders) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request("PUT", requestUrl, data, additionalHeaders || {});
			});
		}
		head(requestUrl, additionalHeaders) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request("HEAD", requestUrl, null, additionalHeaders || {});
			});
		}
		sendStream(verb, requestUrl, stream, additionalHeaders) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return this.request(verb, requestUrl, stream, additionalHeaders);
			});
		}
		getJson(requestUrl, additionalHeaders = {}) {
			return __awaiter$9(this, void 0, void 0, function* () {
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				const res = yield this.get(requestUrl, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		postJson(requestUrl, obj, additionalHeaders = {}) {
			return __awaiter$9(this, void 0, void 0, function* () {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
				const res = yield this.post(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		putJson(requestUrl, obj, additionalHeaders = {}) {
			return __awaiter$9(this, void 0, void 0, function* () {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
				const res = yield this.put(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		patchJson(requestUrl, obj, additionalHeaders = {}) {
			return __awaiter$9(this, void 0, void 0, function* () {
				const data = JSON.stringify(obj, null, 2);
				additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
				additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
				const res = yield this.patch(requestUrl, data, additionalHeaders);
				return this._processResponse(res, this.requestOptions);
			});
		}
		request(verb, requestUrl, data, headers) {
			return __awaiter$9(this, void 0, void 0, function* () {
				if (this._disposed) {
					throw new Error("Client has already been disposed.");
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
						const redirectUrl = response.message.headers["location"];
						if (!redirectUrl) {
							break;
						}
						const parsedRedirectUrl = new URL(redirectUrl);
						if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
							throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
						}
						yield response.readBody();
						if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
							for (const header in headers) {
								if (header.toLowerCase() === "authorization") {
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
			return __awaiter$9(this, void 0, void 0, function* () {
				return new Promise((resolve, reject) => {
					function callbackForResult(err, res) {
						if (err) {
							reject(err);
						} else if (!res) {
							reject(new Error("Unknown error"));
						} else {
							resolve(res);
						}
					}
					this.requestRawWithCallback(info$1, data, callbackForResult);
				});
			});
		}
		requestRawWithCallback(info$1, data, onResult) {
			if (typeof data === "string") {
				if (!info$1.options.headers) {
					info$1.options.headers = {};
				}
				info$1.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
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
			req.on("socket", (sock) => {
				socket = sock;
			});
			req.setTimeout(this._socketTimeout || 3 * 60000, () => {
				if (socket) {
					socket.end();
				}
				handleResult(new Error(`Request timeout: ${info$1.options.path}`));
			});
			req.on("error", function(err) {
				handleResult(err);
			});
			if (data && typeof data === "string") {
				req.write(data, "utf8");
			}
			if (data && typeof data !== "string") {
				data.on("close", function() {
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
			const usingSsl = info$1.parsedUrl.protocol === "https:";
			info$1.httpModule = usingSsl ? https : http;
			const defaultPort = usingSsl ? 443 : 80;
			info$1.options = {};
			info$1.options.host = info$1.parsedUrl.hostname;
			info$1.options.port = info$1.parsedUrl.port ? parseInt(info$1.parsedUrl.port) : defaultPort;
			info$1.options.path = (info$1.parsedUrl.pathname || "") + (info$1.parsedUrl.search || "");
			info$1.options.method = method;
			info$1.options.headers = this._mergeHeaders(headers);
			if (this.userAgent != null) {
				info$1.options.headers["user-agent"] = this.userAgent;
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
			const usingSsl = parsedUrl.protocol === "https:";
			let maxSockets = 100;
			if (this.requestOptions) {
				maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
			}
			if (proxyUrl && proxyUrl.hostname) {
				const agentOptions = {
					maxSockets,
					keepAlive: this._keepAlive,
					proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && { proxyAuth: `${proxyUrl.username}:${proxyUrl.password}` }), {
						host: proxyUrl.hostname,
						port: proxyUrl.port
					})
				};
				let tunnelAgent;
				const overHttps = proxyUrl.protocol === "https:";
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
				agent.options = Object.assign(agent.options || {}, { rejectUnauthorized: false });
			}
			return agent;
		}
		_performExponentialBackoff(retryNumber) {
			return __awaiter$9(this, void 0, void 0, function* () {
				retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
				const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
				return new Promise((resolve) => setTimeout(() => resolve(), ms));
			});
		}
		_processResponse(res, options) {
			return __awaiter$9(this, void 0, void 0, function* () {
				return new Promise((resolve, reject) => __awaiter$9(this, void 0, void 0, function* () {
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
						if (typeof value === "string") {
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
	const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+http-client@2.1.1/node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJSMin((exports, module) => {
	var __awaiter$8 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
	class BasicCredentialHandler {
		constructor(username, password) {
			this.username = username;
			this.password = password;
		}
		prepareRequest(options) {
			if (!options.headers) {
				throw Error("The request has no headers");
			}
			options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
		}
		canHandleAuthentication() {
			return false;
		}
		handleAuthentication() {
			return __awaiter$8(this, void 0, void 0, function* () {
				throw new Error("not implemented");
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
				throw Error("The request has no headers");
			}
			options.headers["Authorization"] = `Bearer ${this.token}`;
		}
		canHandleAuthentication() {
			return false;
		}
		handleAuthentication() {
			return __awaiter$8(this, void 0, void 0, function* () {
				throw new Error("not implemented");
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
				throw Error("The request has no headers");
			}
			options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
		}
		canHandleAuthentication() {
			return false;
		}
		handleAuthentication() {
			return __awaiter$8(this, void 0, void 0, function* () {
				throw new Error("not implemented");
			});
		}
	}
	exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJSMin((exports, module) => {
	var __awaiter$7 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
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
			return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
		}
		static getRequestToken() {
			const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
			if (!token) {
				throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
			}
			return token;
		}
		static getIDTokenUrl() {
			const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
			if (!runtimeUrl) {
				throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
			}
			return runtimeUrl;
		}
		static getCall(id_token_url) {
			var _a$1;
			return __awaiter$7(this, void 0, void 0, function* () {
				const httpclient = OidcClient.createHttpClient();
				const res = yield httpclient.getJson(id_token_url).catch((error$1) => {
					throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error$1.statusCode}\n 
        Error Message: ${error$1.message}`);
				});
				const id_token = (_a$1 = res.result) === null || _a$1 === void 0 ? void 0 : _a$1.value;
				if (!id_token) {
					throw new Error("Response json body do not have ID Token field");
				}
				return id_token;
			});
		}
		static getIDToken(audience) {
			return __awaiter$7(this, void 0, void 0, function* () {
				try {
					let id_token_url = OidcClient.getIDTokenUrl();
					if (audience) {
						const encodedAudience = encodeURIComponent(audience);
						id_token_url = `${id_token_url}&audience=${encodedAudience}`;
					}
					(0, core_1.debug)(`ID token url is ${id_token_url}`);
					const id_token = yield OidcClient.getCall(id_token_url);
					(0, core_1.setSecret)(id_token);
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
//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/summary.js
var require_summary = __commonJSMin((exports, module) => {
	var __awaiter$6 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
	const os_1$1 = require("os");
	const fs_1 = require("fs");
	const { access, appendFile, writeFile } = fs_1.promises;
	exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
	exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
	class Summary {
		constructor() {
			this._buffer = "";
		}
		filePath() {
			return __awaiter$6(this, void 0, void 0, function* () {
				if (this._filePath) {
					return this._filePath;
				}
				const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
				if (!pathFromEnv) {
					throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
				}
				try {
					yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
				} catch (_a$1) {
					throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
				}
				this._filePath = pathFromEnv;
				return this._filePath;
			});
		}
		wrap(tag, content, attrs = {}) {
			const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
			if (!content) {
				return `<${tag}${htmlAttrs}>`;
			}
			return `<${tag}${htmlAttrs}>${content}</${tag}>`;
		}
		write(options) {
			return __awaiter$6(this, void 0, void 0, function* () {
				const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
				const filePath = yield this.filePath();
				const writeFunc = overwrite ? writeFile : appendFile;
				yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
				return this.emptyBuffer();
			});
		}
		clear() {
			return __awaiter$6(this, void 0, void 0, function* () {
				return this.emptyBuffer().write({ overwrite: true });
			});
		}
		stringify() {
			return this._buffer;
		}
		isEmptyBuffer() {
			return this._buffer.length === 0;
		}
		emptyBuffer() {
			this._buffer = "";
			return this;
		}
		addRaw(text, addEOL = false) {
			this._buffer += text;
			return addEOL ? this.addEOL() : this;
		}
		addEOL() {
			return this.addRaw(os_1$1.EOL);
		}
		addCodeBlock(code, lang) {
			const attrs = Object.assign({}, lang && { lang });
			const element = this.wrap("pre", this.wrap("code", code), attrs);
			return this.addRaw(element).addEOL();
		}
		addList(items, ordered = false) {
			const tag = ordered ? "ol" : "ul";
			const listItems = items.map((item) => this.wrap("li", item)).join("");
			const element = this.wrap(tag, listItems);
			return this.addRaw(element).addEOL();
		}
		addTable(rows) {
			const tableBody = rows.map((row) => {
				const cells = row.map((cell) => {
					if (typeof cell === "string") {
						return this.wrap("td", cell);
					}
					const { header, data, colspan, rowspan } = cell;
					const tag = header ? "th" : "td";
					const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
					return this.wrap(tag, data, attrs);
				}).join("");
				return this.wrap("tr", cells);
			}).join("");
			const element = this.wrap("table", tableBody);
			return this.addRaw(element).addEOL();
		}
		addDetails(label, content) {
			const element = this.wrap("details", this.wrap("summary", label) + content);
			return this.addRaw(element).addEOL();
		}
		addImage(src, alt, options) {
			const { width, height } = options || {};
			const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
			const element = this.wrap("img", null, Object.assign({
				src,
				alt
			}, attrs));
			return this.addRaw(element).addEOL();
		}
		addHeading(text, level) {
			const tag = `h${level}`;
			const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
			const element = this.wrap(allowedTag, text);
			return this.addRaw(element).addEOL();
		}
		addSeparator() {
			const element = this.wrap("hr", null);
			return this.addRaw(element).addEOL();
		}
		addBreak() {
			const element = this.wrap("br", null);
			return this.addRaw(element).addEOL();
		}
		addQuote(text, cite) {
			const attrs = Object.assign({}, cite && { cite });
			const element = this.wrap("blockquote", text, attrs);
			return this.addRaw(element).addEOL();
		}
		addLink(text, href) {
			const element = this.wrap("a", text, { href });
			return this.addRaw(element).addEOL();
		}
	}
	const _summary = new Summary();
	exports.markdownSummary = _summary;
	exports.summary = _summary;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJSMin((exports, module) => {
	var __createBinding$6 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			desc = {
				enumerable: true,
				get: function() {
					return m[k];
				}
			};
		}
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$6 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$6 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$6(result, mod, k);
		}
		__setModuleDefault$6(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
	const path$4 = __importStar$6(require("path"));
	function toPosixPath(pth) {
		return pth.replace(/[\\]/g, "/");
	}
	exports.toPosixPath = toPosixPath;
	function toWin32Path(pth) {
		return pth.replace(/[/]/g, "\\");
	}
	exports.toWin32Path = toWin32Path;
	function toPlatformPath(pth) {
		return pth.replace(/[/\\]/g, path$4.sep);
	}
	exports.toPlatformPath = toPlatformPath;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+io@1.1.3/node_modules/@actions/io/lib/io-util.js
var require_io_util = __commonJSMin((exports, module) => {
	var __createBinding$5 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$5 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$5 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$5(result, mod, k);
		}
		__setModuleDefault$5(result, mod);
		return result;
	};
	var __awaiter$5 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.READONLY = exports.UV_FS_O_EXLOCK = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rm = exports.rename = exports.readlink = exports.readdir = exports.open = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
	const fs = __importStar$5(require("fs"));
	const path$3 = __importStar$5(require("path"));
	_a = fs.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.open = _a.open, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rm = _a.rm, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
	exports.IS_WINDOWS = process.platform === "win32";
	exports.UV_FS_O_EXLOCK = 0x10000000;
	exports.READONLY = fs.constants.O_RDONLY;
	function exists(fsPath) {
		return __awaiter$5(this, void 0, void 0, function* () {
			try {
				yield exports.stat(fsPath);
			} catch (err) {
				if (err.code === "ENOENT") {
					return false;
				}
				throw err;
			}
			return true;
		});
	}
	exports.exists = exists;
	function isDirectory(fsPath, useStat = false) {
		return __awaiter$5(this, void 0, void 0, function* () {
			const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
			return stats.isDirectory();
		});
	}
	exports.isDirectory = isDirectory;
	function isRooted(p) {
		p = normalizeSeparators(p);
		if (!p) {
			throw new Error("isRooted() parameter \"p\" cannot be empty");
		}
		if (exports.IS_WINDOWS) {
			return p.startsWith("\\") || /^[A-Z]:/i.test(p);
		}
		return p.startsWith("/");
	}
	exports.isRooted = isRooted;
	function tryGetExecutablePath(filePath, extensions) {
		return __awaiter$5(this, void 0, void 0, function* () {
			let stats = undefined;
			try {
				stats = yield exports.stat(filePath);
			} catch (err) {
				if (err.code !== "ENOENT") {
					console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
				}
			}
			if (stats && stats.isFile()) {
				if (exports.IS_WINDOWS) {
					const upperExt = path$3.extname(filePath).toUpperCase();
					if (extensions.some((validExt) => validExt.toUpperCase() === upperExt)) {
						return filePath;
					}
				} else {
					if (isUnixExecutable(stats)) {
						return filePath;
					}
				}
			}
			const originalFilePath = filePath;
			for (const extension of extensions) {
				filePath = originalFilePath + extension;
				stats = undefined;
				try {
					stats = yield exports.stat(filePath);
				} catch (err) {
					if (err.code !== "ENOENT") {
						console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
					}
				}
				if (stats && stats.isFile()) {
					if (exports.IS_WINDOWS) {
						try {
							const directory = path$3.dirname(filePath);
							const upperName = path$3.basename(filePath).toUpperCase();
							for (const actualName of yield exports.readdir(directory)) {
								if (upperName === actualName.toUpperCase()) {
									filePath = path$3.join(directory, actualName);
									break;
								}
							}
						} catch (err) {
							console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
						}
						return filePath;
					} else {
						if (isUnixExecutable(stats)) {
							return filePath;
						}
					}
				}
			}
			return "";
		});
	}
	exports.tryGetExecutablePath = tryGetExecutablePath;
	function normalizeSeparators(p) {
		p = p || "";
		if (exports.IS_WINDOWS) {
			p = p.replace(/\//g, "\\");
			return p.replace(/\\\\+/g, "\\");
		}
		return p.replace(/\/\/+/g, "/");
	}
	function isUnixExecutable(stats) {
		return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
	}
	function getCmdPath() {
		var _a$1;
		return (_a$1 = process.env["COMSPEC"]) !== null && _a$1 !== void 0 ? _a$1 : `cmd.exe`;
	}
	exports.getCmdPath = getCmdPath;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+io@1.1.3/node_modules/@actions/io/lib/io.js
var require_io = __commonJSMin((exports, module) => {
	var __createBinding$4 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$4 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$4 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);
		}
		__setModuleDefault$4(result, mod);
		return result;
	};
	var __awaiter$4 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.findInPath = exports.which = exports.mkdirP = exports.rmRF = exports.mv = exports.cp = void 0;
	const assert_1 = require("assert");
	const path$2 = __importStar$4(require("path"));
	const ioUtil$1 = __importStar$4(require_io_util());
	function cp(source, dest, options = {}) {
		return __awaiter$4(this, void 0, void 0, function* () {
			const { force, recursive, copySourceDirectory } = readCopyOptions(options);
			const destStat = (yield ioUtil$1.exists(dest)) ? yield ioUtil$1.stat(dest) : null;
			if (destStat && destStat.isFile() && !force) {
				return;
			}
			const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? path$2.join(dest, path$2.basename(source)) : dest;
			if (!(yield ioUtil$1.exists(source))) {
				throw new Error(`no such file or directory: ${source}`);
			}
			const sourceStat = yield ioUtil$1.stat(source);
			if (sourceStat.isDirectory()) {
				if (!recursive) {
					throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
				} else {
					yield cpDirRecursive(source, newDest, 0, force);
				}
			} else {
				if (path$2.relative(source, newDest) === "") {
					throw new Error(`'${newDest}' and '${source}' are the same file`);
				}
				yield copyFile(source, newDest, force);
			}
		});
	}
	exports.cp = cp;
	function mv(source, dest, options = {}) {
		return __awaiter$4(this, void 0, void 0, function* () {
			if (yield ioUtil$1.exists(dest)) {
				let destExists = true;
				if (yield ioUtil$1.isDirectory(dest)) {
					dest = path$2.join(dest, path$2.basename(source));
					destExists = yield ioUtil$1.exists(dest);
				}
				if (destExists) {
					if (options.force == null || options.force) {
						yield rmRF(dest);
					} else {
						throw new Error("Destination already exists");
					}
				}
			}
			yield mkdirP(path$2.dirname(dest));
			yield ioUtil$1.rename(source, dest);
		});
	}
	exports.mv = mv;
	function rmRF(inputPath) {
		return __awaiter$4(this, void 0, void 0, function* () {
			if (ioUtil$1.IS_WINDOWS) {
				if (/[*"<>|]/.test(inputPath)) {
					throw new Error("File path must not contain `*`, `\"`, `<`, `>` or `|` on Windows");
				}
			}
			try {
				yield ioUtil$1.rm(inputPath, {
					force: true,
					maxRetries: 3,
					recursive: true,
					retryDelay: 300
				});
			} catch (err) {
				throw new Error(`File was unable to be removed ${err}`);
			}
		});
	}
	exports.rmRF = rmRF;
	function mkdirP(fsPath) {
		return __awaiter$4(this, void 0, void 0, function* () {
			assert_1.ok(fsPath, "a path argument must be provided");
			yield ioUtil$1.mkdir(fsPath, { recursive: true });
		});
	}
	exports.mkdirP = mkdirP;
	function which(tool, check) {
		return __awaiter$4(this, void 0, void 0, function* () {
			if (!tool) {
				throw new Error("parameter 'tool' is required");
			}
			if (check) {
				const result = yield which(tool, false);
				if (!result) {
					if (ioUtil$1.IS_WINDOWS) {
						throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
					} else {
						throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
					}
				}
				return result;
			}
			const matches = yield findInPath(tool);
			if (matches && matches.length > 0) {
				return matches[0];
			}
			return "";
		});
	}
	exports.which = which;
	function findInPath(tool) {
		return __awaiter$4(this, void 0, void 0, function* () {
			if (!tool) {
				throw new Error("parameter 'tool' is required");
			}
			const extensions = [];
			if (ioUtil$1.IS_WINDOWS && process.env["PATHEXT"]) {
				for (const extension of process.env["PATHEXT"].split(path$2.delimiter)) {
					if (extension) {
						extensions.push(extension);
					}
				}
			}
			if (ioUtil$1.isRooted(tool)) {
				const filePath = yield ioUtil$1.tryGetExecutablePath(tool, extensions);
				if (filePath) {
					return [filePath];
				}
				return [];
			}
			if (tool.includes(path$2.sep)) {
				return [];
			}
			const directories = [];
			if (process.env.PATH) {
				for (const p of process.env.PATH.split(path$2.delimiter)) {
					if (p) {
						directories.push(p);
					}
				}
			}
			const matches = [];
			for (const directory of directories) {
				const filePath = yield ioUtil$1.tryGetExecutablePath(path$2.join(directory, tool), extensions);
				if (filePath) {
					matches.push(filePath);
				}
			}
			return matches;
		});
	}
	exports.findInPath = findInPath;
	function readCopyOptions(options) {
		const force = options.force == null ? true : options.force;
		const recursive = Boolean(options.recursive);
		const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
		return {
			force,
			recursive,
			copySourceDirectory
		};
	}
	function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
		return __awaiter$4(this, void 0, void 0, function* () {
			if (currentDepth >= 255) return;
			currentDepth++;
			yield mkdirP(destDir);
			const files = yield ioUtil$1.readdir(sourceDir);
			for (const fileName of files) {
				const srcFile = `${sourceDir}/${fileName}`;
				const destFile = `${destDir}/${fileName}`;
				const srcFileStat = yield ioUtil$1.lstat(srcFile);
				if (srcFileStat.isDirectory()) {
					yield cpDirRecursive(srcFile, destFile, currentDepth, force);
				} else {
					yield copyFile(srcFile, destFile, force);
				}
			}
			yield ioUtil$1.chmod(destDir, (yield ioUtil$1.stat(sourceDir)).mode);
		});
	}
	function copyFile(srcFile, destFile, force) {
		return __awaiter$4(this, void 0, void 0, function* () {
			if ((yield ioUtil$1.lstat(srcFile)).isSymbolicLink()) {
				try {
					yield ioUtil$1.lstat(destFile);
					yield ioUtil$1.unlink(destFile);
				} catch (e) {
					if (e.code === "EPERM") {
						yield ioUtil$1.chmod(destFile, "0666");
						yield ioUtil$1.unlink(destFile);
					}
				}
				const symlinkFull = yield ioUtil$1.readlink(srcFile);
				yield ioUtil$1.symlink(symlinkFull, destFile, ioUtil$1.IS_WINDOWS ? "junction" : null);
			} else if (!(yield ioUtil$1.exists(destFile)) || force) {
				yield ioUtil$1.copyFile(srcFile, destFile);
			}
		});
	}
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+exec@1.1.1/node_modules/@actions/exec/lib/toolrunner.js
var require_toolrunner = __commonJSMin((exports, module) => {
	var __createBinding$3 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$3 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$3 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);
		}
		__setModuleDefault$3(result, mod);
		return result;
	};
	var __awaiter$3 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.argStringToArray = exports.ToolRunner = void 0;
	const os$1 = __importStar$3(require("os"));
	const events = __importStar$3(require("events"));
	const child = __importStar$3(require("child_process"));
	const path$1 = __importStar$3(require("path"));
	const io = __importStar$3(require_io());
	const ioUtil = __importStar$3(require_io_util());
	const timers_1 = require("timers");
	const IS_WINDOWS = process.platform === "win32";
	class ToolRunner extends events.EventEmitter {
		constructor(toolPath, args, options) {
			super();
			if (!toolPath) {
				throw new Error("Parameter 'toolPath' cannot be null or empty.");
			}
			this.toolPath = toolPath;
			this.args = args || [];
			this.options = options || {};
		}
		_debug(message) {
			if (this.options.listeners && this.options.listeners.debug) {
				this.options.listeners.debug(message);
			}
		}
		_getCommandString(options, noPrefix) {
			const toolPath = this._getSpawnFileName();
			const args = this._getSpawnArgs(options);
			let cmd = noPrefix ? "" : "[command]";
			if (IS_WINDOWS) {
				if (this._isCmdFile()) {
					cmd += toolPath;
					for (const a of args) {
						cmd += ` ${a}`;
					}
				} else if (options.windowsVerbatimArguments) {
					cmd += `"${toolPath}"`;
					for (const a of args) {
						cmd += ` ${a}`;
					}
				} else {
					cmd += this._windowsQuoteCmdArg(toolPath);
					for (const a of args) {
						cmd += ` ${this._windowsQuoteCmdArg(a)}`;
					}
				}
			} else {
				cmd += toolPath;
				for (const a of args) {
					cmd += ` ${a}`;
				}
			}
			return cmd;
		}
		_processLineBuffer(data, strBuffer, onLine) {
			try {
				let s = strBuffer + data.toString();
				let n = s.indexOf(os$1.EOL);
				while (n > -1) {
					const line = s.substring(0, n);
					onLine(line);
					s = s.substring(n + os$1.EOL.length);
					n = s.indexOf(os$1.EOL);
				}
				return s;
			} catch (err) {
				this._debug(`error processing line. Failed with error ${err}`);
				return "";
			}
		}
		_getSpawnFileName() {
			if (IS_WINDOWS) {
				if (this._isCmdFile()) {
					return process.env["COMSPEC"] || "cmd.exe";
				}
			}
			return this.toolPath;
		}
		_getSpawnArgs(options) {
			if (IS_WINDOWS) {
				if (this._isCmdFile()) {
					let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
					for (const a of this.args) {
						argline += " ";
						argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
					}
					argline += "\"";
					return [argline];
				}
			}
			return this.args;
		}
		_endsWith(str, end) {
			return str.endsWith(end);
		}
		_isCmdFile() {
			const upperToolPath = this.toolPath.toUpperCase();
			return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
		}
		_windowsQuoteCmdArg(arg) {
			if (!this._isCmdFile()) {
				return this._uvQuoteCmdArg(arg);
			}
			if (!arg) {
				return "\"\"";
			}
			const cmdSpecialChars = [" ", "	", "&", "(", ")", "[", "]", "{", "}", "^", "=", ";", "!", "'", "+", ",", "`", "~", "|", "<", ">", "\""];
			let needsQuotes = false;
			for (const char of arg) {
				if (cmdSpecialChars.some((x) => x === char)) {
					needsQuotes = true;
					break;
				}
			}
			if (!needsQuotes) {
				return arg;
			}
			let reverse = "\"";
			let quoteHit = true;
			for (let i = arg.length; i > 0; i--) {
				reverse += arg[i - 1];
				if (quoteHit && arg[i - 1] === "\\") {
					reverse += "\\";
				} else if (arg[i - 1] === "\"") {
					quoteHit = true;
					reverse += "\"";
				} else {
					quoteHit = false;
				}
			}
			reverse += "\"";
			return reverse.split("").reverse().join("");
		}
		_uvQuoteCmdArg(arg) {
			if (!arg) {
				return "\"\"";
			}
			if (!arg.includes(" ") && !arg.includes("	") && !arg.includes("\"")) {
				return arg;
			}
			if (!arg.includes("\"") && !arg.includes("\\")) {
				return `"${arg}"`;
			}
			let reverse = "\"";
			let quoteHit = true;
			for (let i = arg.length; i > 0; i--) {
				reverse += arg[i - 1];
				if (quoteHit && arg[i - 1] === "\\") {
					reverse += "\\";
				} else if (arg[i - 1] === "\"") {
					quoteHit = true;
					reverse += "\\";
				} else {
					quoteHit = false;
				}
			}
			reverse += "\"";
			return reverse.split("").reverse().join("");
		}
		_cloneExecOptions(options) {
			options = options || {};
			const result = {
				cwd: options.cwd || process.cwd(),
				env: options.env || process.env,
				silent: options.silent || false,
				windowsVerbatimArguments: options.windowsVerbatimArguments || false,
				failOnStdErr: options.failOnStdErr || false,
				ignoreReturnCode: options.ignoreReturnCode || false,
				delay: options.delay || 10000
			};
			result.outStream = options.outStream || process.stdout;
			result.errStream = options.errStream || process.stderr;
			return result;
		}
		_getSpawnOptions(options, toolPath) {
			options = options || {};
			const result = {};
			result.cwd = options.cwd;
			result.env = options.env;
			result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
			if (options.windowsVerbatimArguments) {
				result.argv0 = `"${toolPath}"`;
			}
			return result;
		}
		exec() {
			return __awaiter$3(this, void 0, void 0, function* () {
				if (!ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || IS_WINDOWS && this.toolPath.includes("\\"))) {
					this.toolPath = path$1.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
				}
				this.toolPath = yield io.which(this.toolPath, true);
				return new Promise((resolve, reject) => __awaiter$3(this, void 0, void 0, function* () {
					this._debug(`exec tool: ${this.toolPath}`);
					this._debug("arguments:");
					for (const arg of this.args) {
						this._debug(`   ${arg}`);
					}
					const optionsNonNull = this._cloneExecOptions(this.options);
					if (!optionsNonNull.silent && optionsNonNull.outStream) {
						optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os$1.EOL);
					}
					const state = new ExecState(optionsNonNull, this.toolPath);
					state.on("debug", (message) => {
						this._debug(message);
					});
					if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
						return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
					}
					const fileName = this._getSpawnFileName();
					const cp$1 = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
					let stdbuffer = "";
					if (cp$1.stdout) {
						cp$1.stdout.on("data", (data) => {
							if (this.options.listeners && this.options.listeners.stdout) {
								this.options.listeners.stdout(data);
							}
							if (!optionsNonNull.silent && optionsNonNull.outStream) {
								optionsNonNull.outStream.write(data);
							}
							stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
								if (this.options.listeners && this.options.listeners.stdline) {
									this.options.listeners.stdline(line);
								}
							});
						});
					}
					let errbuffer = "";
					if (cp$1.stderr) {
						cp$1.stderr.on("data", (data) => {
							state.processStderr = true;
							if (this.options.listeners && this.options.listeners.stderr) {
								this.options.listeners.stderr(data);
							}
							if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
								const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
								s.write(data);
							}
							errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
								if (this.options.listeners && this.options.listeners.errline) {
									this.options.listeners.errline(line);
								}
							});
						});
					}
					cp$1.on("error", (err) => {
						state.processError = err.message;
						state.processExited = true;
						state.processClosed = true;
						state.CheckComplete();
					});
					cp$1.on("exit", (code) => {
						state.processExitCode = code;
						state.processExited = true;
						this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
						state.CheckComplete();
					});
					cp$1.on("close", (code) => {
						state.processExitCode = code;
						state.processExited = true;
						state.processClosed = true;
						this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
						state.CheckComplete();
					});
					state.on("done", (error$1, exitCode) => {
						if (stdbuffer.length > 0) {
							this.emit("stdline", stdbuffer);
						}
						if (errbuffer.length > 0) {
							this.emit("errline", errbuffer);
						}
						cp$1.removeAllListeners();
						if (error$1) {
							reject(error$1);
						} else {
							resolve(exitCode);
						}
					});
					if (this.options.input) {
						if (!cp$1.stdin) {
							throw new Error("child process missing stdin");
						}
						cp$1.stdin.end(this.options.input);
					}
				}));
			});
		}
	}
	exports.ToolRunner = ToolRunner;
	function argStringToArray(argString) {
		const args = [];
		let inQuotes = false;
		let escaped = false;
		let arg = "";
		function append(c) {
			if (escaped && c !== "\"") {
				arg += "\\";
			}
			arg += c;
			escaped = false;
		}
		for (let i = 0; i < argString.length; i++) {
			const c = argString.charAt(i);
			if (c === "\"") {
				if (!escaped) {
					inQuotes = !inQuotes;
				} else {
					append(c);
				}
				continue;
			}
			if (c === "\\" && escaped) {
				append(c);
				continue;
			}
			if (c === "\\" && inQuotes) {
				escaped = true;
				continue;
			}
			if (c === " " && !inQuotes) {
				if (arg.length > 0) {
					args.push(arg);
					arg = "";
				}
				continue;
			}
			append(c);
		}
		if (arg.length > 0) {
			args.push(arg.trim());
		}
		return args;
	}
	exports.argStringToArray = argStringToArray;
	class ExecState extends events.EventEmitter {
		constructor(options, toolPath) {
			super();
			this.processClosed = false;
			this.processError = "";
			this.processExitCode = 0;
			this.processExited = false;
			this.processStderr = false;
			this.delay = 10000;
			this.done = false;
			this.timeout = null;
			if (!toolPath) {
				throw new Error("toolPath must not be empty");
			}
			this.options = options;
			this.toolPath = toolPath;
			if (options.delay) {
				this.delay = options.delay;
			}
		}
		CheckComplete() {
			if (this.done) {
				return;
			}
			if (this.processClosed) {
				this._setResult();
			} else if (this.processExited) {
				this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
			}
		}
		_debug(message) {
			this.emit("debug", message);
		}
		_setResult() {
			let error$1;
			if (this.processExited) {
				if (this.processError) {
					error$1 = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
				} else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
					error$1 = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
				} else if (this.processStderr && this.options.failOnStdErr) {
					error$1 = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
				}
			}
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.done = true;
			this.emit("done", error$1, this.processExitCode);
		}
		static HandleTimeout(state) {
			if (state.done) {
				return;
			}
			if (!state.processClosed && state.processExited) {
				const message = `The STDIO streams did not close within ${state.delay / 1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
				state._debug(message);
			}
			state._setResult();
		}
	}
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+exec@1.1.1/node_modules/@actions/exec/lib/exec.js
var require_exec = __commonJSMin((exports, module) => {
	var __createBinding$2 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, {
			enumerable: true,
			get: function() {
				return m[k];
			}
		});
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$2 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$2 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
		}
		__setModuleDefault$2(result, mod);
		return result;
	};
	var __awaiter$2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getExecOutput = exports.exec = void 0;
	const string_decoder_1 = require("string_decoder");
	const tr = __importStar$2(require_toolrunner());
	function exec$1(commandLine, args, options) {
		return __awaiter$2(this, void 0, void 0, function* () {
			const commandArgs = tr.argStringToArray(commandLine);
			if (commandArgs.length === 0) {
				throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
			}
			const toolPath = commandArgs[0];
			args = commandArgs.slice(1).concat(args || []);
			const runner = new tr.ToolRunner(toolPath, args, options);
			return runner.exec();
		});
	}
	exports.exec = exec$1;
	function getExecOutput(commandLine, args, options) {
		var _a$1, _b;
		return __awaiter$2(this, void 0, void 0, function* () {
			let stdout = "";
			let stderr = "";
			const stdoutDecoder = new string_decoder_1.StringDecoder("utf8");
			const stderrDecoder = new string_decoder_1.StringDecoder("utf8");
			const originalStdoutListener = (_a$1 = options === null || options === void 0 ? void 0 : options.listeners) === null || _a$1 === void 0 ? void 0 : _a$1.stdout;
			const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
			const stdErrListener = (data) => {
				stderr += stderrDecoder.write(data);
				if (originalStdErrListener) {
					originalStdErrListener(data);
				}
			};
			const stdOutListener = (data) => {
				stdout += stdoutDecoder.write(data);
				if (originalStdoutListener) {
					originalStdoutListener(data);
				}
			};
			const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), {
				stdout: stdOutListener,
				stderr: stdErrListener
			});
			const exitCode = yield exec$1(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
			stdout += stdoutDecoder.end();
			stderr += stderrDecoder.end();
			return {
				exitCode,
				stdout,
				stderr
			};
		});
	}
	exports.getExecOutput = getExecOutput;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/platform.js
var require_platform = __commonJSMin((exports, module) => {
	var __createBinding$1 = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			desc = {
				enumerable: true,
				get: function() {
					return m[k];
				}
			};
		}
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault$1 = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar$1 = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
		}
		__setModuleDefault$1(result, mod);
		return result;
	};
	var __awaiter$1 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	var __importDefault = this && this.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getDetails = exports.isLinux = exports.isMacOS = exports.isWindows = exports.arch = exports.platform = void 0;
	const os_1 = __importDefault(require("os"));
	const exec = __importStar$1(require_exec());
	const getWindowsInfo = () => __awaiter$1(void 0, void 0, void 0, function* () {
		const { stdout: version } = yield exec.getExecOutput("powershell -command \"(Get-CimInstance -ClassName Win32_OperatingSystem).Version\"", undefined, { silent: true });
		const { stdout: name } = yield exec.getExecOutput("powershell -command \"(Get-CimInstance -ClassName Win32_OperatingSystem).Caption\"", undefined, { silent: true });
		return {
			name: name.trim(),
			version: version.trim()
		};
	});
	const getMacOsInfo = () => __awaiter$1(void 0, void 0, void 0, function* () {
		var _a$1, _b, _c, _d;
		const { stdout } = yield exec.getExecOutput("sw_vers", undefined, { silent: true });
		const version = (_b = (_a$1 = stdout.match(/ProductVersion:\s*(.+)/)) === null || _a$1 === void 0 ? void 0 : _a$1[1]) !== null && _b !== void 0 ? _b : "";
		const name = (_d = (_c = stdout.match(/ProductName:\s*(.+)/)) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : "";
		return {
			name,
			version
		};
	});
	const getLinuxInfo = () => __awaiter$1(void 0, void 0, void 0, function* () {
		const { stdout } = yield exec.getExecOutput("lsb_release", ["-i", "-r", "-s"], { silent: true });
		const [name, version] = stdout.trim().split("\n");
		return {
			name,
			version
		};
	});
	exports.platform = os_1.default.platform();
	exports.arch = os_1.default.arch();
	exports.isWindows = exports.platform === "win32";
	exports.isMacOS = exports.platform === "darwin";
	exports.isLinux = exports.platform === "linux";
	function getDetails() {
		return __awaiter$1(this, void 0, void 0, function* () {
			return Object.assign(Object.assign({}, yield exports.isWindows ? getWindowsInfo() : exports.isMacOS ? getMacOsInfo() : getLinuxInfo()), {
				platform: exports.platform,
				arch: exports.arch,
				isWindows: exports.isWindows,
				isMacOS: exports.isMacOS,
				isLinux: exports.isLinux
			});
		});
	}
	exports.getDetails = getDetails;
});

//#endregion
//#region ../../node_modules/.pnpm/@actions+core@1.11.1/node_modules/@actions/core/lib/core.js
var require_core = __commonJSMin((exports, module) => {
	var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			desc = {
				enumerable: true,
				get: function() {
					return m[k];
				}
			};
		}
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar = this && this.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
					step(generator["throw"](value));
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.platform = exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = exports.markdownSummary = exports.summary = exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
	const command_1 = require_command();
	const file_command_1 = require_file_command();
	const utils_1 = require_utils();
	const os = __importStar(require("os"));
	const path = __importStar(require("path"));
	const oidc_utils_1 = require_oidc_utils();
	var ExitCode;
	(function(ExitCode$1) {
		ExitCode$1[ExitCode$1["Success"] = 0] = "Success";
		ExitCode$1[ExitCode$1["Failure"] = 1] = "Failure";
	})(ExitCode || (exports.ExitCode = ExitCode = {}));
	function exportVariable(name, val) {
		const convertedVal = (0, utils_1.toCommandValue)(val);
		process.env[name] = convertedVal;
		const filePath = process.env["GITHUB_ENV"] || "";
		if (filePath) {
			return (0, file_command_1.issueFileCommand)("ENV", (0, file_command_1.prepareKeyValueMessage)(name, val));
		}
		(0, command_1.issueCommand)("set-env", { name }, convertedVal);
	}
	exports.exportVariable = exportVariable;
	function setSecret(secret) {
		(0, command_1.issueCommand)("add-mask", {}, secret);
	}
	exports.setSecret = setSecret;
	function addPath(inputPath) {
		const filePath = process.env["GITHUB_PATH"] || "";
		if (filePath) {
			(0, file_command_1.issueFileCommand)("PATH", inputPath);
		} else {
			(0, command_1.issueCommand)("add-path", {}, inputPath);
		}
		process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
	}
	exports.addPath = addPath;
	function getInput(name, options) {
		const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
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
		const inputs = getInput(name, options).split("\n").filter((x) => x !== "");
		if (options && options.trimWhitespace === false) {
			return inputs;
		}
		return inputs.map((input) => input.trim());
	}
	exports.getMultilineInput = getMultilineInput;
	function getBooleanInput(name, options) {
		const trueValue = ["true", "True", "TRUE"];
		const falseValue = ["false", "False", "FALSE"];
		const val = getInput(name, options);
		if (trueValue.includes(val)) return true;
		if (falseValue.includes(val)) return false;
		throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
	}
	exports.getBooleanInput = getBooleanInput;
	function setOutput(name, value) {
		const filePath = process.env["GITHUB_OUTPUT"] || "";
		if (filePath) {
			return (0, file_command_1.issueFileCommand)("OUTPUT", (0, file_command_1.prepareKeyValueMessage)(name, value));
		}
		process.stdout.write(os.EOL);
		(0, command_1.issueCommand)("set-output", { name }, (0, utils_1.toCommandValue)(value));
	}
	exports.setOutput = setOutput;
	function setCommandEcho(enabled) {
		(0, command_1.issue)("echo", enabled ? "on" : "off");
	}
	exports.setCommandEcho = setCommandEcho;
	function setFailed(message) {
		process.exitCode = ExitCode.Failure;
		error(message);
	}
	exports.setFailed = setFailed;
	function isDebug() {
		return process.env["RUNNER_DEBUG"] === "1";
	}
	exports.isDebug = isDebug;
	function debug(message) {
		(0, command_1.issueCommand)("debug", {}, message);
	}
	exports.debug = debug;
	function error(message, properties = {}) {
		(0, command_1.issueCommand)("error", (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
	}
	exports.error = error;
	function warning(message, properties = {}) {
		(0, command_1.issueCommand)("warning", (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
	}
	exports.warning = warning;
	function notice(message, properties = {}) {
		(0, command_1.issueCommand)("notice", (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
	}
	exports.notice = notice;
	function info(message) {
		process.stdout.write(message + os.EOL);
	}
	exports.info = info;
	function startGroup(name) {
		(0, command_1.issue)("group", name);
	}
	exports.startGroup = startGroup;
	function endGroup() {
		(0, command_1.issue)("endgroup");
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
		const filePath = process.env["GITHUB_STATE"] || "";
		if (filePath) {
			return (0, file_command_1.issueFileCommand)("STATE", (0, file_command_1.prepareKeyValueMessage)(name, value));
		}
		(0, command_1.issueCommand)("save-state", { name }, (0, utils_1.toCommandValue)(value));
	}
	exports.saveState = saveState;
	function getState(name) {
		return process.env[`STATE_${name}`] || "";
	}
	exports.getState = getState;
	function getIDToken(aud) {
		return __awaiter(this, void 0, void 0, function* () {
			return yield oidc_utils_1.OidcClient.getIDToken(aud);
		});
	}
	exports.getIDToken = getIDToken;
	var summary_1 = require_summary();
	Object.defineProperty(exports, "summary", {
		enumerable: true,
		get: function() {
			return summary_1.summary;
		}
	});
	var summary_2 = require_summary();
	Object.defineProperty(exports, "markdownSummary", {
		enumerable: true,
		get: function() {
			return summary_2.markdownSummary;
		}
	});
	var path_utils_1 = require_path_utils();
	Object.defineProperty(exports, "toPosixPath", {
		enumerable: true,
		get: function() {
			return path_utils_1.toPosixPath;
		}
	});
	Object.defineProperty(exports, "toWin32Path", {
		enumerable: true,
		get: function() {
			return path_utils_1.toWin32Path;
		}
	});
	Object.defineProperty(exports, "toPlatformPath", {
		enumerable: true,
		get: function() {
			return path_utils_1.toPlatformPath;
		}
	});
	exports.platform = __importStar(require_platform());
});

//#endregion
//#region src/index.ts
var import_core = __toESM(require_core());
async function run() {
	try {
		const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json());
		import_core.info(`fetched data: ${JSON.stringify(data)}`);
	} catch (error$1) {
		if (error$1 instanceof Error) {
			import_core.setFailed(error$1.message);
		} else {
			import_core.setFailed("An unexpected error occurred");
		}
	}
}
run().catch((err) => {
	console.error(err);
	import_core.setFailed(err);
	process$1.exit(1);
});

//#endregion