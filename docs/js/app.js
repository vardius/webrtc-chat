webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);
	
	__webpack_require__(83);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * This file is part of the noggin package.
	 *
	 * (c) Rafał Lorenz <vardius@gmail.com>
	 *
	 * For the full copyright and license information, please view the LICENSE
	 * file that was distributed with this source code.
	 */
	var app = new _app2.default();

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _peerData = __webpack_require__(2);
	
	var _signaling = __webpack_require__(70);
	
	var _logger = __webpack_require__(71);
	
	var _guiManager = __webpack_require__(75);
	
	var _chat = __webpack_require__(72);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * This file is part of the webrtc-chat package.
	                                                                                                                                                           *
	                                                                                                                                                           * (c) Rafał Lorenz <vardius@gmail.com>
	                                                                                                                                                           *
	                                                                                                                                                           * For the full copyright and license information, please view the LICENSE
	                                                                                                                                                           * file that was distributed with this source code.
	                                                                                                                                                           */
	
	
	var logLevel = _peerData.LogLevel.ERROR;
	var servers = {
	    iceServers: [{ url: "stun:stun.1.google.com:19302" }]
	};
	var constraints = { ordered: true };
	
	var App = function App() {
	    _classCallCheck(this, App);
	
	    this.signaling = new _signaling.Signaling();
	    this.config = new _peerData.PeerDataConfig(servers, constraints, logLevel, this.signaling);
	    this.config.logger = new _logger.Logger(logLevel);
	    this.peerData = new _peerData.PeerData(this.config);
	    this.gui = new _guiManager.GuiManager(this.peerData, this.signaling);
	    this.chat = new _chat.Chat(this.peerData, this.config.logger);
	};
	
	exports.default = App;
	;
	module.exports = exports['default'];

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Signaling = exports.SignalingData = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of the webrtc-chat package.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * (c) Rafał Lorenz <vardius@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For the full copyright and license information, please view the LICENSE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file that was distributed with this source code.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _peerData = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SignalingData = exports.SignalingData = {
	    events: [],
	    candidatesLoaded: false,
	    offerLoaded: false,
	    answerLoaded: false
	};
	
	var Signaling = exports.Signaling = function () {
	    function Signaling() {
	        _classCallCheck(this, Signaling);
	
	        this.id = 'singlePeer';
	    }
	
	    _createClass(Signaling, [{
	        key: "send",
	        value: function send(event) {
	            event.caller = { id: this.id };
	
	            switch (event.type) {
	                case _peerData.SignalingEventType.OFFER:
	                    this.onOffer.apply(this, [event]);
	                    break;
	                case _peerData.SignalingEventType.ANSWER:
	                    this.onAnswer.apply(this, [event]);
	                    break;
	                case _peerData.SignalingEventType.CANDIDATE:
	                    this.onCandidate.apply(this, [event]);
	                    break;
	                case _peerData.SignalingEventType.CONNECT:
	                    this.onConnect.apply(this, [event]);
	                    break;
	                case _peerData.SignalingEventType.DISCONNECT:
	                    this.onDisconnect.apply(this, [event]);
	                    break;
	            }
	        }
	    }, {
	        key: "onMessage",
	        value: function onMessage(event) {
	            switch (event.type) {
	                case _peerData.SignalingEventType.OFFER:
	                    _peerData.PeerDataBridge.onOffer(event);
	                    break;
	                case _peerData.SignalingEventType.ANSWER:
	                    _peerData.PeerDataBridge.onAnswer(event);
	                    break;
	                case _peerData.SignalingEventType.CANDIDATE:
	                    _peerData.PeerDataBridge.onCandidate(event);
	                    break;
	            }
	        }
	    }, {
	        key: "onConnect",
	        value: function onConnect(event) {
	            _peerData.PeerDataBridge.onConnect(event);
	        }
	    }, {
	        key: "onDisconnect",
	        value: function onDisconnect(event) {
	            _peerData.PeerDataBridge.onDisconnect(event);
	        }
	    }, {
	        key: "onCandidate",
	        value: function onCandidate(event) {
	            if (event.data) {
	                SignalingData.events.push(event);
	            } else {
	                SignalingData.candidatesLoaded = true;
	            }
	        }
	    }, {
	        key: "onOffer",
	        value: function onOffer(event) {
	            SignalingData.events.push(event);
	            SignalingData.offerLoaded = true;
	        }
	    }, {
	        key: "onAnswer",
	        value: function onAnswer(event) {
	            SignalingData.events.push(event);
	            SignalingData.answerLoaded = true;
	        }
	    }]);

	    return Signaling;
	}();

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Logger = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of the webrtc-chat package.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * (c) Rafał Lorenz <vardius@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For the full copyright and license information, please view the LICENSE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file that was distributed with this source code.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _peerData = __webpack_require__(2);
	
	var _chat = __webpack_require__(72);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Logger = exports.Logger = function () {
	    function Logger(logLevel) {
	        _classCallCheck(this, Logger);
	
	        this._logLevel = logLevel;
	    }
	
	    _createClass(Logger, [{
	        key: "info",
	        value: function info(data) {
	            this.trace(data, 'info');
	        }
	    }, {
	        key: "log",
	        value: function log(data) {
	            this.trace(data, 'log');
	        }
	    }, {
	        key: "warn",
	        value: function warn(data) {
	            this.trace(data, 'warn');
	        }
	    }, {
	        key: "error",
	        value: function error(data) {
	            this.trace(data, 'error');
	        }
	    }, {
	        key: "trace",
	        value: function trace(data, method) {
	            if (this._logLevel === _peerData.LogLevel.OFF) {
	                return;
	            }
	            if (this._logLevel === _peerData.LogLevel.WARN && method === 'error') {
	                return;
	            }
	            if (this._logLevel === _peerData.LogLevel.INFO && (method === 'error' || method === 'warn')) {
	                return;
	            }
	            var now = new Date();
	            now = now.getHours() + '.' + now.getMinutes();
	            if (data instanceof Error) {
	                this.logToChat(method, now + ': ' + data.toString());
	            }
	            this.logToChat(method, now + ': ' + data);
	        }
	    }, {
	        key: "logToChat",
	        value: function logToChat(method, message) {
	            var template = __webpack_require__(74);
	            template = template.replace(/{{message}}/gi, function (prop) {
	                return message;
	            });
	            template = template.replace(/{{class}}/gi, function (prop) {
	                return method;
	            });
	            document.querySelector('div.chat').innerHTML += template;
	            _chat.Chat.scrollDown();
	        }
	    }, {
	        key: "logLevel",
	        get: function get() {
	            return this._logLevel;
	        },
	        set: function set(value) {
	            this._logLevel = value;
	        }
	    }]);

	    return Logger;
	}();

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Chat = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of the webrtc-chat package.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * (c) Rafał Lorenz <vardius@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For the full copyright and license information, please view the LICENSE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file that was distributed with this source code.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _peerData = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Chat = exports.Chat = function () {
	    function Chat(peerData, logger) {
	        _classCallCheck(this, Chat);
	
	        this.peerData = peerData;
	        this.logger = logger;
	        this.inputSelector = 'input#sendInput';
	        this.subscribeEvents();
	        this.init('sendBtn');
	    }
	
	    _createClass(Chat, [{
	        key: 'init',
	        value: function init(id) {
	            var sendBtn = document.getElementById(id);
	            sendBtn.addEventListener('click', this.onSend.bind(this));
	
	            document.querySelector(this.inputSelector).addEventListener('keypress', this.onEnter.bind(this));
	        }
	    }, {
	        key: 'subscribeEvents',
	        value: function subscribeEvents() {
	            this.peerData.on(_peerData.EventType.OPEN, this.onOpen.bind(this));
	            this.peerData.on(_peerData.EventType.CLOSE, this.onClose.bind(this));
	            this.peerData.on(_peerData.EventType.DATA, this.onData.bind(this));
	            this.peerData.on(_peerData.EventType.ERROR, this.onError.bind(this));
	        }
	    }, {
	        key: 'onEnter',
	        value: function onEnter(event) {
	            if (event.keyCode === 13) {
	                this.onSend();
	            }
	        }
	    }, {
	        key: 'onSend',
	        value: function onSend() {
	            var message = document.querySelector(this.inputSelector).value;
	            if (message.length > 0) {
	                this.clearInput();
	                this.peerData.send(message);
	                this.addMessage(message);
	                this.constructor.scrollDown();
	            }
	        }
	    }, {
	        key: 'onOpen',
	        value: function onOpen(event) {
	            this.logger.info('User joined chat');
	        }
	    }, {
	        key: 'onClose',
	        value: function onClose(event) {
	            this.logger.info('User left chat');
	        }
	    }, {
	        key: 'onData',
	        value: function onData(event) {
	            this.addMessage(event.data, true);
	        }
	    }, {
	        key: 'onError',
	        value: function onError(event) {
	            this.logger.error(event);
	        }
	    }, {
	        key: 'clearInput',
	        value: function clearInput() {
	            document.querySelector(this.inputSelector).value = '';
	        }
	    }, {
	        key: 'addMessage',
	        value: function addMessage(message) {
	            var incoming = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var template = __webpack_require__(73);
	            template = template.replace(/{{message}}/gi, function (prop) {
	                return message;
	            });
	            template = template.replace(/{{class}}/gi, function (prop) {
	                return incoming ? 'income' : 'outcome';
	            });
	            document.querySelector('div.chat').innerHTML += template;
	        }
	    }], [{
	        key: 'scrollDown',
	        value: function scrollDown() {
	            var elem = document.querySelector('div.chat');
	            elem.scrollTop = elem.scrollHeight;
	        }
	    }]);

	    return Chat;
	}();

/***/ },

/***/ 73:
/***/ function(module, exports) {

	module.exports = "<div class=\"bubble {{class}}\">{{message}}</div>"

/***/ },

/***/ 74:
/***/ function(module, exports) {

	module.exports = "<div class=\"bubble system {{class}}\">{{message}}</div>"

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GuiManager = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of the webrtc-chat package.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * (c) Rafał Lorenz <vardius@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For the full copyright and license information, please view the LICENSE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file that was distributed with this source code.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _modalManager = __webpack_require__(77);
	
	var _eventsLoader = __webpack_require__(82);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GuiManager = exports.GuiManager = function () {
	    function GuiManager(peerData, signaling) {
	        _classCallCheck(this, GuiManager);
	
	        this.peerData = peerData;
	        this.signaling = signaling;
	        this.init();
	    }
	
	    _createClass(GuiManager, [{
	        key: "init",
	        value: function init() {
	            var token = this.getToken();
	            if (token) {
	                _eventsLoader.EventsLoader.load(token, this.signaling.onMessage);
	            } else {
	                this.peerData.connect();
	                _modalManager.ModalManager.onHide('#shareModal', function (event) {
	                    document.querySelector('div#share-info').innerHTML = '';
	                    $('#loadModal').modal('show');
	                });
	            }
	
	            var loadBtn = document.getElementById('loadBtn');
	            loadBtn.addEventListener('click', this.onLoad.bind(this));
	
	            _modalManager.ModalManager.onHide('#loadModal', function (event) {
	                return document.querySelector('div#load-info').innerHTML = '';
	            });
	            this.modalLoop(10);
	        }
	    }, {
	        key: "modalLoop",
	        value: function modalLoop(i) {
	            var _this = this;
	
	            setTimeout(function () {
	                if (_modalManager.ModalManager.showShareModal() !== true && --i) _this.modalLoop(i);
	            }, 1000);
	        }
	    }, {
	        key: "onLoad",
	        value: function onLoad() {
	            var data = document.querySelector('textarea#loadInput').value;
	            _eventsLoader.EventsLoader.load(data, this.signaling.onMessage);
	            $('#loadModal').modal('hide');
	        }
	    }, {
	        key: "getToken",
	        value: function getToken() {
	            return window.location.hash.substring(1);
	        }
	    }]);

	    return GuiManager;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)))

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModalManager = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of the webrtc-chat package.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * (c) Rafał Lorenz <vardius@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For the full copyright and license information, please view the LICENSE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file that was distributed with this source code.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _signaling = __webpack_require__(70);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ModalManager = exports.ModalManager = function () {
	    function ModalManager() {
	        _classCallCheck(this, ModalManager);
	    }
	
	    _createClass(ModalManager, null, [{
	        key: 'showShareModal',
	        value: function showShareModal() {
	            if (_signaling.SignalingData.candidatesLoaded !== true || _signaling.SignalingData.offerLoaded !== true && _signaling.SignalingData.answerLoaded !== true) {
	                return false;
	            }
	
	            var templateName = _signaling.SignalingData.offerLoaded ? 'offer' : 'answer';
	            var token = JSON.stringify(_signaling.SignalingData.events);
	            var data = (_signaling.SignalingData.offerLoaded ? location.href + '#' : '') + encodeURIComponent(token);
	
	            var template = __webpack_require__(78)("./" + templateName + '.html');
	
	            template = template.replace(/{{data}}/gi, function (prop) {
	                return data;
	            });
	            document.querySelector('div#share-info').innerHTML += template;
	            $('#shareModal').modal('show');
	
	            return true;
	        }
	    }, {
	        key: 'onHide',
	        value: function onHide(selector, callback) {
	            $(selector).on('hide.bs.modal', callback);
	        }
	    }]);

	    return ModalManager;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)))

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./answer.html": 79,
		"./index.html": 80,
		"./message.html": 73,
		"./offer.html": 81,
		"./system-message.html": 74
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 78;


/***/ },

/***/ 79:
/***/ function(module, exports) {

	module.exports = "<h1>Share this token with the other side</h1>\n<p>{{data}}</p>"

/***/ },

/***/ 80:
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n\n    <meta name=\"description\" content=\"Serverless chat application using peer to peer WebRTC\">\n    <meta name=\"keywords\"\n          content=\"HTML, HTML5, CSS, CSS3, XML, XHTML, JavaScript, EcmaScript, EcmaScript6, Rafał, Lorenz, WebRTC, real, time, communication\">\n    <meta name=\"author\" content=\"Rafał Lorenz\">\n    <meta name=\"copyright\" content=\"Rafał Lorenz\"/>\n</head>\n<body>\n<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\n                    data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">WebRTC Chat</a>\n        </div>\n    </div>\n</nav>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-xs-12 col-sm-4 col-md-4 col-lg-4\">\n            <div class=\"list-group\">\n                <a href=\"#\" class=\"list-group-item active\">\n                    <h4 class=\"list-group-item-heading\">John Doe</h4>\n                    <p class=\"list-group-item-text\">Sample last message...</p>\n                </a>\n            </div>\n        </div>\n        <div class=\"col-xs-12 col-sm-8 col-md-8 col-lg-8\">\n            <div class=\"chat\"></div>\n            <div class=\"input-group send-group\">\n                <input id=\"sendInput\" class=\"form-control\"\n                       placeholder=\"Type your message here...\">\n                <span class=\"input-group-btn\">\n                    <button id=\"sendBtn\" class=\"btn btn-default\" type=\"button\">\n                        <i class=\"fa fa-paper-plane-o\" aria-hidden=\"true\"></i>\n                    </button>\n                </span>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div id=\"shareModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n                        aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Share Offer</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div id=\"share-info\"></div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div id=\"loadModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n                        aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Load Answer</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div id=\"load-info\">\n                    <h1>Paste here token from other side</h1>\n                </div>\n\n                <textarea id=\"loadInput\" class=\"form-control\" placeholder=\"Paste here...\"></textarea>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                <button id=\"loadBtn\" type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Load</button>\n            </div>\n        </div>\n    </div>\n</div>\n</body>\n</html>\n"

/***/ },

/***/ 81:
/***/ function(module, exports) {

	module.exports = "<h1>Share this link with the other side</h1>\n<a href=\"{{data}}\">{{data}}</a>"

/***/ },

/***/ 82:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * This file is part of the webrtc-chat package.
	 *
	 * (c) Rafał Lorenz <vardius@gmail.com>
	 *
	 * For the full copyright and license information, please view the LICENSE
	 * file that was distributed with this source code.
	 */
	
	var EventsLoader = exports.EventsLoader = function () {
	    function EventsLoader() {
	        _classCallCheck(this, EventsLoader);
	    }
	
	    _createClass(EventsLoader, null, [{
	        key: "load",
	        value: function load(data, callback) {
	            var events = JSON.parse(decodeURIComponent(data));
	            for (var i = 0; i < events.length; i++) {
	                callback(events[i]);
	            }
	        }
	    }]);

	    return EventsLoader;
	}();

/***/ },

/***/ 83:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.js.map