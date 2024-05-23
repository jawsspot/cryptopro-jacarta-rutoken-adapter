"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JacartaDriver = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _plugin = /*#__PURE__*/new WeakMap();

var _deviceList = /*#__PURE__*/new WeakMap();

var _deviceMap = /*#__PURE__*/new WeakMap();

var _certList = /*#__PURE__*/new WeakMap();

var _selectedCertificate = /*#__PURE__*/new WeakMap();

var _keyStr = /*#__PURE__*/new WeakMap();

var _callback = /*#__PURE__*/new WeakMap();

var _stringVersionCompare = /*#__PURE__*/new WeakSet();

var _loadJC = /*#__PURE__*/new WeakSet();

var _addListener = /*#__PURE__*/new WeakSet();

var _handleSlotAdded = /*#__PURE__*/new WeakSet();

var _initialize = /*#__PURE__*/new WeakSet();

var _getCertificateInfo = /*#__PURE__*/new WeakSet();

var _preprocessCertificate = /*#__PURE__*/new WeakSet();

var _parseCertificate = /*#__PURE__*/new WeakSet();

var _bufferSerialToHex = /*#__PURE__*/new WeakSet();

var _getValueFromCertificate = /*#__PURE__*/new WeakSet();

var _getCertificateInPem = /*#__PURE__*/new WeakSet();

var _deepEqual = /*#__PURE__*/new WeakSet();

var _isObject = /*#__PURE__*/new WeakSet();

var _encode = /*#__PURE__*/new WeakSet();

var _utf8_encode = /*#__PURE__*/new WeakSet();

var _handleError = /*#__PURE__*/new WeakSet();

var _bytesToBase = /*#__PURE__*/new WeakSet();

var _certFromBytesToBase = /*#__PURE__*/new WeakSet();

var JacartaDriver = /*#__PURE__*/function () {
  function JacartaDriver() {
    _classCallCheck(this, JacartaDriver);

    _classPrivateMethodInitSpec(this, _certFromBytesToBase);

    _classPrivateMethodInitSpec(this, _bytesToBase);

    _classPrivateMethodInitSpec(this, _handleError);

    _classPrivateMethodInitSpec(this, _utf8_encode);

    _classPrivateMethodInitSpec(this, _encode);

    _classPrivateMethodInitSpec(this, _isObject);

    _classPrivateMethodInitSpec(this, _deepEqual);

    _classPrivateMethodInitSpec(this, _getCertificateInPem);

    _classPrivateMethodInitSpec(this, _getValueFromCertificate);

    _classPrivateMethodInitSpec(this, _bufferSerialToHex);

    _classPrivateMethodInitSpec(this, _parseCertificate);

    _classPrivateMethodInitSpec(this, _preprocessCertificate);

    _classPrivateMethodInitSpec(this, _getCertificateInfo);

    _classPrivateMethodInitSpec(this, _initialize);

    _classPrivateMethodInitSpec(this, _handleSlotAdded);

    _classPrivateMethodInitSpec(this, _addListener);

    _classPrivateMethodInitSpec(this, _loadJC);

    _classPrivateMethodInitSpec(this, _stringVersionCompare);

    _classPrivateFieldInitSpec(this, _plugin, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "isPluginInstalled", false);

    _defineProperty(this, "isPluginLoaded", false);

    _defineProperty(this, "pluginVersion", void 0);

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

    _classPrivateFieldInitSpec(this, _selectedCertificate, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _keyStr, {
      writable: true,
      value: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    });

    _classPrivateFieldInitSpec(this, _callback, {
      writable: true,
      value: void 0
    });
  }

  _createClass(JacartaDriver, [{
    key: "isActualVersionPlugin",
    value: function () {
      var _isActualVersionPlugin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var actualVersion, currentPluginVersion;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                actualVersion = '4.3.2';
                _context.next = 4;
                return this.pluginVersion;

              case 4:
                currentPluginVersion = _context.sent;
                return _context.abrupt("return", {
                  cryptoDriverType: 3,
                  isActualVersion: _classPrivateMethodGet(this, _stringVersionCompare, _stringVersionCompare2).call(this, actualVersion, currentPluginVersion),
                  currentVersion: currentPluginVersion,
                  actualVersion: actualVersion
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 5, _context.t0.message, 'isActualVersionPlugin');

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function isActualVersionPlugin() {
        return _isActualVersionPlugin.apply(this, arguments);
      }

      return isActualVersionPlugin;
    }()
  }, {
    key: "loadPlugin",
    value: function () {
      var _loadPlugin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isPluginLoaded) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return _classPrivateMethodGet(this, _loadJC, _loadJC2).call(this);

              case 5:
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](2);
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 6, _context2.t0.message, 'loadPlugin');

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 7]]);
      }));

      function loadPlugin() {
        return _loadPlugin.apply(this, arguments);
      }

      return loadPlugin;
    }()
  }, {
    key: "reloadDevices",
    value: function () {
      var _reloadDevices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                _classPrivateFieldSet(this, _certList, []);

                _classPrivateFieldSet(this, _deviceList, []);

                _classPrivateFieldGet(this, _deviceMap).clear;
                this.parsedCertificates = [];

                _classPrivateMethodGet(this, _initialize, _initialize2).call(this);

                _context3.next = 13;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);

                if (!_context3.t0.method) {
                  _context3.next = 12;
                  break;
                }

                throw _context3.t0;

              case 12:
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 1, _context3.t0.message, 'reloadDevices');

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function reloadDevices() {
        return _reloadDevices.apply(this, arguments);
      }

      return reloadDevices;
    }()
  }, {
    key: "addCallback",
    value: function addCallback(cb) {
      _classPrivateFieldSet(this, _callback, cb);
    }
  }, {
    key: "signCMS",
    value: function () {
      var _signCMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data, certificateId, deviceId) {
        var CMS, isBinded, loggedInToken, dataToSign;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                isBinded = false;
                loggedInToken = _classPrivateFieldGet(this, _plugin).getLoggedInState();

                if (!(loggedInToken.tokenID != deviceId || loggedInToken.state == 0)) {
                  _context4.next = 12;
                  break;
                }

                if (isBinded) {
                  _context4.next = 12;
                  break;
                }

                _context4.prev = 4;

                if (window.SADO_TOKEN_PIN) {
                  _classPrivateFieldGet(this, _plugin).bindToken({
                    args: {
                      tokenID: deviceId,
                      useUI: false,
                      pin: window.SADO_TOKEN_PIN
                    }
                  });
                } else {
                  _classPrivateFieldGet(this, _plugin).bindToken({
                    args: {
                      tokenID: deviceId,
                      useUI: true
                    }
                  });
                }

                isBinded = true;
                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](4);
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 2, _context4.t0.message, 'signCMS');

              case 12:
                _context4.prev = 12;

                if (_typeof(data) === 'object') {
                  dataToSign = _classPrivateMethodGet(this, _bytesToBase, _bytesToBase2).call(this, data);
                } else {
                  dataToSign = _classPrivateMethodGet(this, _encode, _encode2).call(this, data);
                }

                CMS = _classPrivateFieldGet(this, _plugin).signBase64EncodedData({
                  args: {
                    contID: certificateId,
                    data: dataToSign,
                    attachedSignature: false,
                    addSigningTime: true
                  }
                });
                _context4.next = 22;
                break;

              case 17:
                _context4.prev = 17;
                _context4.t1 = _context4["catch"](12);

                if (!_context4.t1.method) {
                  _context4.next = 21;
                  break;
                }

                throw _context4.t1;

              case 21:
                throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 2, _context4.t1.message, 'signCMS');

              case 22:
                console.log(CMS);
                return _context4.abrupt("return", CMS);

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 9], [12, 17]]);
      }));

      function signCMS(_x, _x2, _x3) {
        return _signCMS.apply(this, arguments);
      }

      return signCMS;
    }()
  }]);

  return JacartaDriver;
}();

exports.JacartaDriver = JacartaDriver;

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

function _loadJC2() {
  return _loadJC3.apply(this, arguments);
}

function _loadJC3() {
  _loadJC3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var _this;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _this = this;
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              var s = document.createElement('script');
              var r = false;
              s.type = 'text/javascript';
              s.src = 'https://localhost:24738/JCWebClient.js';
              s.async = true;

              s.onerror = function (err) {
                _this.isPluginInstalled = false;
                _this.isPluginLoaded = false;
                reject(err, s);
              };

              s.onload = s.onreadystatechange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _err;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!(!r && (!this.readyState || this.readyState == 'complete'))) {
                          _context5.next = 13;
                          break;
                        }

                        if (typeof JCWebClient2 === 'undefined') {
                          _this.isPluginInstalled = false;
                          _this.isPluginLoaded = false;
                          reject(_classPrivateMethodGet(_this, _handleError, _handleError2).call(_this, 1, ((_err = err) === null || _err === void 0 ? void 0 : _err.message) || err, 'loadJC'), s);
                        }

                        r = true;
                        _this.isPluginInstalled = true;
                        _this.isPluginLoaded = true;

                        _classPrivateFieldSet(_this, _plugin, JCWebClient2);

                        _classPrivateMethodGet(_this, _addListener, _addListener2).call(_this);

                        _classPrivateFieldGet(_this, _plugin).initialize();

                        _classPrivateMethodGet(_this, _initialize, _initialize2).call(_this);

                        _context5.next = 11;
                        return _classPrivateFieldGet(_this, _plugin).getJCWebClientVersion();

                      case 11:
                        _this.pluginVersion = _context5.sent;
                        resolve();

                      case 13:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              }));
              var t = document.getElementsByTagName('script')[0];
              t.parentElement.insertBefore(s, t);
            }));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _loadJC3.apply(this, arguments);
}

function _addListener2() {
  var _this2 = this;

  _classPrivateFieldGet(this, _plugin).addEventListener("slotAdded", function (slotID) {
    _classPrivateMethodGet(_this2, _handleSlotAdded, _handleSlotAdded2).call(_this2, "Slot has been added: " + slotID);
  });
}

function _handleSlotAdded2(input) {
  console.log(input);
  this.reloadDevices();
  if (typeof _classPrivateFieldGet(this, _callback) === 'function') _classPrivateFieldGet(this, _callback).call(this, input);
}

function _initialize2() {
  var _this3 = this;

  try {
    var allDevices = _classPrivateFieldGet(this, _plugin).getAllSlots();

    for (var index = 0; index < allDevices.length; index++) {
      _classPrivateFieldGet(this, _deviceList).push(allDevices[index].id);
    }

    _classPrivateFieldGet(this, _deviceList).forEach(function (element) {
      var tempCerts = [];

      var certificate = _classPrivateFieldGet(_this3, _plugin).getContainerList({
        args: {
          tokenID: element
        }
      });

      for (var j = 0; j < certificate.length; j++) {
        _classPrivateFieldGet(_this3, _certList).push(certificate[j].id);

        tempCerts.push(certificate[j].id);
      }

      _classPrivateFieldGet(_this3, _deviceMap).set(element, tempCerts);
    });

    var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _deviceMap)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        for (var j = 0; j < value.length; j++) {
          _classPrivateMethodGet(this, _getCertificateInfo, _getCertificateInfo2).call(this, key, value[j]);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } catch (reason) {
    throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 1, reason.message || reason, 'initialize');
  }
}

function _getCertificateInfo2(deviceId, certificateId) {
  var prepocessedCertificate;

  try {
    _classPrivateFieldSet(this, _selectedCertificate, {
      "deviceId": deviceId,
      "certificateId": certificateId
    });

    var certificate = _classPrivateFieldGet(this, _plugin).parseX509Certificate({
      args: {
        tokenID: deviceId,
        id: certificateId
      }
    });

    prepocessedCertificate = _classPrivateMethodGet(this, _preprocessCertificate, _preprocessCertificate2).call(this, certificate);
  } catch (reason) {
    if (reason.method) throw reason;
    throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 1, reason.message || reason, 'getCertificateInfo');
  }

  return _classPrivateMethodGet(this, _parseCertificate, _parseCertificate2).call(this, prepocessedCertificate);
}

function _preprocessCertificate2(certificate) {
  var res = {},
      parts = {},
      sLength = certificate.Data.Subject.length,
      iLength = certificate.Data.Issuer.length,
      i = 0,
      j = 0;
  res.issuer = {};
  res.subject = {};

  for (; i < sLength; i++) {
    parts = certificate.Data.Subject[i];

    switch (parts.rdn) {
      case "1.2.643.100.3":
        res.subject["SNILS"] = parts.value;
        break;

      case "1.2.643.100.1":
        res.subject["OGRN"] = parts.value;
        break;

      case "1.2.643.3.131.1.1":
        res.subject["INN"] = parts.value;
        break;

      case "1.2.643.100.5":
        res.subject["OGRNIP"] = parts.value;
        break;

      case "1.2.643.100.4":
        res.subject["INNLE"] = parts.value;
        break;

      default:
        res.subject[parts.rdn] = parts.value;
    }
  }

  for (; j < iLength; j++) {
    parts = certificate.Data.Issuer[j];
    res.issuer[parts.rdn] = parts.value;
  }

  res.date = {
    from: certificate['Data']['Validity']['Not Before'],
    to: certificate['Data']['Validity']['Not After']
  };
  res.serial = JSON.stringify(certificate['Data']['Serial Number']);
  res.signatureAlgoritm = certificate['Signature Algorithm'];
  return res;
}

function _parseCertificate2(certificate) {
  var subjectString = '',
      issuerString = '';

  var inn = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'INN'),
      innLe = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'INNLE') || inn,
      ogrnip = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'OGRNIP'),
      ogrn = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'OGRN'),
      snils = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'SNILS'),
      surname = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'SN'),
      nameAndPatronymic = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'GN'),
      issuerCN = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.issuer, 'CN'),
      ownerCN = _classPrivateMethodGet(this, _getValueFromCertificate, _getValueFromCertificate2).call(this, certificate.subject, 'CN');

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

  var now = new Date();

  var preparedSerialNumber = _classPrivateMethodGet(this, _bufferSerialToHex, _bufferSerialToHex2).call(this, certificate.serial);

  var parsedCertificate = {
    ValidToDate: certificate.date.to,
    ValidFromDate: certificate.date.from,
    SubjectName: subjectString,
    IssuerName: issuerString,
    Thumbprint: '',
    id: _classPrivateFieldGet(this, _selectedCertificate).certificateId,
    IsValid: now >= certificate.date.from && now <= certificate.date.to,
    HasPrivateKey: true,
    serial: preparedSerialNumber,
    b64: _classPrivateMethodGet(this, _getCertificateInPem, _getCertificateInPem2).call(this, _classPrivateFieldGet(this, _selectedCertificate).deviceId, _classPrivateFieldGet(this, _selectedCertificate).certificateId),
    deviceId: _classPrivateFieldGet(this, _selectedCertificate).deviceId
  };
  var isFoundParsed = false;

  for (var k = 0; k < this.parsedCertificates.length; k++) {
    var parsedTemp = this.parsedCertificates[k];
    if (_classPrivateMethodGet(this, _deepEqual, _deepEqual2).call(this, parsedTemp, parsedCertificate)) isFoundParsed = true;
  }

  if (!isFoundParsed) this.parsedCertificates.push(parsedCertificate);
}

function _bufferSerialToHex2(serial) {
  var serialString = serial.replace(/(\[|\]|\s)/g, '');
  var serialArray = serialString.split(',').map(function (v) {
    return +v;
  });
  var resultHex = new Buffer(serialArray).toString('hex').toUpperCase();
  return resultHex;
}

function _getValueFromCertificate2(certificate, key) {
  if (typeof certificate[key] != "undefined") {
    return certificate[key];
  }

  return '';
}

function _getCertificateInPem2(deviceId, certificateId) {
  try {
    var certInBase64 = _classPrivateMethodGet(this, _certFromBytesToBase, _certFromBytesToBase2).call(this, _classPrivateFieldGet(this, _plugin).getCertificateBody({
      args: {
        tokenID: deviceId,
        id: certificateId
      }
    }));

    var lineBreak = '\n';
    var count = 0;

    for (var i = 64; i <= certInBase64.length; i += 64 + count) {
      certInBase64 = [certInBase64.slice(0, i), lineBreak, certInBase64.slice(i)].join('');
      count = 1;
    }

    var begin = '-----BEGIN CERTIFICATE-----\n';
    var end = '\n-----END CERTIFICATE-----';
    return begin + certInBase64 + end;
  } catch (err) {
    throw _classPrivateMethodGet(this, _handleError, _handleError2).call(this, 1, err.message || err, 'getCertificateInPem');
  }
}

function _deepEqual2(object1, object2) {
  var keys1 = Object.keys(object1);
  var keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (var _i2 = 0, _keys = keys1; _i2 < _keys.length; _i2++) {
    var key = _keys[_i2];
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

function _handleError2(code, message, method) {
  var error = {
    code: code,
    description: 'Неизвестная ошибка',
    message: message,
    method: method,
    cryptoDriverType: 3
  };

  switch (code) {
    case 2:
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
        case "CKR_FUNCTION_CANCELED":
          error.description = "Операция отменена";
          error.code = 7;
          break;

        case "CKR_PIN_LEN_RANGE":
          error.description = "Введен PIN-код некорректной длины";
          error.code = 8;
          break;

        case "CKR_PIN_INCORRECT":
          error.description = "Введен некорректный PIN-код";
          error.code = 9;
          break;

        case "CKR_SIGNATURE_PIN_INCORRECT":
          error.description = "Введен некорректный PIN-код подписи";
          error.code = 10;
          break;

        case "NOT_STATE_NOT_BINDED":
          error.code = 11;
          error.description = "Для выполнения операции нужно \"отвязать\" токен";
          break;

        case "CKR_HOST_MEMORY":
          error.description = "Недостаточно памяти для выполнения функции";
          error.code = 13;
          break;

        case "CERTIFICATE_NOT_FOUND":
          error.description = "сертификат не обнаружен";
          error.code = 14;
          break;

        case "USER_CANCELED_PIN":
          error.description = "Пользователь отменил ввод пин кода";
          error.code = 15;
          break;

        default:
          error.code = 1;
          break;
      }

      break;
  }

  return error;
}

function _bytesToBase2(arrayBuffer) {
  return btoa(new Uint8Array(arrayBuffer).reduce(function (data, _byte) {
    return data + String.fromCharCode(_byte);
  }, '')); // return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
  // return btoa(String.fromCharCode(arrayBuffer));
}

function _certFromBytesToBase2(arrayBuffer) {
  return btoa(String.fromCharCode.apply(String, _toConsumableArray(new Uint32Array(arrayBuffer))));
}