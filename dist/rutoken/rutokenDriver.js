"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RutokenDriver = void 0;

var _rutoken2 = require("./rutoken");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _rutoken = /*#__PURE__*/new WeakMap();

var _plugin = /*#__PURE__*/new WeakMap();

var _deviceList = /*#__PURE__*/new WeakMap();

var _deviceMap = /*#__PURE__*/new WeakMap();

var _certList = /*#__PURE__*/new WeakMap();

var _errors = /*#__PURE__*/new WeakMap();

var _selectedCertificate = /*#__PURE__*/new WeakMap();

var _keyStr = /*#__PURE__*/new WeakMap();

var _stringVersionCompare = /*#__PURE__*/new WeakSet();

var _checkVersion = /*#__PURE__*/new WeakSet();

var _getLastRtPluginVersion = /*#__PURE__*/new WeakSet();

var _initialize = /*#__PURE__*/new WeakSet();

var _getAllDevices = /*#__PURE__*/new WeakSet();

var _getAllCertificates = /*#__PURE__*/new WeakSet();

var _getCertificateInfo = /*#__PURE__*/new WeakSet();

var _parseCertificate = /*#__PURE__*/new WeakSet();

var _getValueFromCertificate = /*#__PURE__*/new WeakSet();

var _getDate = /*#__PURE__*/new WeakSet();

var _isIe = /*#__PURE__*/new WeakSet();

var _bindToken = /*#__PURE__*/new WeakSet();

var _loadErrorCodes = /*#__PURE__*/new WeakSet();

var _deepEqual = /*#__PURE__*/new WeakSet();

var _isObject = /*#__PURE__*/new WeakSet();

var _encode = /*#__PURE__*/new WeakSet();

var _utf8_encode = /*#__PURE__*/new WeakSet();

var _bytesToBase = /*#__PURE__*/new WeakSet();

var _handleError = /*#__PURE__*/new WeakSet();

var RutokenDriver = /*#__PURE__*/function () {
  function RutokenDriver() {
    _classCallCheck(this, RutokenDriver);

    _classPrivateMethodInitSpec(this, _handleError);

    _classPrivateMethodInitSpec(this, _bytesToBase);

    _classPrivateMethodInitSpec(this, _utf8_encode);

    _classPrivateMethodInitSpec(this, _encode);

    _classPrivateMethodInitSpec(this, _isObject);

    _classPrivateMethodInitSpec(this, _deepEqual);

    _classPrivateMethodInitSpec(this, _loadErrorCodes);

    _classPrivateMethodInitSpec(this, _bindToken);

    _classPrivateMethodInitSpec(this, _isIe);

    _classPrivateMethodInitSpec(this, _getDate);

    _classPrivateMethodInitSpec(this, _getValueFromCertificate);

    _classPrivateMethodInitSpec(this, _parseCertificate);

    _classPrivateMethodInitSpec(this, _getCertificateInfo);

    _classPrivateMethodInitSpec(this, _getAllCertificates);

    _classPrivateMethodInitSpec(this, _getAllDevices);

    _classPrivateMethodInitSpec(this, _initialize);

    _classPrivateMethodInitSpec(this, _getLastRtPluginVersion);

    _classPrivateMethodInitSpec(this, _checkVersion);

    _classPrivateMethodInitSpec(this, _stringVersionCompare);

    _classPrivateFieldInitSpec(this, _rutoken, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _plugin, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "isPluginInstalled", false);

    _defineProperty(this, "isPluginLoaded", false);

    _defineProperty(this, "pluginVersionStatus", void 0);

    _defineProperty(this, "lastPluginVersion", void 0);

    _classPrivateFieldInitSpec(this, _deviceList, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _deviceMap, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _certList, {
      writable: true,
      value: []
    });

    _defineProperty(this, "parsedCertificates", []);

    _classPrivateFieldInitSpec(this, _errors, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _selectedCertificate, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _keyStr, {
      writable: true,
      value: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    });

    _classPrivateFieldSet(this, _rutoken, _rutoken2.rutoken);
  }

  _createClass(RutokenDriver, [{
    key: "isActualVersionPlugin",
    value: function () {
      var _isActualVersionPlugin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this, currentPluginVersion;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _this = this;
                _context2.next = 4;
                return new Promise(function (resolve, reject) {
                  var xhr = new XMLHttpRequest();
                  xhr.open('GET', 'https://download.rutoken.ru/Rutoken_Plugin/Current/version.txt', true);
                  xhr.onreadystatechange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (xhr.readyState === 4) {
                              if (xhr.status === 200) {
                                this.actualVersion = xhr.responseText.split('Version: v.')[1].split('Release')[0].replace(/\s+/g, '');
                                resolve();
                              }

                              reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 5, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430", 'isActualVersionPlugin'));
                            }

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));
                  xhr.send();
                });

              case 4:
                currentPluginVersion = _classPrivateFieldGet(this, _plugin).version.toString();
                return _context2.abrupt("return", {
                  cryptoDriverType: 2,
                  isActualVersion: _classPrivateMethodGet(this, _stringVersionCompare, _stringVersionCompare2).call(this, this.lastPluginVersion, currentPluginVersion),
                  currentVersion: currentPluginVersion,
                  actualVersion: this.lastPluginVersion
                });

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function isActualVersionPlugin() {
        return _isActualVersionPlugin.apply(this, arguments);
      }

      return isActualVersionPlugin;
    }()
  }, {
    key: "loadPlugin",
    value: function () {
      var _loadPlugin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var isRutokenReady;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isPluginLoaded) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return _classPrivateFieldGet(this, _rutoken).ready;

              case 5:
                if (!(window.chrome || typeof InstallTrigger !== 'undefined')) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 8;
                return _classPrivateFieldGet(this, _rutoken).isExtensionInstalled();

              case 8:
                isRutokenReady = _context3.sent;
                _context3.next = 12;
                break;

              case 11:
                isRutokenReady = true;

              case 12:
                if (!isRutokenReady) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 15;
                return _classPrivateFieldGet(this, _rutoken).isPluginInstalled();

              case 15:
                this.isPluginInstalled = _context3.sent;

              case 16:
                if (this.isPluginInstalled) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt("return");

              case 18:
                _context3.t0 = _classPrivateFieldSet;
                _context3.t1 = this;
                _context3.t2 = _plugin;
                _context3.next = 23;
                return _classPrivateFieldGet(this, _rutoken).loadPlugin();

              case 23:
                _context3.t3 = _context3.sent;
                (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t3);

                _classPrivateMethodGet(this, _loadErrorCodes, _loadErrorCodes2).call(this);

                _context3.next = 28;
                return _classPrivateMethodGet(this, _initialize, _initialize2).call(this);

              case 28:
                _context3.next = 30;
                return _classPrivateMethodGet(this, _getLastRtPluginVersion, _getLastRtPluginVersion2).call(this);

              case 30:
                _classPrivateMethodGet(this, _checkVersion, _checkVersion2).call(this);

                if (_classPrivateFieldGet(this, _plugin)) this.isPluginLoaded = true;
                _context3.next = 40;
                break;

              case 34:
                _context3.prev = 34;
                _context3.t4 = _context3["catch"](2);

                if (!_context3.t4.method) {
                  _context3.next = 38;
                  break;
                }

                throw _context3.t4;

              case 38:
                console.log(_classPrivateFieldGet(this, _errors)[_context3.t4.message]);
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 6, _classPrivateFieldGet(this, _errors)[_context3.t4.message] || _context3.t4.message, 'loadPlugin');

              case 40:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 34]]);
      }));

      function loadPlugin() {
        return _loadPlugin.apply(this, arguments);
      }

      return loadPlugin;
    }()
  }, {
    key: "reloadDevices",
    value: function () {
      var _reloadDevices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                _classPrivateFieldSet(this, _certList, []);

                _classPrivateFieldSet(this, _deviceList, []);

                _classPrivateFieldGet(this, _deviceMap).clear;
                this.parsedCertificates = [];
                _context4.next = 7;
                return _classPrivateMethodGet(this, _initialize, _initialize2).call(this);

              case 7:
                _context4.next = 15;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);

                if (!_context4.t0.method) {
                  _context4.next = 13;
                  break;
                }

                throw _context4.t0;

              case 13:
                console.log(_classPrivateFieldGet(this, _errors)[_context4.t0.message]);
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 3, _classPrivateFieldGet(this, _errors)[_context4.t0.message] || _context4.t0.message, 'reloadDevices');

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 9]]);
      }));

      function reloadDevices() {
        return _reloadDevices.apply(this, arguments);
      }

      return reloadDevices;
    }()
  }, {
    key: "signCMS",
    value: function () {
      var _signCMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data, certificateId, deviceId) {
        var dataToSign, CMS, options;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = {
                  "detached": true,
                  "addSignTime": true
                };
                _context5.prev = 1;

                if (!(data.length == 0)) {
                  _context5.next = 5;
                  break;
                }

                console.log("Data to sign is null");
                return _context5.abrupt("return");

              case 5:
                if (_typeof(data) === 'object') {
                  dataToSign = _classPrivateMethodGet(this, _bytesToBase, _bytesToBase2).call(this, data);
                } else {
                  dataToSign = _classPrivateMethodGet(this, _encode, _encode2).call(this, data);
                }

                console.log('before  bindToken if');
                _context5.next = 9;
                return _classPrivateMethodGet(this, _bindToken, _bindToken2).call(this, deviceId);

              case 9:
                if (_context5.sent) {
                  _context5.next = 12;
                  break;
                }

                console.log('return from bindToken if');
                return _context5.abrupt("return");

              case 12:
                _context5.next = 14;
                return _classPrivateFieldGet(this, _plugin).sign(deviceId, certificateId, dataToSign, _classPrivateFieldGet(this, _plugin).DATA_FORMAT_BASE64, options);

              case 14:
                CMS = _context5.sent;
                console.log(CMS); // Закрытие сессии

                _context5.next = 18;
                return _classPrivateFieldGet(this, _plugin).logout(deviceId);

              case 18:
                _context5.next = 25;
                break;

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5["catch"](1);

                if (!(_context5.t0.code === 10)) {
                  _context5.next = 24;
                  break;
                }

                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 2, _context5.t0.message, 'signCMS');

              case 24:
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 2, _classPrivateFieldGet(this, _errors)[_context5.t0.message] || _context5.t0.message, 'signCMS');

              case 25:
                return _context5.abrupt("return", CMS);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 20]]);
      }));

      function signCMS(_x, _x2, _x3) {
        return _signCMS.apply(this, arguments);
      }

      return signCMS;
    }()
  }]);

  return RutokenDriver;
}();

exports.RutokenDriver = RutokenDriver;

function _stringVersionCompare2(actualVersion, currentPluginVersion) {
  var actual = actualVersion.split('.');
  var current = currentPluginVersion.split('.');
  var isActual = true;

  for (var i = 0; i < Math.min(actual.length, current.length); i++) {
    if (parseInt(current[i]) < parseInt(actual[i])) {
      isActual = false;
      break;
    }
  }

  return isActual;
}

function _checkVersion2(lastVersion) {
  var _this = this;

  if (_classPrivateFieldGet(this, _plugin).version.toString() < lastVersion) _this.pluginVersionStatus = "\u0412\u0435\u0440\u0441\u0438\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u0430. \u041D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F: ".concat(lastVersion);else _this.pluginVersionStatus = 'У Вас последняя версия плагина';
}

function _getLastRtPluginVersion2() {
  return _getLastRtPluginVersion3.apply(this, arguments);
}

function _getLastRtPluginVersion3() {
  _getLastRtPluginVersion3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var _this, xhr;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _this = this;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://download.rutoken.ru/Rutoken_Plugin/Current/version.txt', true);
            xhr.onreadystatechange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (!(xhr.readyState == 4 && xhr.status == 200)) {
                        _context6.next = 4;
                        break;
                      }

                      _context6.next = 3;
                      return this.response.split('Version: v.')[1].split('Release')[0].replace(/\s+/g, '');

                    case 3:
                      _this.lastPluginVersion = _context6.sent;

                    case 4:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
            xhr.send();

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _getLastRtPluginVersion3.apply(this, arguments);
}

function _initialize2() {
  return _initialize3.apply(this, arguments);
}

function _initialize3() {
  _initialize3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _iterator, _step, _step$value, key, value, j;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _classPrivateMethodGet(this, _getAllDevices, _getAllDevices2).call(this);

          case 2:
            _context8.next = 4;
            return _classPrivateMethodGet(this, _getAllCertificates, _getAllCertificates2).call(this);

          case 4:
            _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _deviceMap));
            _context8.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context8.next = 18;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];
            j = 0;

          case 10:
            if (!(j < value.length)) {
              _context8.next = 16;
              break;
            }

            _context8.next = 13;
            return _classPrivateMethodGet(this, _getCertificateInfo, _getCertificateInfo2).call(this, key, value[j]);

          case 13:
            j++;
            _context8.next = 10;
            break;

          case 16:
            _context8.next = 7;
            break;

          case 18:
            _context8.next = 23;
            break;

          case 20:
            _context8.prev = 20;
            _context8.t0 = _context8["catch"](5);

            _iterator.e(_context8.t0);

          case 23:
            _context8.prev = 23;

            _iterator.f();

            return _context8.finish(23);

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[5, 20, 23, 26]]);
  }));
  return _initialize3.apply(this, arguments);
}

function _getAllDevices2() {
  return _getAllDevices3.apply(this, arguments);
}

function _getAllDevices3() {
  _getAllDevices3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.t0 = _classPrivateFieldSet;
            _context9.t1 = this;
            _context9.t2 = _deviceList;
            _context9.next = 6;
            return _classPrivateFieldGet(this, _plugin).enumerateDevices();

          case 6:
            _context9.t3 = _context9.sent;
            (0, _context9.t0)(_context9.t1, _context9.t2, _context9.t3);
            return _context9.abrupt("return", _classPrivateFieldGet(this, _deviceList));

          case 11:
            _context9.prev = 11;
            _context9.t4 = _context9["catch"](0);
            throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 3, _classPrivateFieldGet(this, _errors)[_context9.t4.message] || _context9.t4.message, 'getAllDevices');

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this, [[0, 11]]);
  }));
  return _getAllDevices3.apply(this, arguments);
}

function _getAllCertificates2() {
  return _getAllCertificates3.apply(this, arguments);
}

function _getAllCertificates3() {
  _getAllCertificates3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var i, certificate;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;

            if (_classPrivateFieldGet(this, _deviceList).length) {
              _context10.next = 3;
              break;
            }

            return _context10.abrupt("return");

          case 3:
            i = 0;

          case 4:
            if (!(i < _classPrivateFieldGet(this, _deviceList).length)) {
              _context10.next = 13;
              break;
            }

            _context10.next = 7;
            return _classPrivateFieldGet(this, _plugin).enumerateCertificates(_classPrivateFieldGet(this, _deviceList)[i], _classPrivateFieldGet(this, _plugin).CERT_CATEGORY_USER);

          case 7:
            certificate = _context10.sent;

            _classPrivateFieldGet(this, _deviceMap).set(_classPrivateFieldGet(this, _deviceList)[i], certificate);

            _classPrivateFieldGet(this, _certList).push(certificate);

          case 10:
            i++;
            _context10.next = 4;
            break;

          case 13:
            return _context10.abrupt("return", _classPrivateFieldGet(this, _certList));

          case 16:
            _context10.prev = 16;
            _context10.t0 = _context10["catch"](0);
            throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 4, _classPrivateFieldGet(this, _errors)[reason.message] || reason.message, 'getAllCertificates');

          case 19:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this, [[0, 16]]);
  }));
  return _getAllCertificates3.apply(this, arguments);
}

function _getCertificateInfo2(_x4, _x5) {
  return _getCertificateInfo3.apply(this, arguments);
}

function _getCertificateInfo3() {
  _getCertificateInfo3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(deviceId, certificateId) {
    var certificate;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;

            _classPrivateFieldSet(this, _selectedCertificate, {
              "deviceId": deviceId,
              "certificateId": certificateId
            });

            _context11.next = 4;
            return _classPrivateFieldGet(this, _plugin).parseCertificate(deviceId, certificateId);

          case 4:
            certificate = _context11.sent;
            return _context11.abrupt("return", _classPrivateMethodGet(this, _parseCertificate, _parseCertificate2).call(this, certificate));

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](0);

            if (!_context11.t0.method) {
              _context11.next = 12;
              break;
            }

            throw _context11.t0;

          case 12:
            throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 4, _classPrivateFieldGet(this, _errors)[reason.message] || reason.message, 'getAllCertificates');

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this, [[0, 8]]);
  }));
  return _getCertificateInfo3.apply(this, arguments);
}

function _parseCertificate2(_x6) {
  return _parseCertificate3.apply(this, arguments);
}

function _parseCertificate3() {
  _parseCertificate3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(certificate) {
    var inn, ogrnip, ogrn, snils, surname, nameAndPatronymic, issuerCN, ownerCN, innLe, subjectString, issuerString, now, certPem, parsedCertificate, isFoundParsed, k, parsedTemp;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            inn = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'INN'), ogrnip = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'OGRNIP'), ogrn = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'OGRN'), snils = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'SNILS'), surname = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'surname'), nameAndPatronymic = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'givenName'), issuerCN = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.issuer, 'commonName'), ownerCN = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'commonName'), innLe = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'INNLE') || inn, subjectString = '', issuerString = '';

            if (innLe.length > 0) {
              subjectString += 'INNLE=' + innLe + ', ';
            }

            if (inn.length > 0) {
              subjectString += 'INN=' + inn + ', ';
            }

            if (ogrnip.length > 0) {
              subjectString += 'OGRNIP=' + ogrnip + ', ';
            }

            if (ogrn.length > 0) {
              subjectString += 'OGRN=' + ogrn + ', ';
            }

            if (snils.length > 0) {
              subjectString += 'SNILS=' + snils + ', ';
            }

            if (surname.length > 0) {
              subjectString += 'SN=' + surname + ', ';
            }

            if (nameAndPatronymic.length > 0) {
              subjectString += 'GN=' + nameAndPatronymic + ', ';
            }

            if (ownerCN.length > 0) {
              subjectString += 'CN=' + ownerCN + ', ';
            }

            if (issuerCN.length > 0) {
              issuerString += 'CN=' + issuerCN + ', ';
            }

            now = new Date();
            _context12.next = 13;
            return _classPrivateFieldGet(this, _plugin).getCertificate(_classPrivateFieldGet(this, _selectedCertificate).deviceId, _classPrivateFieldGet(this, _selectedCertificate).certificateId);

          case 13:
            certPem = _context12.sent;
            parsedCertificate = {
              ValidToDate: _classPrivateMethodGet(this, _getDate, _getDate2).call(this, certificate.validNotAfter),
              ValidFromDate: _classPrivateMethodGet(this, _getDate, _getDate2).call(this, certificate.validNotBefore),
              SubjectName: subjectString,
              IssuerName: issuerString,
              id: _classPrivateFieldGet(this, _selectedCertificate).certificateId,
              IsValid: now <= _classPrivateMethodGet(this, _getDate, _getDate2).call(this, certificate.validNotAfter) && now >= _classPrivateMethodGet(this, _getDate, _getDate2).call(this, certificate.validNotBefore),
              HasPrivateKey: true,
              serial: certificate.serialNumber,
              b64: certPem,
              Thumbprint: _classPrivateFieldGet(this, _selectedCertificate).certificateId.replace(/:/g, '').toUpperCase(),
              deviceId: _classPrivateFieldGet(this, _selectedCertificate).deviceId
            };
            isFoundParsed = false;

            for (k = 0; k < this.parsedCertificates.length; k++) {
              parsedTemp = this.parsedCertificates[k];
              if (_classPrivateMethodGet(this, _deepEqual, _deepEqual2).call(this, parsedTemp, parsedCertificate)) isFoundParsed = true;
            }

            if (!isFoundParsed) this.parsedCertificates.push(parsedCertificate);
            return _context12.abrupt("return", parsedCertificate);

          case 19:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));
  return _parseCertificate3.apply(this, arguments);
}

function _getValueFromCertificate2(arr, key) {
  var i = 0,
      cnt = arr.length;

  for (; i < cnt; i++) {
    if (arr[i].rdn == key) {
      return arr[i].value;
    }
  }

  return '';
}

function _getDate2(date) {
  if (_classPrivateMethodGet(this, _isIe, _isIe2).call(this)) {
    date = date.replace(/-/g, '/').replace('T', ' ');
  }

  return new Date(date);
}

function _isIe2() {
  var na = navigator.userAgent.toLowerCase(),
      isIE = !/opera/.test(na) && /msie/.test(na),
      docMode = document.documentMode;
  return isIE && (/msie 8/.test(na) && docMode != 7 && docMode != 9 || docMode == 8);
}

function _bindToken2(_x7) {
  return _bindToken3.apply(this, arguments);
}

function _bindToken3() {
  _bindToken3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(deviceId) {
    var _window$SADO_TOKEN_PI, isLoggedIn, _classPrivateFieldGet2;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _classPrivateFieldGet(this, _plugin).getDeviceInfo(deviceId, _classPrivateFieldGet(this, _plugin).TOKEN_INFO_IS_LOGGED_IN);

          case 3:
            isLoggedIn = _context13.sent;

            if (!isLoggedIn) {
              _context13.next = 6;
              break;
            }

            return _context13.abrupt("return", true);

          case 6:
            _context13.next = 8;
            return _classPrivateFieldGet(this, _plugin).login(deviceId, (_window$SADO_TOKEN_PI = window.SADO_TOKEN_PIN) !== null && _window$SADO_TOKEN_PI !== void 0 ? _window$SADO_TOKEN_PI : prompt("Введите pin"));

          case 8:
            return _context13.abrupt("return", true);

          case 11:
            _context13.prev = 11;
            _context13.t0 = _context13["catch"](0);
            throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 2, (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _errors)[_context13.t0.message]) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : _context13.t0, 'bindToken');

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this, [[0, 11]]);
  }));
  return _bindToken3.apply(this, arguments);
}

function _loadErrorCodes2() {
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.UNKNOWN_ERROR] = "Неизвестная ошибка";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.BAD_PARAMS] = "Неправильные параметры";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.NOT_ENOUGH_MEMORY] = "Недостаточно памяти";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.DEVICE_NOT_FOUND] = "Устройство не найдено";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.DEVICE_ERROR] = "Ошибка устройства";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.TOKEN_INVALID] = "Ошибка чтения/записи устройства. Возможно, устройство было извлечено. %device-step%";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.CERTIFICATE_CATEGORY_BAD] = "Недопустимый тип сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.CERTIFICATE_EXISTS] = "Сертификат уже существует на устройстве";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.CERTIFICATE_NOT_FOUND] = "Сертификат не найден";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.CERTIFICATE_HASH_NOT_UNIQUE] = "Хэш сертификата не уникален";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.CA_CERTIFICATES_NOT_FOUND] = "Корневые сертификаты не найдены";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.CERTIFICATE_VERIFICATION_ERROR] = "Ошибка проверки сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.PKCS11_LOAD_FAILED] = "Не удалось загрузить PKCS#11 библиотеку";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.PIN_LENGTH_INVALID] = "Некорректная длина PIN-кода";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.PIN_INCORRECT] = "Некорректный PIN-код";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.PIN_LOCKED] = "PIN-код заблокирован";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.PIN_CHANGED] = "PIN-код был изменен";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.SESSION_INVALID] = "Состояние токена изменилось";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.USER_NOT_LOGGED_IN] = "Выполните вход на устройство";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.ALREADY_LOGGED_IN] = "Вход на устройство уже был выполнен";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.ATTRIBUTE_READ_ONLY] = "Свойство не может быть изменено";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.KEY_NOT_FOUND] = "Соответствующая сертификату ключевая пара не найдена";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.KEY_ID_NOT_UNIQUE] = "Идентификатор ключевой пары не уникален";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.CEK_NOT_AUTHENTIC] = "Выбран неправильный ключ";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.KEY_LABEL_NOT_UNIQUE] = "Метка ключевой пары не уникальна";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.WRONG_KEY_TYPE] = "Неправильный тип ключа";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.LICENCE_READ_ONLY] = "Лицензия доступна только для чтения";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.DATA_INVALID] = "Неверные данные";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.UNSUPPORTED_BY_TOKEN] = "Операция не поддерживается токеном";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.KEY_FUNCTION_NOT_PERMITTED] = "Операция запрещена для данного типа ключа";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.BASE64_DECODE_FAILED] = "Ошибка декодирования даных из BASE64";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.PEM_ERROR] = "Ошибка разбора PEM";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.ASN1_ERROR] = "Ошибка декодирования ASN1 структуры";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.FUNCTION_REJECTED] = "Операция отклонена пользователем";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.FUNCTION_FAILED] = "Невозможно выполнить операцию";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT] = "Невозможно получить сертификат подписанта";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_GET_CRL] = "Невозможно получить CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_DECRYPT_CERT_SIGNATURE] = "Невозможно расшифровать подпись сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_DECRYPT_CRL_SIGNATURE] = "Невозможно расшифровать подпись CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY] = "Невозможно раскодировать открытый ключ эмитента";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CERT_SIGNATURE_FAILURE] = "Неверная подпись сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CRL_SIGNATURE_FAILURE] = "Неверная подпись CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CERT_NOT_YET_VALID] = "Срок действия сертификата еще не начался";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CRL_NOT_YET_VALID] = "Срок действия CRL еще не начался";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CERT_HAS_EXPIRED] = "Срок действия сертификата истек";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CRL_HAS_EXPIRED] = "Срок действия CRL истек";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_ERROR_IN_CERT_NOT_BEFORE_FIELD] = "Некорректные данные в поле \"notBefore\" у сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_ERROR_IN_CERT_NOT_AFTER_FIELD] = "Некорректные данные в поле \"notAfter\" у сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_ERROR_IN_CRL_LAST_UPDATE_FIELD] = "Некорректные данные в поле \"lastUpdate\" у CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_ERROR_IN_CRL_NEXT_UPDATE_FIELD] = "Некорректные данные в поле \"nextUpdate\" у CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_OUT_OF_MEM] = "Нехватает памяти";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_DEPTH_ZERO_SELF_SIGNED_CERT] = "Недоверенный самоподписанный сертификат";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_SELF_SIGNED_CERT_IN_CHAIN] = "В цепочке обнаружен недоверенный самоподписанный сертификат";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT_LOCALLY] = "Невозможно получить локальный сертификат подписанта";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_VERIFY_LEAF_SIGNATURE] = "Невозможно проверить первый сертификат";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CERT_CHAIN_TOO_LONG] = "Слишком длинная цепочка сертификатов";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CERT_REVOKED] = "Сертификат отозван";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_INVALID_CA] = "Неверный корневой сертификат";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_INVALID_NON_CA] = "Неверный некорневой сертфикат, помеченный как корневой";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_PATH_LENGTH_EXCEEDED] = "Превышена длина пути";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_PROXY_PATH_LENGTH_EXCEEDED] = "Превышина длина пути прокси";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_PROXY_CERTIFICATES_NOT_ALLOWED] = "Проксирующие сертификаты недопустимы";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_INVALID_PURPOSE] = "Неподдерживаемое назначение сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CERT_UNTRUSTED] = "Недоверенный сертификат";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CERT_REJECTED] = "Сертифкат отклонен";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_APPLICATION_VERIFICATION] = "Ошибка проверки приложения";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_SUBJECT_ISSUER_MISMATCH] = "Несовпадения субъекта и эмитента";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_AKID_SKID_MISMATCH] = "Несовпадение идентификатора ключа у субьекта и доверенного центра";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_AKID_ISSUER_SERIAL_MISMATCH] = "Несовпадение серийного номера субьекта и доверенного центра";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_KEYUSAGE_NO_CERTSIGN] = "Ключ не может быть использован для подписи сертификатов";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNABLE_TO_GET_CRL_ISSUER] = "Невозможно получить CRL подписанта";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNHANDLED_CRITICAL_EXTENSION] = "Неподдерживаемое расширение";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_KEYUSAGE_NO_CRL_SIGN] = "Ключ не может быть использован для подписи CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_KEYUSAGE_NO_DIGITAL_SIGNATURE] = "Ключ не может быть использован для цифровой подписи";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNHANDLED_CRITICAL_CRL_EXTENSION] = "Неподдерживаемое расширение CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_INVALID_EXTENSION] = "Неверное или некорректное расширение сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_INVALID_POLICY_EXTENSION] = "Неверное или некорректное расширение политик сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_NO_EXPLICIT_POLICY] = "Явные политики отсутствуют";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_DIFFERENT_CRL_SCOPE] = "Другая область CRL";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNSUPPORTED_EXTENSION_FEATURE] = "Неподдерживаемое расширение возможностей";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNNESTED_RESOURCE] = "RFC 3779 неправильное наследование ресурсов";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_PERMITTED_VIOLATION] = "Неправильная структура сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_EXCLUDED_VIOLATION] = "Неправильная структура сертфиката";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_SUBTREE_MINMAX] = "Неправильная структура сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNSUPPORTED_CONSTRAINT_TYPE] = "Неправильная структура сертфиката";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNSUPPORTED_CONSTRAINT_SYNTAX] = "Неправильная структура сертификата";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_UNSUPPORTED_NAME_SYNTAX] = "Неправильная структура сертфиката";
  _classPrivateFieldGet(this, _errors)[_classPrivateFieldGet(this, _plugin).errorCodes.X509_CRL_PATH_VALIDATION_ERROR] = "Неправильный путь CRL";
}

function _deepEqual2(object1, object2) {
  var keys1 = Object.keys(object1);
  var keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (var _i = 0, _keys = keys1; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var val1 = object1[key];
    var val2 = object2[key];

    var areObjects = _classPrivateMethodGet(this, _isObject, _isObject2).call(this, val1) && _classPrivateMethodGet(this, _isObject, _isObject2).call(this, val2);

    if (areObjects && !_classPrivateMethodGet(this, _deepEqual, _deepEqual2).call(this, val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
}

function _isObject2(object) {
  return object != null && _typeof(object) === 'object';
}

function _encode2(input) {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = _classPrivateMethodGet(this, _utf8_encode, _utf8_encode2).call(this, input);

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output + _classPrivateFieldGet(this, _keyStr).charAt(enc1) + _classPrivateFieldGet(this, _keyStr).charAt(enc2) + _classPrivateFieldGet(this, _keyStr).charAt(enc3) + _classPrivateFieldGet(this, _keyStr).charAt(enc4);
  }

  return output;
}

function _utf8_encode2(input) {
  var string = input.replace(/\r\n/g, "\n");
  var utftext = "";

  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode(c >> 6 | 192);
      utftext += String.fromCharCode(c & 63 | 128);
    } else {
      utftext += String.fromCharCode(c >> 12 | 224);
      utftext += String.fromCharCode(c >> 6 & 63 | 128);
      utftext += String.fromCharCode(c & 63 | 128);
    }
  }

  return utftext;
}

function _bytesToBase2(arrayBuffer) {
  return btoa(new Uint8Array(arrayBuffer).reduce(function (data, _byte) {
    return data + String.fromCharCode(_byte);
  }, '')); // return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
  // return btoa(String.fromCharCode(arrayBuffer));
}

function _handleError2(code, message, method) {
  var error = {
    code: code,
    description: 'Неизвестная ошибка',
    message: message,
    method: method,
    cryptoDriverType: 2
  };

  switch (code) {
    case 2:
      if (message.error === 'Could not execute command') {
        error.description = "Пользователь отменил ввод пин-кода";
        error.code = 18;
        break;
      }

      error.description = 'Ошибка подписи';
      break;

    case 3:
      error.description = 'Ошибка при получении устройств';
      break;

    case 4:
      error.code = 4;
      error.description = 'Проблемы при обнаружении сертификатов';
      break;

    case 5:
      error.code = 5;
      error.description = 'Ошибка определения актуальности плагина';
      break;

    case 6:
      error.description = 'Ошибка загрузки плагина';
      break;

    default:
      switch (message) {
        case "Некорректная длина PIN-кода":
          error.description = "Введен PIN-код некорректной длины";
          error.code = 8;
          break;

        case "Некорректный PIN-код":
          error.code = 9;
          error.description = "Введен некорректный PIN-код";
          break;

        case "Недостаточно памяти":
          error.code = 13;
          error.description = "Недостаточно памяти для выполнения функции";
          break;

        case "Сертификат не найден":
          error.description = "сертификат не обнаружен";
          error.code = 14;
          break;

        case "Вход на устройство уже был выполнен":
          error.code = 15;
          break;

        case "Недопустимый тип сертификата":
          error.description = "Недопустимый тип сертификата";
          error.code = 16;
          break;

        case "PIN-код заблокирован":
          error.description = "PIN-код заблокирован";
          error.code = 17;
          break;

        case "Пользователь отменил ввод пин-кода":
          error.description = "Пользователь отменил ввод пин-кода";
          error.code = 18;
          break;

        case "Выполните вход на устройство":
          error.description = "Выполните вход на устройство";
          error.code = 19;
          break;

        default:
          error.code = 1;
          break;
      }

      break;
  }

  return error;
}