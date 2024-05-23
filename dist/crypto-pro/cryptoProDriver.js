"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CryptoProDriver = void 0;

var _utfEncode = require("./utils/utf-encode.js");

var _deepEqual = require("./utils/deep-equal.js");

var _encode = require("./utils/encode.js");

var _prepareB = require("./utils/prepare-b64.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var global_selectbox_container_thumbprint = new Array();

var _plugin = /*#__PURE__*/new WeakMap();

var _isAsync = /*#__PURE__*/new WeakMap();

var _currentPluginVersion = /*#__PURE__*/new WeakMap();

var _scpName = /*#__PURE__*/new WeakMap();

var _isPluginEnabled = /*#__PURE__*/new WeakMap();

var _deviceMap = /*#__PURE__*/new WeakMap();

var _certList = /*#__PURE__*/new WeakMap();

var _stringVersionCompare = /*#__PURE__*/new WeakSet();

var _makeVersionString = /*#__PURE__*/new WeakSet();

var _versionCompare_NPAPI = /*#__PURE__*/new WeakSet();

var _getLatestVersion_NPAPI = /*#__PURE__*/new WeakSet();

var _checkForPlugIn_NPAPI = /*#__PURE__*/new WeakSet();

var _getXmlHttp = /*#__PURE__*/new WeakSet();

var _checkForPlugIn_Async = /*#__PURE__*/new WeakSet();

var _versionCompare_Async = /*#__PURE__*/new WeakSet();

var _getLatestVersion_Async = /*#__PURE__*/new WeakSet();

var _initialize = /*#__PURE__*/new WeakSet();

var _getAllDevices = /*#__PURE__*/new WeakSet();

var _getAllDevicesAsync = /*#__PURE__*/new WeakSet();

var _signCMSAsync = /*#__PURE__*/new WeakSet();

var _signCMSNPAPI = /*#__PURE__*/new WeakSet();

var _getAllDevicesNPAPI = /*#__PURE__*/new WeakSet();

var _bytesToBase = /*#__PURE__*/new WeakSet();

var _handleError = /*#__PURE__*/new WeakSet();

var _getCSPVersion_NPAPI = /*#__PURE__*/new WeakSet();

var _getCSPName_NPAPI = /*#__PURE__*/new WeakSet();

var CryptoProDriver = /*#__PURE__*/function () {
  function CryptoProDriver() {
    _classCallCheck(this, CryptoProDriver);

    _classPrivateMethodInitSpec(this, _getCSPName_NPAPI);

    _classPrivateMethodInitSpec(this, _getCSPVersion_NPAPI);

    _classPrivateMethodInitSpec(this, _handleError);

    _classPrivateMethodInitSpec(this, _bytesToBase);

    _classPrivateMethodInitSpec(this, _getAllDevicesNPAPI);

    _classPrivateMethodInitSpec(this, _signCMSNPAPI);

    _classPrivateMethodInitSpec(this, _signCMSAsync);

    _classPrivateMethodInitSpec(this, _getAllDevicesAsync);

    _classPrivateMethodInitSpec(this, _getAllDevices);

    _classPrivateMethodInitSpec(this, _initialize);

    _classPrivateMethodInitSpec(this, _getLatestVersion_Async);

    _classPrivateMethodInitSpec(this, _versionCompare_Async);

    _classPrivateMethodInitSpec(this, _checkForPlugIn_Async);

    _classPrivateMethodInitSpec(this, _getXmlHttp);

    _classPrivateMethodInitSpec(this, _checkForPlugIn_NPAPI);

    _classPrivateMethodInitSpec(this, _getLatestVersion_NPAPI);

    _classPrivateMethodInitSpec(this, _versionCompare_NPAPI);

    _classPrivateMethodInitSpec(this, _makeVersionString);

    _classPrivateMethodInitSpec(this, _stringVersionCompare);

    _defineProperty(this, "isPluginLoaded", false);

    _defineProperty(this, "isPluginWorked", false);

    _defineProperty(this, "isActualVersion", false);

    _defineProperty(this, "parsedCertificates", []);

    _classPrivateFieldInitSpec(this, _plugin, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _isAsync, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _currentPluginVersion, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _scpName, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _isPluginEnabled, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _deviceMap, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _certList, {
      writable: true,
      value: []
    });

    _classPrivateFieldSet(this, _plugin, cadesplugin);
  }

  _createClass(CryptoProDriver, [{
    key: "reloadDevices",
    value: function () {
      var _reloadDevices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _classPrivateFieldSet(this, _certList, []);

                _classPrivateFieldGet(this, _deviceMap).clear;
                this.parsedCertificates = [];
                _context.next = 5;
                return _classPrivateMethodGet(this, _initialize, _initialize2).call(this);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function reloadDevices() {
        return _reloadDevices.apply(this, arguments);
      }

      return reloadDevices;
    }()
  }, {
    key: "isActualVersionPlugin",
    value: function () {
      var _isActualVersionPlugin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this, currentPluginVersion, actualVersion;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.time('isActualVersionPlugin');
                _this = this;
                currentPluginVersion = '';
                _context3.next = 5;
                return new Promise(function (resolve, reject) {
                  var xmlhttp = _classPrivateMethodGet(_this, _getXmlHttp, _getXmlHttp2).call(_this);

                  xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
                  xmlhttp.timeout = 1000;
                  xmlhttp.onreadystatechange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (xmlhttp.readyState === 4) {
                              if (xmlhttp.status === 200) {
                                actualVersion = xmlhttp.responseText;
                                resolve();
                              }

                              reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 5, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430", 'isActualVersionPlugin'));
                            }

                          case 1:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  xmlhttp.send(null);
                });

              case 5:
                _context3.next = 7;
                return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CAdESCOM.About")["catch"](function () {
                  throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 5, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0442\u0435\u043A\u0443\u0449\u0435\u043C \u043F\u043B\u0430\u0433\u0438\u043D\u0435", 'isActualVersionPlugin');
                }).then(function (value) {
                  return value.Version;
                }).then(function (version) {
                  return currentPluginVersion = version;
                });

              case 7:
                this.isActualVersion = _classPrivateMethodGet(_this, _stringVersionCompare, _stringVersionCompare2).call(_this, actualVersion, currentPluginVersion);
                console.timeEnd('isActualVersionPlugin');
                return _context3.abrupt("return", {
                  cryptoDriverType: 1,
                  isActualVersion: this.isActualVersion,
                  currentVersion: currentPluginVersion,
                  actualVersion: actualVersion.replace('\n', '')
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isActualVersionPlugin() {
        return _isActualVersionPlugin.apply(this, arguments);
      }

      return isActualVersionPlugin;
    }()
  }, {
    key: "loadPlugin",
    value: function () {
      var _loadPlugin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var canAsync;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.isPluginLoaded) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.prev = 2;

                _classPrivateFieldGet(this, _plugin).set_log_level(_classPrivateFieldGet(this, _plugin).LOG_LEVEL_ERROR);

                canAsync = !!_classPrivateFieldGet(this, _plugin).CreateObjectAsync;
                console.log("canAsync: ".concat(canAsync));

                if (!canAsync) {
                  _context4.next = 12;
                  break;
                }

                _classPrivateFieldSet(this, _isAsync, true);

                _context4.next = 10;
                return _classPrivateMethodGet(this, _checkForPlugIn_Async, _checkForPlugIn_Async2).call(this);

              case 10:
                _context4.next = 13;
                break;

              case 12:
                _classPrivateMethodGet(this, _checkForPlugIn_NPAPI, _checkForPlugIn_NPAPI2).call(this);

              case 13:
                _context4.next = 15;
                return _classPrivateMethodGet(this, _initialize, _initialize2).call(this);

              case 15:
                _context4.next = 22;
                break;

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](2);

                if (!_context4.t0.method) {
                  _context4.next = 21;
                  break;
                }

                throw _context4.t0;

              case 21:
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 6, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u0430", 'loadPlugin');

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 17]]);
      }));

      function loadPlugin() {
        return _loadPlugin.apply(this, arguments);
      }

      return loadPlugin;
    }()
  }, {
    key: "signCMS",
    value: function () {
      var _signCMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data, certificateId, deviceId) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                if (!_classPrivateFieldGet(this, _isAsync)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return _classPrivateMethodGet(this, _signCMSAsync, _signCMSAsync2).call(this, data, certificateId, deviceId);

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 7:
                return _context5.abrupt("return", _classPrivateMethodGet(this, _signCMSNPAPI, _signCMSNPAPI2).call(this, data, certificateId, deviceId));

              case 8:
                _context5.next = 15;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);

                if (!_context5.t0.method) {
                  _context5.next = 14;
                  break;
                }

                throw _context5.t0;

              case 14:
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 2, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438", 'loadPlugin');

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 10]]);
      }));

      function signCMS(_x, _x2, _x3) {
        return _signCMS.apply(this, arguments);
      }

      return signCMS;
    }()
  }]);

  return CryptoProDriver;
}();

exports.CryptoProDriver = CryptoProDriver;

function _stringVersionCompare2(actualVersion, currentPluginVersion) {
  var actual = actualVersion.split('.');
  var current = currentPluginVersion.split('.');

  if (parseInt(current[0]) === parseInt(actual[0])) {
    if (parseInt(current[1]) === parseInt(actual[1])) {
      if (parseInt(current[2]) === parseInt(actual[2])) {
        return true;
      } else if (parseInt(current[2]) < parseInt(actual[2])) {
        return false;
      }
    } else if (parseInt(current[1]) < parseInt(actual[1])) {
      return false;
    }
  } else if (parseInt(current[0]) < parseInt(actual[0])) {
    return false;
  }

  return true;
}

function _makeVersionString2(oVer) {
  var strVer;
  if (typeof oVer == "string") return oVer;else return oVer.MajorVersion + "." + oVer.MinorVersion + "." + oVer.BuildVersion;
}

function _versionCompare_NPAPI2(StringVersion, ObjectVersion) {
  if (typeof ObjectVersion == "string") return -1;
  var arr = StringVersion.split('.');

  if (ObjectVersion.MajorVersion == parseInt(arr[0])) {
    if (ObjectVersion.MinorVersion == parseInt(arr[1])) {
      if (ObjectVersion.BuildVersion == parseInt(arr[2])) {
        return 0;
      } else if (ObjectVersion.BuildVersion < parseInt(arr[2])) {
        return -1;
      }
    } else if (ObjectVersion.MinorVersion < parseInt(arr[1])) {
      return -1;
    }
  } else if (ObjectVersion.MajorVersion < parseInt(arr[0])) {
    return -1;
  }

  return 1;
}

function _getLatestVersion_NPAPI2(currentPluginVersion) {
  var _this = this;

  var xmlhttp = _classPrivateMethodGet(this, _getXmlHttp, _getXmlHttp2).call(this);

  try {
    xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
    xmlhttp.timeout = 1000;

    xmlhttp.onreadystatechange = function () {
      var pluginBaseVersion;

      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          pluginBaseVersion = xmlhttp.responseText;

          if (_this.isPluginWorked) {
            // плагин работает, объекты создаются
            if (_classPrivateMethodGet(_this, _versionCompare_NPAPI, _versionCompare_NPAPI2).call(_this, pluginBaseVersion, currentPluginVersion) < 0) {
              _this.isActualVersion = false;
              console.log("Actual version of plugin is: " + pluginBaseVersion);
            }
          } else {
            // плагин не работает, объекты не создаются
            if (_this.isPluginLoaded) {
              // плагин загружен
              if (!_classPrivateFieldGet(_this, _isPluginEnabled)) {
                // плагин загружен, но отключен
                console.log("Plugin is not enabled in web browser");
              } else {
                // плагин загружен и включен, но объекты не создаются
                console.log("Check browser settings for plugin correct work");
              }
            } else {
              // плагин не загружен
              _this.isPluginLoaded = false;
            }
          }
        }
      }
    };
  } catch (err) {
    _this.isActualVersion = true;
    console.log("Couldn't check plugin version");
  }

  xmlhttp.send();
}

function _checkForPlugIn_NPAPI2() {
  var currentPluginVersion;

  try {
    var _oAbout = _classPrivateFieldGet(this, _plugin).CreateObject("CAdESCOM.About");

    this.isPluginLoaded = true;

    _classPrivateFieldSet(this, _isPluginEnabled, true);

    this.isPluginWorked = true; // Это значение будет проверяться сервером при загрузке демо-страницы

    currentPluginVersion = _oAbout.PluginVersion;
    if (typeof currentPluginVersion == "undefined") currentPluginVersion = _oAbout.Version;

    _classPrivateFieldSet(this, _currentPluginVersion, _classPrivateMethodGet(this, _makeVersionString, _makeVersionString2).call(this, currentPluginVersion));

    ShowCSPVersion_NPAPI(CurrentPluginVersion);
  } catch (err) {
    // Объект создать не удалось, проверим, установлен ли
    // вообще плагин. Такая возможность есть не во всех браузерах
    var mimetype = navigator.mimeTypes["application/x-cades"];

    if (mimetype) {
      this.isPluginLoaded = true;
      var plugin = mimetype.enabledPlugin;

      if (plugin) {
        this.isPluginEnabled = true;
      }
    }
  }

  _classPrivateMethodGet(this, _getLatestVersion_NPAPI, _getLatestVersion_NPAPI2).call(this, currentPluginVersion);
}

function _getXmlHttp2() {
  var xmlhttp;

  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }

  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    xmlhttp = new XMLHttpRequest();
  }

  return xmlhttp;
}

function _checkForPlugIn_Async2() {
  return _checkForPlugIn_Async3.apply(this, arguments);
}

function _checkForPlugIn_Async3() {
  _checkForPlugIn_Async3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var _this, currentPluginVersion;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _this = this;
            _context7.next = 3;
            return _classPrivateFieldGet(this, _plugin);

          case 3:
            return _context7.abrupt("return", new Promise(function (resolve, reject) {
              _classPrivateFieldGet(_this, _plugin).async_spawn( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(args) {
                var _oAbout4;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CAdESCOM.About");

                      case 3:
                        _oAbout4 = _context6.sent;
                        _context6.next = 6;
                        return _oAbout4.PluginVersion;

                      case 6:
                        currentPluginVersion = _context6.sent;

                        _classPrivateMethodGet(_this, _getLatestVersion_Async, _getLatestVersion_Async2).call(_this, currentPluginVersion).then(function () {
                          _classPrivateFieldSet(_this, _isPluginEnabled, true);

                          _this.isPluginLoaded = true;
                          _this.isPluginWorked = true;
                          return args[0]();
                        });

                        _context6.next = 17;
                        break;

                      case 10:
                        _context6.prev = 10;
                        _context6.t0 = _context6["catch"](0);
                        console.log(_context6.t0);

                        _classPrivateFieldSet(_this, _isPluginEnabled, false);

                        _this.isPluginLoaded = false;
                        _this.isPluginWorked = false;
                        return _context6.abrupt("return", args[1]());

                      case 17:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, null, [[0, 10]]);
              }), resolve, reject);
            }));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _checkForPlugIn_Async3.apply(this, arguments);
}

function _versionCompare_Async2(_x4, _x5) {
  return _versionCompare_Async3.apply(this, arguments);
}

function _versionCompare_Async3() {
  _versionCompare_Async3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(StringVersion, ObjectVersion) {
    var _this, arr, isActualVersion;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _this = this;

            if (!(typeof ObjectVersion == "string")) {
              _context9.next = 3;
              break;
            }

            return _context9.abrupt("return", -1);

          case 3:
            arr = StringVersion.split('.');
            isActualVersion = true;
            return _context9.abrupt("return", new Promise(function (resolve, reject) {
              _classPrivateFieldGet(_this, _plugin).async_spawn( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(args) {
                var oAbout, ver, ret;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return ObjectVersion.MajorVersion;

                      case 2:
                        _context8.t0 = _context8.sent;
                        _context8.t1 = parseInt(arr[0]);

                        if (!(_context8.t0 == _context8.t1)) {
                          _context8.next = 37;
                          break;
                        }

                        _context8.next = 7;
                        return ObjectVersion.MinorVersion;

                      case 7:
                        _context8.t2 = _context8.sent;
                        _context8.t3 = parseInt(arr[1]);

                        if (!(_context8.t2 == _context8.t3)) {
                          _context8.next = 28;
                          break;
                        }

                        _context8.next = 12;
                        return ObjectVersion.BuildVersion;

                      case 12:
                        _context8.t4 = _context8.sent;
                        _context8.t5 = parseInt(arr[2]);

                        if (!(_context8.t4 == _context8.t5)) {
                          _context8.next = 19;
                          break;
                        }

                        isActualVersion = true;
                        _this.isActualVersion = true;
                        _context8.next = 26;
                        break;

                      case 19:
                        _context8.next = 21;
                        return ObjectVersion.BuildVersion;

                      case 21:
                        _context8.t6 = _context8.sent;
                        _context8.t7 = parseInt(arr[2]);

                        if (!(_context8.t6 < _context8.t7)) {
                          _context8.next = 26;
                          break;
                        }

                        _this.isActualVersion = false;
                        isActualVersion = false;

                      case 26:
                        _context8.next = 35;
                        break;

                      case 28:
                        _context8.next = 30;
                        return ObjectVersion.MinorVersion;

                      case 30:
                        _context8.t8 = _context8.sent;
                        _context8.t9 = parseInt(arr[1]);

                        if (!(_context8.t8 < _context8.t9)) {
                          _context8.next = 35;
                          break;
                        }

                        _this.isActualVersion = false;
                        isActualVersion = false;

                      case 35:
                        _context8.next = 44;
                        break;

                      case 37:
                        _context8.next = 39;
                        return ObjectVersion.MajorVersion;

                      case 39:
                        _context8.t10 = _context8.sent;
                        _context8.t11 = parseInt(arr[0]);

                        if (!(_context8.t10 < _context8.t11)) {
                          _context8.next = 44;
                          break;
                        }

                        _this.isActualVersion = false;
                        isActualVersion = false;

                      case 44:
                        _context8.next = 46;
                        return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CAdESCOM.About");

                      case 46:
                        oAbout = _context8.sent;
                        _context8.next = 49;
                        return oAbout.CSPVersion("", 80);

                      case 49:
                        ver = _context8.sent;
                        _context8.next = 52;
                        return ver.MajorVersion;

                      case 52:
                        _context8.t12 = _context8.sent;
                        _context8.t13 = _context8.t12 + ".";
                        _context8.next = 56;
                        return ver.MinorVersion;

                      case 56:
                        _context8.t14 = _context8.sent;
                        _context8.t15 = _context8.t13 + _context8.t14;
                        _context8.t16 = _context8.t15 + ".";
                        _context8.next = 61;
                        return ver.BuildVersion;

                      case 61:
                        _context8.t17 = _context8.sent;
                        ret = _context8.t16 + _context8.t17;

                        _classPrivateFieldSet(_this, _currentPluginVersion, ret);

                        _context8.prev = 64;
                        _context8.t18 = _classPrivateFieldSet;
                        _context8.t19 = _this;
                        _context8.t20 = _scpName;
                        _context8.next = 70;
                        return oAbout.CSPName(80);

                      case 70:
                        _context8.t21 = _context8.sent;
                        (0, _context8.t18)(_context8.t19, _context8.t20, _context8.t21);
                        _context8.next = 77;
                        break;

                      case 74:
                        _context8.prev = 74;
                        _context8.t22 = _context8["catch"](64);
                        console.log(_context8.t22);

                      case 77:
                        return _context8.abrupt("return", args[0]());

                      case 78:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, null, [[64, 74]]);
              }), resolve, reject);
            }));

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _versionCompare_Async3.apply(this, arguments);
}

function _getLatestVersion_Async2(_x6) {
  return _getLatestVersion_Async3.apply(this, arguments);
}

function _getLatestVersion_Async3() {
  _getLatestVersion_Async3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(currentPluginVersion) {
    var _this;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _this = this;
            return _context11.abrupt("return", new Promise(function (resolve, reject) {
              var xmlhttp = _classPrivateMethodGet(_this, _getXmlHttp, _getXmlHttp2).call(_this);

              xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
              xmlhttp.timeout = 1000;
              xmlhttp.onreadystatechange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var pluginBaseVersion;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        if (!(xmlhttp.readyState == 4)) {
                          _context10.next = 9;
                          break;
                        }

                        if (!(xmlhttp.status == 200)) {
                          _context10.next = 8;
                          break;
                        }

                        pluginBaseVersion = xmlhttp.responseText;
                        _context10.next = 5;
                        return _classPrivateMethodGet(_this, _versionCompare_Async, _versionCompare_Async2).call(_this, pluginBaseVersion, currentPluginVersion);

                      case 5:
                        resolve();
                        _context10.next = 9;
                        break;

                      case 8:
                        reject();

                      case 9:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));
              xmlhttp.send(null);
            })["catch"](function (err) {
              _this.isActualVersion = true;
              console.log("Couldn't check plugin version");
            }));

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));
  return _getLatestVersion_Async3.apply(this, arguments);
}

function _initialize2() {
  return _initialize3.apply(this, arguments);
}

function _initialize3() {
  _initialize3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _classPrivateMethodGet(this, _getAllDevices, _getAllDevices2).call(this);

          case 2:
            console.timeEnd('getAllDevices');

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));
  return _initialize3.apply(this, arguments);
}

function _getAllDevices2() {
  return _getAllDevices3.apply(this, arguments);
}

function _getAllDevices3() {
  _getAllDevices3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            console.time('getAllDevices');
            _context13.next = 3;
            return _classPrivateMethodGet(this, _getAllDevicesAsync, _getAllDevicesAsync2).call(this);

          case 3:
            return _context13.abrupt("return", _context13.sent);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));
  return _getAllDevices3.apply(this, arguments);
}

function _getAllDevicesAsync2() {
  return _getAllDevicesAsync3.apply(this, arguments);
}

function _getAllDevicesAsync3() {
  _getAllDevicesAsync3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var _this, now;

    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _this = this;
            now = new Date();
            return _context15.abrupt("return", new Promise(function (resolve, reject) {
              _classPrivateFieldGet(_this, _plugin).async_spawn( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                var MyStoreExists, oStore, certs, certCnt, i, cert, certThumbprint, foundIndex, validToDate, validFromDate, certInBase64, c, isFoundParsed, k, parsedTemp;
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        MyStoreExists = true;
                        _context14.prev = 1;
                        _context14.next = 4;
                        return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CAdESCOM.Store");

                      case 4:
                        oStore = _context14.sent;

                        if (oStore) {
                          _context14.next = 8;
                          break;
                        }

                        alert("Create store failed");
                        return _context14.abrupt("return");

                      case 8:
                        _context14.next = 10;
                        return oStore.Open();

                      case 10:
                        _context14.next = 15;
                        break;

                      case 12:
                        _context14.prev = 12;
                        _context14.t0 = _context14["catch"](1);
                        MyStoreExists = false;

                      case 15:
                        if (!MyStoreExists) {
                          _context14.next = 107;
                          break;
                        }

                        _context14.prev = 16;
                        _context14.next = 19;
                        return oStore.Certificates;

                      case 19:
                        certs = _context14.sent;
                        _context14.next = 22;
                        return certs.Count;

                      case 22:
                        certCnt = _context14.sent;
                        _context14.next = 29;
                        break;

                      case 25:
                        _context14.prev = 25;
                        _context14.t1 = _context14["catch"](16);
                        alert("Ошибка при получении Certificates или Count: " + _classPrivateFieldGet(_this, _plugin).getLastError(_context14.t1));
                        reject(_context14.t1);

                      case 29:
                        console.time('mapingFullList');
                        i = 1;

                      case 31:
                        if (!(i <= certCnt)) {
                          _context14.next = 103;
                          break;
                        }

                        _context14.prev = 32;
                        console.time('item');
                        _context14.next = 36;
                        return certs.Item(i);

                      case 36:
                        cert = _context14.sent;
                        console.time('item');
                        _context14.next = 44;
                        break;

                      case 40:
                        _context14.prev = 40;
                        _context14.t2 = _context14["catch"](32);
                        alert("Ошибка при перечислении сертификатов: " + _classPrivateFieldGet(_this, _plugin).getLastError(_context14.t2));
                        reject(_context14.t2);

                      case 44:
                        _context14.prev = 44;
                        _context14.next = 47;
                        return cert.Thumbprint;

                      case 47:
                        certThumbprint = _context14.sent;
                        foundIndex = global_selectbox_container_thumbprint.indexOf(certThumbprint);

                        if (!(foundIndex > -1)) {
                          _context14.next = 51;
                          break;
                        }

                        return _context14.abrupt("continue", 100);

                      case 51:
                        global_selectbox_container_thumbprint.push(certThumbprint);
                        _context14.t3 = Date;
                        _context14.next = 55;
                        return cert.ValidToDate;

                      case 55:
                        _context14.t4 = _context14.sent;
                        validToDate = new _context14.t3(_context14.t4);
                        _context14.t5 = Date;
                        _context14.next = 60;
                        return cert.ValidFromDate;

                      case 60:
                        _context14.t6 = _context14.sent;
                        validFromDate = new _context14.t5(_context14.t6);
                        _context14.next = 64;
                        return cert.Export(_classPrivateFieldGet(_this, _plugin).CADESCOM_ENCODE_BASE64);

                      case 64:
                        certInBase64 = _context14.sent;
                        console.time('setCertificate' + i);
                        _context14.next = 68;
                        return cert.ValidToDate;

                      case 68:
                        _context14.t7 = _context14.sent;
                        _context14.next = 71;
                        return cert.ValidFromDate;

                      case 71:
                        _context14.t8 = _context14.sent;
                        _context14.next = 74;
                        return cert.SubjectName;

                      case 74:
                        _context14.t9 = _context14.sent;
                        _context14.next = 77;
                        return cert.IssuerName;

                      case 77:
                        _context14.t10 = _context14.sent;
                        _context14.next = 80;
                        return cert.Thumbprint;

                      case 80:
                        _context14.t11 = _context14.sent;
                        _context14.t12 = i;
                        _context14.t13 = now < validToDate && now >= validFromDate;
                        _context14.next = 85;
                        return cert.SerialNumber;

                      case 85:
                        _context14.t14 = _context14.sent;
                        _context14.next = 88;
                        return cert.HasPrivateKey();

                      case 88:
                        _context14.t15 = _context14.sent;
                        _context14.t16 = (0, _prepareB.getCertificateInPem)(certInBase64);
                        c = {
                          ValidToDate: _context14.t7,
                          ValidFromDate: _context14.t8,
                          SubjectName: _context14.t9,
                          IssuerName: _context14.t10,
                          Thumbprint: _context14.t11,
                          id: _context14.t12,
                          IsValid: _context14.t13,
                          serial: _context14.t14,
                          HasPrivateKey: _context14.t15,
                          b64: _context14.t16,
                          deviceId: 0
                        };
                        console.timeEnd('setCertificate' + i);
                        isFoundParsed = false;

                        for (k = 0; k < _this.parsedCertificates.length; k++) {
                          parsedTemp = _this.parsedCertificates[k];
                          if ((0, _deepEqual.deepEqual)(parsedTemp, c)) isFoundParsed = true;
                        }

                        if (!isFoundParsed) _this.parsedCertificates.push(c);
                        _context14.next = 100;
                        break;

                      case 97:
                        _context14.prev = 97;
                        _context14.t17 = _context14["catch"](44);

                        /*me.lastError = "Ошибка при получении свойства SubjectName: " + this.#plugin.getError(e)
                         me.certificateListReady = true*/
                        reject(_context14.t17);

                      case 100:
                        i++;
                        _context14.next = 31;
                        break;

                      case 103:
                        console.timeEnd('mapingFullList');
                        _context14.next = 106;
                        return oStore.Close();

                      case 106:
                        resolve();

                      case 107:
                      case "end":
                        return _context14.stop();
                    }
                  }
                }, _callee14, null, [[1, 12], [16, 25], [32, 40], [44, 97]]);
              }));
            }));

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));
  return _getAllDevicesAsync3.apply(this, arguments);
}

function _signCMSAsync2(_x7, _x8, _x9) {
  return _signCMSAsync3.apply(this, arguments);
}

function _signCMSAsync3() {
  _signCMSAsync3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(data, certificateId, deviceId) {
    var _this, certificate, dataToSign;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _this = this;
            certificate = _classPrivateFieldGet(_this, _deviceMap).get(deviceId)[certificateId];
            return _context17.abrupt("return", new Promise(function (resolve, reject) {
              _classPrivateFieldGet(_this, _plugin).async_spawn( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(arg) {
                var Signature, errormes, oSigner, oSigningTimeAttr, oDocumentNameAttr, oSignedData, oTimeNow, attr;
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        if (!(data != undefined && data != null)) {
                          console.log("Data is null or undefined");
                          reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, 'Нечего подписывать', ' #signCMSAsync'));
                        }

                        if (_typeof(data) === 'object') {
                          dataToSign = _classPrivateMethodGet(_this, _bytesToBase, _bytesToBase2).call(_this, data);
                        } else {
                          dataToSign = (0, _encode.encode)(data);
                        }

                        _context16.prev = 2;
                        _context16.prev = 3;
                        _context16.next = 6;
                        return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CAdESCOM.CPSigner");

                      case 6:
                        oSigner = _context16.sent;
                        _context16.next = 14;
                        break;

                      case 9:
                        _context16.prev = 9;
                        _context16.t0 = _context16["catch"](3);
                        console.log("Ошибка при создании объекта CAdESCOM.CPSigner");
                        errormes = "Failed to create CAdESCOM.CPSigner: " + _context16.t0;
                        reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, ' #signCMSAsync'));

                      case 14:
                        _context16.prev = 14;
                        _context16.next = 17;
                        return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CADESCOM.CPAttribute");

                      case 17:
                        oSigningTimeAttr = _context16.sent;
                        _context16.next = 23;
                        break;

                      case 20:
                        _context16.prev = 20;
                        _context16.t1 = _context16["catch"](14);
                        reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, _context16.t1, ' #signCMSAsync'));

                      case 23:
                        _context16.next = 25;
                        return oSigningTimeAttr.propset_Name(_classPrivateFieldGet(_this, _plugin).CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);

                      case 25:
                        oTimeNow = new Date();
                        _context16.next = 28;
                        return oSigningTimeAttr.propset_Value(oTimeNow);

                      case 28:
                        _context16.next = 30;
                        return oSigner.AuthenticatedAttributes2;

                      case 30:
                        attr = _context16.sent;
                        _context16.next = 33;
                        return attr.Add(oSigningTimeAttr);

                      case 33:
                        _context16.prev = 33;
                        _context16.next = 36;
                        return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CADESCOM.CPAttribute");

                      case 36:
                        oDocumentNameAttr = _context16.sent;
                        _context16.next = 42;
                        break;

                      case 39:
                        _context16.prev = 39;
                        _context16.t2 = _context16["catch"](33);
                        reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, _context16.t2, ' #signCMSAsync'));

                      case 42:
                        _context16.next = 44;
                        return oDocumentNameAttr.propset_Name(_classPrivateFieldGet(_this, _plugin).CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME);

                      case 44:
                        _context16.next = 46;
                        return oDocumentNameAttr.propset_Value("Document Name");

                      case 46:
                        _context16.next = 48;
                        return attr.Add(oDocumentNameAttr);

                      case 48:
                        if (!oSigner) {
                          _context16.next = 53;
                          break;
                        }

                        _context16.next = 51;
                        return oSigner.propset_Certificate(certificate);

                      case 51:
                        _context16.next = 55;
                        break;

                      case 53:
                        errormes = "Failed to create CAdESCOM.CPSigner";
                        reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, ' #signCMSAsync'));

                      case 55:
                        _context16.prev = 55;
                        _context16.next = 58;
                        return _classPrivateFieldGet(_this, _plugin).CreateObjectAsync("CAdESCOM.CadesSignedData");

                      case 58:
                        oSignedData = _context16.sent;
                        _context16.next = 64;
                        break;

                      case 61:
                        _context16.prev = 61;
                        _context16.t3 = _context16["catch"](55);
                        reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, _context16.t3, ' #signCMSAsync'));

                      case 64:
                        _context16.next = 66;
                        return oSigner.propset_Options(_classPrivateFieldGet(_this, _plugin).CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);

                      case 66:
                        _context16.next = 68;
                        return oSignedData.propset_ContentEncoding(_classPrivateFieldGet(_this, _plugin).CADESCOM_BASE64_TO_BINARY);

                      case 68:
                        if (!(typeof setDisplayData != 'undefined')) {
                          _context16.next = 71;
                          break;
                        }

                        _context16.next = 71;
                        return oSignedData.propset_DisplayData(1);

                      case 71:
                        _context16.next = 73;
                        return oSignedData.propset_Content(dataToSign);

                      case 73:
                        _context16.prev = 73;
                        _context16.next = 76;
                        return oSignedData.SignCades(oSigner, _classPrivateFieldGet(_this, _plugin).CADESCOM_CADES_BES, true);

                      case 76:
                        Signature = _context16.sent;
                        _context16.next = 84;
                        break;

                      case 79:
                        _context16.prev = 79;
                        _context16.t4 = _context16["catch"](73);
                        console.log('Ошибка при вызове метода oSignedData.SignCades, объект CAdESCOM.CadesSignedData');
                        errormes = "Ошибка при вызове метода oSignedData.SignCades, объект CAdESCOM.CadesSignedData \n Не удалось создать подпись из-за ошибки: " + JSON.stringify(_context16.t4);
                        reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, ' #signCMSAsync'));

                      case 84:
                        console.log("Подпись сформирована успешно:");
                        console.log(Signature);
                        return _context16.abrupt("return", arg[0](Signature));

                      case 89:
                        _context16.prev = 89;
                        _context16.t5 = _context16["catch"](2);
                        console.error(_context16.t5);
                        reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, _context16.t5, ' #signCMSAsync'));

                      case 93:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, _callee16, null, [[2, 89], [3, 9], [14, 20], [33, 39], [55, 61], [73, 79]]);
              }), resolve, reject);
            }));

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));
  return _signCMSAsync3.apply(this, arguments);
}

function _signCMSNPAPI2(data, certificateId, deviceId) {
  var setDisplayData = true;

  var _this = this;

  var certificate = _classPrivateFieldGet(_this, _deviceMap).get(deviceId)[certificateId];

  if (!(0, _deepEqual.isObject)(data)) {
    alert("Data is null or undefined");
    return;
  }

  var dataToSign = (0, _encode.encode)(data);
  var Signature;

  try {
    var errormes;
    var oSigner;
    var oSigningTimeAttr;
    var oDocumentNameAttr;
    var oSignedData;

    try {
      oSigner = _classPrivateFieldGet(_this, _plugin).CreateObject("CAdESCOM.CPSigner");
    } catch (err) {
      errormes = "Failed to create CAdESCOM.CPSigner: " + err.number;
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, 'signCMSNPAPI');
    }

    try {
      oSigningTimeAttr = _classPrivateFieldGet(_this, _plugin).CreateObject("CADESCOM.CPAttribute");
    } catch (err) {
      errormes = "Failed to create CADESCOM.CPAttribute: " + JSON.stringify(err);
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, 'signCMSNPAPI');
    }

    oSigningTimeAttr.propset_Name(_classPrivateFieldGet(_this, _plugin).CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
    var oTimeNow = new Date();
    oSigningTimeAttr.propset_Value(oTimeNow);
    var attr = oSigner.AuthenticatedAttributes2;
    attr.Add(oSigningTimeAttr);

    try {
      oDocumentNameAttr = _classPrivateFieldGet(_this, _plugin).CreateObject("CADESCOM.CPAttribute");
    } catch (err) {
      errormes = "Failed to create CADESCOM.CPAttribute: " + JSON.stringify(err);
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, 'signCMSNPAPI');
    }

    oDocumentNameAttr.propset_Name(_classPrivateFieldGet(_this, _plugin).CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME);
    oDocumentNameAttr.propset_Value("Document Name");
    attr.Add(oDocumentNameAttr);

    if (oSigner) {
      oSigner.propset_Certificate(certificate);
    } else {
      errormes = "Failed to create CAdESCOM.CPSigner";
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, 'signCMSNPAPI');
    }

    try {
      oSignedData = _classPrivateFieldGet(_this, _plugin).CreateObject("CAdESCOM.CadesSignedData");
    } catch (err) {
      errormes = "Failed to create CAdESCOM.CadesSignedData: " + JSON.stringify(err);
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, 'signCMSNPAPI');
    }

    if (dataToSign) {
      // Отключаем проверку цепочки сертификатов пользователя
      // yield oSigner.propset_Options(this.#plugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN)
      oSigner.propset_Options(_classPrivateFieldGet(_this, _plugin).CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);
      oSignedData.propset_ContentEncoding(_classPrivateFieldGet(_this, _plugin).CADESCOM_BASE64_TO_BINARY); //

      if (typeof setDisplayData != 'undefined') {
        //Set display data flag flag for devices like Rutoken PinPad
        oSignedData.propset_DisplayData(1);
      }

      oSignedData.propset_Content(dataToSign);

      try {
        Signature = oSignedData.SignCades(oSigner, _classPrivateFieldGet(_this, _plugin).CADESCOM_CADES_BES);
      } catch (err) {
        errormes = "Не удалось создать подпись из-за ошибки: " + JSON.stringify(err);
        throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, errormes, 'signCMSNPAPI');
      }
    }

    console.log("Подпись сформирована успешно:");
    console.log(Signature);
    return Signature;
  } catch (err) {
    if (err.method) throw err;
    console.error(err);
    throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 2, err, 'signCMSNPAPI');
  }
}

function _getAllDevicesNPAPI2() {
  var _this = this;

  var MyStoreExists = true;
  var oStore;
  var certCnt;
  var certs;
  var isFound;

  try {
    oStore = _classPrivateFieldGet(_this, _plugin).CreateObject("CAdESCOM.Store");

    if (!oStore) {
      console.log("Create store failed");
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 3, 'Create store failed', 'getAllDevicesNPAPI');
    }

    oStore.Open();
  } catch (ex) {
    MyStoreExists = false;
    console.log("Ошибка при открытии хранилища: " + _classPrivateFieldGet(_this, _plugin).getLastError(ex));
    throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 3, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430: ".concat(_classPrivateFieldGet(_this, _plugin).getLastError(ex)), 'getAllDevicesNPAPI');
  }

  if (MyStoreExists) {
    try {
      certs = oStore.Certificates;
      certCnt = certs.Count;
    } catch (ex) {
      console.log("Ошибка при получении Certificates или Count: " + _classPrivateFieldGet(_this, _plugin).getLastError(ex));
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 3, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 Certificates \u0438\u043B\u0438 Count: ".concat(_classPrivateFieldGet(_this, _plugin).getLastError(ex)), 'getAllDevicesNPAPI');
    }

    isFound = false;

    for (var i = 1; i <= certCnt; i++) {
      var cert = void 0;

      try {
        cert = certs.Item(i);

        for (var j = 0; j < _this.parsedCertificates.length; j++) {
          var certListTemp = _this.parsedCertificates[j].Thumbprint;
          var certTemp = cert.Thumbprint;

          if ((0, _deepEqual.deepEqual)(certListTemp, certTemp)) {
            isFound = true;
            break;
          }
        }

        if (isFound) continue;
        var pubKey = cert.PublicKey(),
            algo = pubKey.Algorithm,
            algoOid = algo.Value;
        var now = new Date();
        var withInvalid = true;

        try {
          var validToDate = new Date(cert.ValidToDate),
              validFromDate = new Date(cert.ValidFromDate),
              validator = cert.IsValid(),
              isValid = validator.Result;

          if ((withInvalid || now < validToDate && now >= validFromDate && cert.HasPrivateKey() && isValid) && (algoOid == '1.2.643.7.1.1.1.1' || algoOid == '1.2.643.7.1.1.1.2' || algoOid == '1.2.643.2.2.19')) {
            var c = {
              ValidToDate: cert.ValidToDate,
              ValidFromDate: cert.ValidFromDate,
              SubjectName: cert.SubjectName,
              IssuerName: cert.IssuerName,
              Thumbprint: cert.Thumbprint,
              id: i,
              IsValid: now < validToDate && now >= validFromDate,
              HasPrivateKey: cert.HasPrivateKey(),
              serial: cert.SerialNumber,
              b64: cert.Export(_classPrivateFieldGet(_this, _plugin).CADESCOM_ENCODE_BASE64),
              algorythmOid: algoOid,
              deviceId: 0
            };
            var isFoundParsed = false;

            for (var k = 0; k < _this.parsedCertificates.length; k++) {
              var parsedTemp = _this.parsedCertificates[k];
              if ((0, _deepEqual.deepEqual)(parsedTemp, c)) isFoundParsed = true;
            }

            if (!isFoundParsed) _this.parsedCertificates.push(c);
          } else {
            continue;
          }
        } catch (e) {
          /*me.lastError = "Ошибка при получении свойства SubjectName: " + this.#plugin.getError(e)
           me.certificateListReady = true*/
        }
      } catch (ex) {
        alert("Ошибка при перечислении сертификатов: " + _classPrivateFieldGet(_this, _plugin).getLastError(ex));
        throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 4, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432 ".concat(_classPrivateFieldGet(_this, _plugin).getLastError(ex)), 'getAllDevicesNPAPI');
      }

      _classPrivateFieldGet(_this, _certList).push(cert);
    }

    _classPrivateFieldGet(_this, _deviceMap).set(0, _classPrivateFieldGet(_this, _certList));

    _classPrivateFieldSet(_this, _certList, []);

    oStore.Close();
  } //getting certs from hardware


  try {
    oStore.Open(_classPrivateFieldGet(_this, _plugin).CADESCOM_CONTAINER_STORE);
    certs = oStore.Certificates;
    certCnt = certs.Count;
  } catch (e) {
    oStore.Close();
    console.log("Невозможно загрузить список сертификатов." + _classPrivateFieldGet(_this, _plugin).getLastError(e));
    throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 4, "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432 ".concat(_classPrivateFieldGet(_this, _plugin).getLastError(e)), 'getAllDevicesNPAPI');
  }

  if (certCnt == 0) {
    oStore.Close();
    console.log("Сертификаты на токенах не обнаружены");
    return;
  }

  isFound = false;

  for (var _i = 1; _i <= certCnt; _i++) {
    var _cert = void 0;

    try {
      _cert = certs.Item(_i);

      for (var _j = 0; _j < _this.parsedCertificates.length; _j++) {
        var _certListTemp = _this.parsedCertificates[_j].Thumbprint;
        var _certTemp = _cert.Thumbprint;

        if ((0, _deepEqual.deepEqual)(_certListTemp, _certTemp)) {
          isFound = true;
          break;
        }
      }

      if (isFound) continue;
    } catch (e) {
      oStore.Close();
      console.log("Ошибка при перечислении сертификатов: " + _classPrivateFieldGet(_this, _plugin).getLastError(e));
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 4, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432 ".concat(_classPrivateFieldGet(_this, _plugin).getLastError(e)), 'getAllDevicesNPAPI');
    }

    var _pubKey = _cert.PublicKey(),
        _algo = _pubKey.Algorithm,
        _algoOid = _algo.Value;

    var _now = new Date();

    var _withInvalid = true;

    try {
      var _validToDate = new Date(_cert.ValidToDate),
          _validFromDate = new Date(_cert.ValidFromDate),
          _validator = _cert.IsValid(),
          _isValid = _validator.Result;

      if ((_withInvalid || _now < _validToDate && _now >= _validFromDate && _cert.HasPrivateKey() && _isValid) && (_algoOid == '1.2.643.7.1.1.1.1' || _algoOid == '1.2.643.7.1.1.1.2' || _algoOid == '1.2.643.2.2.19')) {
        var _c = {
          ValidToDate: _cert.ValidToDate,
          ValidFromDate: _cert.ValidFromDate,
          SubjectName: _cert.SubjectName,
          IssuerName: _cert.IssuerName,
          thumbPrint: _cert.Thumbprint,
          id: _i,
          IsValid: _now < _validToDate && _now >= _validFromDate,
          HasPrivateKey: _cert.HasPrivateKey(),
          serial: _cert.SerialNumber,
          b64: _cert.Export(_classPrivateFieldGet(_this, _plugin).CADESCOM_ENCODE_BASE64),
          algorythmOid: _algoOid,
          deviceId: 1
        };
        console.log(_cert);
        var _isFoundParsed = false;

        for (var _k = 0; _k < _this.parsedCertificates.length; _k++) {
          var _parsedTemp = _this.parsedCertificates[_k];
          if ((0, _deepEqual.deepEqual)(_parsedTemp, _c)) _isFoundParsed = true;
        }

        if (!_isFoundParsed) _this.parsedCertificates.push(_c);
      } else {
        continue;
      }
    } catch (e) {
      console.log("Ошибка при парсинге сертификатов: " + _classPrivateFieldGet(_this, _plugin).getLastError(e));
      throw _classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 4, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432 ".concat(_classPrivateFieldGet(_this, _plugin).getLastError(e)), 'getAllDevicesNPAPI');
    }

    _classPrivateFieldGet(_this, _certList).push(_cert);
  }

  _classPrivateFieldGet(_this, _deviceMap).set(1, _classPrivateFieldGet(_this, _certList));

  _classPrivateFieldSet(_this, _certList, []);

  oStore.Close();
}

function _bytesToBase2(arrayBuffer) {
  return btoa(new Uint8Array(arrayBuffer).reduce(function (data, _byte) {
    return data + String.fromCharCode(_byte);
  }, '')); // return btoa(String.fromCharCode(arrayBuffer));
}

function _handleError2(code, message, method) {
  var error = {
    code: code,
    message: message,
    description: 'Неизвестная ошибка',
    method: method,
    cryptoDriverType: 1
  };

  switch (code) {
    case 2:
      error.description = 'Ошибка подписи';
      break;

    case 3:
      error.description = 'Ошибка при получении устройств';
      break;

    case 4:
      error.description = 'Проблемы при обнаружении сертификатов';
      break;

    case 5:
      error.description = 'Ошибка определения актуальности плагина';
      break;

    case 6:
      error.description = 'Ошибка загрузки плагина';
      break;

    default:
      error.code = 1;
      break;
  }

  return error;
}

function _getCSPVersion_NPAPI2() {
  try {
    var _oAbout2 = _classPrivateFieldGet(this, _plugin).CreateObject("CAdESCOM.About");
  } catch (err) {
    console.log('Failed to create CAdESCOM.About: ' + _classPrivateFieldGet(this, _plugin).getLastError(err));
    return;
  }

  var ver = oAbout.CSPVersion("", 80);
  return ver.MajorVersion + "." + ver.MinorVersion + "." + ver.BuildVersion;
}

function _getCSPName_NPAPI2() {
  var sCSPName;

  try {
    var _oAbout3 = _classPrivateFieldGet(this, _plugin).CreateObject("CAdESCOM.About");

    sCSPName = _oAbout3.CSPName(80);
  } catch (err) {
    console.log('Failed to create CAdESCOM.About: ' + _classPrivateFieldGet(this, _plugin).getLastError(err));
    return;
  }

  return sCSPName;
}