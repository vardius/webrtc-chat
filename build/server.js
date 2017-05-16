/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_os__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_socket_io__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_socket_io__);







const port = process.env.PORT || 3000;
const index = __WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'index.html');
const SocketEventType = {
  CONNECT: 'CONNECT',
  DISCONNECT: 'DISCONNECT',
  CANDIDATE: 'CANDIDATE',
  OFFER: 'OFFER',
  ANSWER: 'ANSWER'
};

const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});
app.use('/css', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'css')));
app.use('/fonts', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'fonts')));
app.use('/images', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'images')));
app.use('/js', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'js')));
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.get('*', (req, res) => {
  res.sendFile(index);
});

const server = __WEBPACK_IMPORTED_MODULE_3_http___default.a.createServer(app);
const io = __WEBPACK_IMPORTED_MODULE_5_socket_io___default.a.listen(server);
io.on('connection', function (socket) {
  function log() {
    socket.emit('log', ...arguments);
  }

  function onConnect(id) {
    // eslint-disable-next-line no-console
    console.log(`Client ${socket.id} connected to room: ${id}`);
    socket.join(id);
  }

  function onDisconnect(id) {
    // eslint-disable-next-line no-console
    console.log(`Client ${socket.id} disconnected from room: ${id}`);
    socket.leave(id);
  }

  socket.on('message', function (event) {
    event.caller = {
      id: socket.id
    };

    log('SERVER_LOG', event);

    switch (event.type) {
      case SocketEventType.CONNECT:
        onConnect(event.room.id);
        socket.broadcast.to(event.room.id).emit('message', event);
        break;
      case SocketEventType.DISCONNECT:
        onDisconnect(event.room.id);
        socket.broadcast.to(event.room.id).emit('message', event);
        break;
      case SocketEventType.OFFER:
      case SocketEventType.ANSWER:
      case SocketEventType.CANDIDATE:
        socket.broadcast.to(event.callee.id).emit('message', event);
        break;
      default:
        socket.broadcast.to(event.room.id).emit('message', event);
    }
  });

  socket.on('ipaddr', function () {
    var ifaces = __WEBPACK_IMPORTED_MODULE_4_os___default.a.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function (details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${port}`);
});

/***/ })
/******/ ]);