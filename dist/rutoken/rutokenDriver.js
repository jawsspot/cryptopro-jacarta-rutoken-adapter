var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RutokenDriver_instances, _RutokenDriver_rutoken, _RutokenDriver_plugin, _RutokenDriver_deviceList, _RutokenDriver_deviceMap, _RutokenDriver_certList, _RutokenDriver_errors, _RutokenDriver_selectedCertificate, _RutokenDriver__keyStr, _RutokenDriver_stringVersionCompare, _RutokenDriver_getLastRtPluginVersion, _RutokenDriver_initialize, _RutokenDriver_getAllDevices, _RutokenDriver_getAllCertificates, _RutokenDriver_getCertificateInfo, _RutokenDriver_parseCertificate, _RutokenDriver_getValueFromCertificate, _RutokenDriver_getDate, _RutokenDriver_isIe8, _RutokenDriver_bindToken, _RutokenDriver_loadErrorCodes, _RutokenDriver_deepEqual, _RutokenDriver_isObject, _RutokenDriver_encode, _RutokenDriver_utf8_encode, _RutokenDriver_bytesToBase64, _RutokenDriver_handleError;
import { rutoken } from "./rutoken.js";
export class RutokenDriver {
    constructor() {
        _RutokenDriver_instances.add(this);
        _RutokenDriver_rutoken.set(this, void 0);
        _RutokenDriver_plugin.set(this, void 0);
        this.isPluginInstalled = false;
        this.isPluginLoaded = false;
        _RutokenDriver_deviceList.set(this, []);
        _RutokenDriver_deviceMap.set(this, new Map());
        _RutokenDriver_certList.set(this, []);
        this.parsedCertificates = [];
        _RutokenDriver_errors.set(this, []);
        _RutokenDriver_selectedCertificate.set(this, void 0);
        _RutokenDriver__keyStr.set(this, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
        __classPrivateFieldSet(this, _RutokenDriver_rutoken, rutoken, "f");
    }
    isActualVersionPlugin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _this = this;
                let currentPluginVersion;
                yield new Promise(function (resolve, reject) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://download.rutoken.ru/Rutoken_Plugin/Current/version.txt', true);
                    xhr.onreadystatechange = function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    this['actualVersion'] = xhr.responseText.split('Version: v.')[1].split('Release')[0].replace(/\s+/g, '');
                                    resolve(void 0);
                                }
                                reject(__classPrivateFieldGet(_this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(_this, 5, `Ошибка при запросе актуальной версии плагина`, 'isActualVersionPlugin'));
                            }
                        });
                    };
                    xhr.send();
                });
                currentPluginVersion = __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").version.toString();
                return {
                    cryptoDriverType: 2,
                    isActualVersion: __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_stringVersionCompare).call(this, this.lastPluginVersion, currentPluginVersion),
                    currentVersion: currentPluginVersion,
                    actualVersion: this.lastPluginVersion
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
    loadPlugin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPluginLoaded)
                return;
            try {
                let isRutokenReady;
                yield __classPrivateFieldGet(this, _RutokenDriver_rutoken, "f").ready;
                if (window.chrome || typeof window.InstallTrigger !== 'undefined') {
                    isRutokenReady = yield __classPrivateFieldGet(this, _RutokenDriver_rutoken, "f").isExtensionInstalled();
                }
                else {
                    isRutokenReady = true;
                }
                if (isRutokenReady) {
                    this.isPluginInstalled = yield __classPrivateFieldGet(this, _RutokenDriver_rutoken, "f").isPluginInstalled();
                }
                if (!this.isPluginInstalled)
                    return;
                __classPrivateFieldSet(this, _RutokenDriver_plugin, yield __classPrivateFieldGet(this, _RutokenDriver_rutoken, "f").loadPlugin(), "f");
                __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_loadErrorCodes).call(this);
                yield __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_initialize).call(this);
                yield __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getLastRtPluginVersion).call(this);
                if (__classPrivateFieldGet(this, _RutokenDriver_plugin, "f"))
                    this.isPluginLoaded = true;
            }
            catch (reason) {
                if (reason.method)
                    throw reason;
                console.log(__classPrivateFieldGet(this, _RutokenDriver_errors, "f")[reason.message]);
                throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 6, __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[reason.message] || reason.message, 'loadPlugin');
            }
        });
    }
    reloadDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                __classPrivateFieldSet(this, _RutokenDriver_certList, [], "f");
                __classPrivateFieldSet(this, _RutokenDriver_deviceList, [], "f");
                __classPrivateFieldGet(this, _RutokenDriver_deviceMap, "f").clear;
                this.parsedCertificates = [];
                yield __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_initialize).call(this);
            }
            catch (reason) {
                if (reason.method)
                    throw reason;
                console.log(__classPrivateFieldGet(this, _RutokenDriver_errors, "f")[reason.message]);
                throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 3, __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[reason.message] || reason.message, 'reloadDevices');
            }
        });
    }
    signCMS(data, certificateId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataToSign;
            let CMS;
            const options = {
                "detached": true,
                "addSignTime": true
            };
            try {
                // Получение текста для подписи
                if (data.length == 0) {
                    console.log("Data to sign is null");
                    return;
                }
                if (typeof data === 'object') {
                    dataToSign = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_bytesToBase64).call(this, data);
                }
                else {
                    dataToSign = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_encode).call(this, data);
                }
                console.log('before  bindToken if');
                if (!(yield __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_bindToken).call(this, deviceId))) {
                    console.log('return from bindToken if');
                    return;
                }
                CMS = yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").sign(deviceId, certificateId, dataToSign, __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").DATA_FORMAT_BASE64, options);
                console.log(CMS);
                // Закрытие сессии
                yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").logout(deviceId);
            }
            catch (reason) {
                if (reason.code === 10) {
                    throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 2, reason.message, 'signCMS');
                }
                throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 2, __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[reason.message] || reason.message, 'signCMS');
            }
            return CMS;
        });
    }
}
_RutokenDriver_rutoken = new WeakMap(), _RutokenDriver_plugin = new WeakMap(), _RutokenDriver_deviceList = new WeakMap(), _RutokenDriver_deviceMap = new WeakMap(), _RutokenDriver_certList = new WeakMap(), _RutokenDriver_errors = new WeakMap(), _RutokenDriver_selectedCertificate = new WeakMap(), _RutokenDriver__keyStr = new WeakMap(), _RutokenDriver_instances = new WeakSet(), _RutokenDriver_stringVersionCompare = function _RutokenDriver_stringVersionCompare(actualVersion, currentPluginVersion) {
    const actual = actualVersion.split('.');
    const current = currentPluginVersion.split('.');
    let isActual = true;
    for (let i = 0; i < (Math.min(actual.length, current.length)); i++) {
        if (parseInt(current[i]) < parseInt(actual[i])) {
            isActual = false;
            break;
        }
    }
    return isActual;
}, _RutokenDriver_getLastRtPluginVersion = function _RutokenDriver_getLastRtPluginVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        let _this = this;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://download.rutoken.ru/Rutoken_Plugin/Current/version.txt', true);
        xhr.onreadystatechange = function () {
            return __awaiter(this, void 0, void 0, function* () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    _this.lastPluginVersion = yield this.response.split('Version: v.')[1].split('Release')[0].replace(/\s+/g, '');
                }
            });
        };
        xhr.send();
    });
}, _RutokenDriver_initialize = function _RutokenDriver_initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getAllDevices).call(this);
        yield __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getAllCertificates).call(this);
        for (var [key, value] of __classPrivateFieldGet(this, _RutokenDriver_deviceMap, "f")) {
            for (let j = 0; j < value.length; j++) {
                yield __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getCertificateInfo).call(this, key, value[j]);
            }
        }
    });
}, _RutokenDriver_getAllDevices = function _RutokenDriver_getAllDevices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            __classPrivateFieldSet(this, _RutokenDriver_deviceList, yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").enumerateDevices(), "f");
            return __classPrivateFieldGet(this, _RutokenDriver_deviceList, "f");
        }
        catch (e) {
            throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 3, __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[e.message] || e.message, 'getAllDevices');
        }
    });
}, _RutokenDriver_getAllCertificates = function _RutokenDriver_getAllCertificates() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!__classPrivateFieldGet(this, _RutokenDriver_deviceList, "f").length)
                return;
            for (let i = 0; i < __classPrivateFieldGet(this, _RutokenDriver_deviceList, "f").length; i++) {
                let certificate = yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").enumerateCertificates(__classPrivateFieldGet(this, _RutokenDriver_deviceList, "f")[i], __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").CERT_CATEGORY_USER);
                __classPrivateFieldGet(this, _RutokenDriver_deviceMap, "f").set(__classPrivateFieldGet(this, _RutokenDriver_deviceList, "f")[i], certificate);
                __classPrivateFieldGet(this, _RutokenDriver_certList, "f").push(certificate);
            }
            return __classPrivateFieldGet(this, _RutokenDriver_certList, "f");
        }
        catch (e) {
            throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 4, __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[e.message] || e.message, 'getAllCertificates');
        }
    });
}, _RutokenDriver_getCertificateInfo = function _RutokenDriver_getCertificateInfo(deviceId, certificateId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            __classPrivateFieldSet(this, _RutokenDriver_selectedCertificate, { "deviceId": deviceId, "certificateId": certificateId }, "f");
            const certificate = yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").parseCertificate(deviceId, certificateId);
            return __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_parseCertificate).call(this, certificate);
        }
        catch (e) {
            if (e.method)
                throw e;
            throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 4, __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[e.message] || e.message, 'getAllCertificates');
        }
    });
}, _RutokenDriver_parseCertificate = function _RutokenDriver_parseCertificate(certificate) {
    return __awaiter(this, void 0, void 0, function* () {
        let inn = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'INN'), ogrnip = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'OGRNIP'), ogrn = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'OGRN'), snils = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'SNILS'), surname = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'surname'), nameAndPatronymic = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'givenName'), issuerCN = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.issuer, 'commonName'), ownerCN = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'commonName'), innLe = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getValueFromCertificate).call(this, certificate.subject, 'INNLE') || inn, subjectString = '', issuerString = '';
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
        let now = new Date();
        let certPem = yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").getCertificate(__classPrivateFieldGet(this, _RutokenDriver_selectedCertificate, "f").deviceId, __classPrivateFieldGet(this, _RutokenDriver_selectedCertificate, "f").certificateId);
        let parsedCertificate = {
            ValidToDate: __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getDate).call(this, certificate.validNotAfter),
            ValidFromDate: __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getDate).call(this, certificate.validNotBefore),
            SubjectName: subjectString,
            IssuerName: issuerString,
            id: __classPrivateFieldGet(this, _RutokenDriver_selectedCertificate, "f").certificateId,
            IsValid: now <= __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getDate).call(this, certificate.validNotAfter) && now >= __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_getDate).call(this, certificate.validNotBefore),
            HasPrivateKey: true,
            serial: certificate.serialNumber,
            b64: certPem,
            Thumbprint: __classPrivateFieldGet(this, _RutokenDriver_selectedCertificate, "f").certificateId.replace(/:/g, '').toUpperCase(),
            deviceId: __classPrivateFieldGet(this, _RutokenDriver_selectedCertificate, "f").deviceId
        };
        let isFoundParsed = false;
        for (let k = 0; k < this.parsedCertificates.length; k++) {
            let parsedTemp = this.parsedCertificates[k];
            if (__classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_deepEqual).call(this, parsedTemp, parsedCertificate))
                isFoundParsed = true;
        }
        if (!isFoundParsed)
            this.parsedCertificates.push(parsedCertificate);
        return parsedCertificate;
    });
}, _RutokenDriver_getValueFromCertificate = function _RutokenDriver_getValueFromCertificate(arr, key) {
    let i = 0, cnt = arr.length;
    for (; i < cnt; i++) {
        if (arr[i].rdn == key) {
            return arr[i].value;
        }
    }
    return '';
}, _RutokenDriver_getDate = function _RutokenDriver_getDate(date) {
    if (__classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_isIe8).call(this)) {
        date = date.replace(/-/g, '/').replace('T', ' ');
    }
    return new Date(date);
}, _RutokenDriver_isIe8 = function _RutokenDriver_isIe8() {
    let na = navigator.userAgent.toLowerCase(), isIE = !/opera/.test(na) && /msie/.test(na), docMode = document.documentMode;
    return isIE && (/msie 8/.test(na) && docMode != 7 && docMode != 9 || docMode == 8);
}, _RutokenDriver_bindToken = function _RutokenDriver_bindToken(deviceId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let isLoggedIn = yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").getDeviceInfo(deviceId, __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").TOKEN_INFO_IS_LOGGED_IN);
            if (isLoggedIn)
                return true;
            yield __classPrivateFieldGet(this, _RutokenDriver_plugin, "f").login(deviceId, prompt("Введите pin"));
            return true;
        }
        catch (e) {
            throw __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_handleError).call(this, 2, (_a = __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[e.message]) !== null && _a !== void 0 ? _a : e, 'bindToken');
        }
    });
}, _RutokenDriver_loadErrorCodes = function _RutokenDriver_loadErrorCodes() {
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.UNKNOWN_ERROR] = "Неизвестная ошибка";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.BAD_PARAMS] = "Неправильные параметры";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.NOT_ENOUGH_MEMORY] = "Недостаточно памяти";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.DEVICE_NOT_FOUND] = "Устройство не найдено";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.DEVICE_ERROR] = "Ошибка устройства";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.TOKEN_INVALID] = "Ошибка чтения/записи устройства. Возможно, устройство было извлечено. %device-step%";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.CERTIFICATE_CATEGORY_BAD] = "Недопустимый тип сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.CERTIFICATE_EXISTS] = "Сертификат уже существует на устройстве";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.CERTIFICATE_NOT_FOUND] = "Сертификат не найден";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.CERTIFICATE_HASH_NOT_UNIQUE] = "Хэш сертификата не уникален";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.CA_CERTIFICATES_NOT_FOUND] = "Корневые сертификаты не найдены";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.CERTIFICATE_VERIFICATION_ERROR] = "Ошибка проверки сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.PKCS11_LOAD_FAILED] = "Не удалось загрузить PKCS#11 библиотеку";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.PIN_LENGTH_INVALID] = "Некорректная длина PIN-кода";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.PIN_INCORRECT] = "Некорректный PIN-код";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.PIN_LOCKED] = "PIN-код заблокирован";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.PIN_CHANGED] = "PIN-код был изменен";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.SESSION_INVALID] = "Состояние токена изменилось";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.USER_NOT_LOGGED_IN] = "Выполните вход на устройство";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.ALREADY_LOGGED_IN] = "Вход на устройство уже был выполнен";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.ATTRIBUTE_READ_ONLY] = "Свойство не может быть изменено";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.KEY_NOT_FOUND] = "Соответствующая сертификату ключевая пара не найдена";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.KEY_ID_NOT_UNIQUE] = "Идентификатор ключевой пары не уникален";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.CEK_NOT_AUTHENTIC] = "Выбран неправильный ключ";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.KEY_LABEL_NOT_UNIQUE] = "Метка ключевой пары не уникальна";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.WRONG_KEY_TYPE] = "Неправильный тип ключа";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.LICENCE_READ_ONLY] = "Лицензия доступна только для чтения";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.DATA_INVALID] = "Неверные данные";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.UNSUPPORTED_BY_TOKEN] = "Операция не поддерживается токеном";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.KEY_FUNCTION_NOT_PERMITTED] = "Операция запрещена для данного типа ключа";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.BASE64_DECODE_FAILED] = "Ошибка декодирования даных из BASE64";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.PEM_ERROR] = "Ошибка разбора PEM";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.ASN1_ERROR] = "Ошибка декодирования ASN1 структуры";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.FUNCTION_REJECTED] = "Операция отклонена пользователем";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.FUNCTION_FAILED] = "Невозможно выполнить операцию";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT] = "Невозможно получить сертификат подписанта";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_GET_CRL] = "Невозможно получить CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_DECRYPT_CERT_SIGNATURE] = "Невозможно расшифровать подпись сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_DECRYPT_CRL_SIGNATURE] = "Невозможно расшифровать подпись CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY] = "Невозможно раскодировать открытый ключ эмитента";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CERT_SIGNATURE_FAILURE] = "Неверная подпись сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CRL_SIGNATURE_FAILURE] = "Неверная подпись CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CERT_NOT_YET_VALID] = "Срок действия сертификата еще не начался";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CRL_NOT_YET_VALID] = "Срок действия CRL еще не начался";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CERT_HAS_EXPIRED] = "Срок действия сертификата истек";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CRL_HAS_EXPIRED] = "Срок действия CRL истек";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_ERROR_IN_CERT_NOT_BEFORE_FIELD] = "Некорректные данные в поле \"notBefore\" у сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_ERROR_IN_CERT_NOT_AFTER_FIELD] = "Некорректные данные в поле \"notAfter\" у сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_ERROR_IN_CRL_LAST_UPDATE_FIELD] = "Некорректные данные в поле \"lastUpdate\" у CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_ERROR_IN_CRL_NEXT_UPDATE_FIELD] = "Некорректные данные в поле \"nextUpdate\" у CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_OUT_OF_MEM] = "Нехватает памяти";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_DEPTH_ZERO_SELF_SIGNED_CERT] = "Недоверенный самоподписанный сертификат";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_SELF_SIGNED_CERT_IN_CHAIN] = "В цепочке обнаружен недоверенный самоподписанный сертификат";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT_LOCALLY] = "Невозможно получить локальный сертификат подписанта";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_VERIFY_LEAF_SIGNATURE] = "Невозможно проверить первый сертификат";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CERT_CHAIN_TOO_LONG] = "Слишком длинная цепочка сертификатов";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CERT_REVOKED] = "Сертификат отозван";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_INVALID_CA] = "Неверный корневой сертификат";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_INVALID_NON_CA] = "Неверный некорневой сертфикат, помеченный как корневой";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_PATH_LENGTH_EXCEEDED] = "Превышена длина пути";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_PROXY_PATH_LENGTH_EXCEEDED] = "Превышина длина пути прокси";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_PROXY_CERTIFICATES_NOT_ALLOWED] = "Проксирующие сертификаты недопустимы";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_INVALID_PURPOSE] = "Неподдерживаемое назначение сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CERT_UNTRUSTED] = "Недоверенный сертификат";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CERT_REJECTED] = "Сертифкат отклонен";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_APPLICATION_VERIFICATION] = "Ошибка проверки приложения";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_SUBJECT_ISSUER_MISMATCH] = "Несовпадения субъекта и эмитента";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_AKID_SKID_MISMATCH] = "Несовпадение идентификатора ключа у субьекта и доверенного центра";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_AKID_ISSUER_SERIAL_MISMATCH] = "Несовпадение серийного номера субьекта и доверенного центра";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_KEYUSAGE_NO_CERTSIGN] = "Ключ не может быть использован для подписи сертификатов";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNABLE_TO_GET_CRL_ISSUER] = "Невозможно получить CRL подписанта";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNHANDLED_CRITICAL_EXTENSION] = "Неподдерживаемое расширение";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_KEYUSAGE_NO_CRL_SIGN] = "Ключ не может быть использован для подписи CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_KEYUSAGE_NO_DIGITAL_SIGNATURE] = "Ключ не может быть использован для цифровой подписи";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNHANDLED_CRITICAL_CRL_EXTENSION] = "Неподдерживаемое расширение CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_INVALID_EXTENSION] = "Неверное или некорректное расширение сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_INVALID_POLICY_EXTENSION] = "Неверное или некорректное расширение политик сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_NO_EXPLICIT_POLICY] = "Явные политики отсутствуют";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_DIFFERENT_CRL_SCOPE] = "Другая область CRL";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNSUPPORTED_EXTENSION_FEATURE] = "Неподдерживаемое расширение возможностей";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNNESTED_RESOURCE] = "RFC 3779 неправильное наследование ресурсов";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_PERMITTED_VIOLATION] = "Неправильная структура сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_EXCLUDED_VIOLATION] = "Неправильная структура сертфиката";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_SUBTREE_MINMAX] = "Неправильная структура сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNSUPPORTED_CONSTRAINT_TYPE] = "Неправильная структура сертфиката";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNSUPPORTED_CONSTRAINT_SYNTAX] = "Неправильная структура сертификата";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_UNSUPPORTED_NAME_SYNTAX] = "Неправильная структура сертфиката";
    __classPrivateFieldGet(this, _RutokenDriver_errors, "f")[__classPrivateFieldGet(this, _RutokenDriver_plugin, "f").errorCodes.X509_CRL_PATH_VALIDATION_ERROR] = "Неправильный путь CRL";
}, _RutokenDriver_deepEqual = function _RutokenDriver_deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_isObject).call(this, val1) && __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_isObject).call(this, val2);
        if (areObjects && !__classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_deepEqual).call(this, val1, val2) ||
            !areObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}, _RutokenDriver_isObject = function _RutokenDriver_isObject(object) {
    return object != null && typeof object === 'object';
}, _RutokenDriver_encode = function _RutokenDriver_encode(input) {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = __classPrivateFieldGet(this, _RutokenDriver_instances, "m", _RutokenDriver_utf8_encode).call(this, input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + __classPrivateFieldGet(this, _RutokenDriver__keyStr, "f").charAt(enc1) + __classPrivateFieldGet(this, _RutokenDriver__keyStr, "f").charAt(enc2) + __classPrivateFieldGet(this, _RutokenDriver__keyStr, "f").charAt(enc3) + __classPrivateFieldGet(this, _RutokenDriver__keyStr, "f").charAt(enc4);
    }
    return output;
}, _RutokenDriver_utf8_encode = function _RutokenDriver_utf8_encode(input) {
    let string = input.replace(/\r\n/g, "\n");
    let utftext = "";
    for (let n = 0; n < string.length; n++) {
        let c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}, _RutokenDriver_bytesToBase64 = function _RutokenDriver_bytesToBase64(arrayBuffer) {
    return btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    // return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
    // return btoa(String.fromCharCode(arrayBuffer));
}, _RutokenDriver_handleError = function _RutokenDriver_handleError(code, message, method) {
    let error = {
        code,
        description: 'Неизвестная ошибка',
        message,
        method,
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
};
//# sourceMappingURL=rutokenDriver.js.map