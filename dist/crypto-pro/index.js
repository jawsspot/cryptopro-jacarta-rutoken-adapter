"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cadesplugin_api = require("./cadesplugin_api.js");

Object.keys(_cadesplugin_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cadesplugin_api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cadesplugin_api[key];
    }
  });
});

var _cryptoProDriver = require("./cryptoProDriver.js");

Object.keys(_cryptoProDriver).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cryptoProDriver[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cryptoProDriver[key];
    }
  });
});