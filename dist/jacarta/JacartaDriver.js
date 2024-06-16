var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JacartaDriver_instances, _JacartaDriver_loadJC, _JacartaDriver_addListener, _JacartaDriver_handleSlotAdded, _JacartaDriver_initialize, _JacartaDriver_getCertificateInfo, _JacartaDriver_preprocessCertificate, _JacartaDriver_parseCertificate, _JacartaDriver_deepEqual, _JacartaDriver_encode, _JacartaDriver_utf8_encode, _JacartaDriver_handleError, _JacartaDriver_bytesToBase64;
export class JacartaDriver {
    constructor() {
        _JacartaDriver_instances.add(this);
        this.parsedCertificates = [];
        this.isPluginInstalled = false;
        this.isPluginLoaded = false;
        this._deviceList = [];
        this._deviceMap = new Map();
        this._certList = [];
        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }
    isActualVersionPlugin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let actualVersion = '4.3.2';
                let currentPluginVersion = yield this.pluginVersion;
                return {
                    cryptoDriverType: 3,
                    isActualVersion: this._stringVersionCompare(actualVersion, currentPluginVersion),
                    currentVersion: currentPluginVersion,
                    actualVersion: actualVersion
                };
            }
            catch (err) {
                throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 5, err.message, 'isActualVersionPlugin');
            }
        });
    }
    loadPlugin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPluginLoaded)
                return;
            try {
                yield __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_loadJC).call(this);
            }
            catch (err) {
                throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 6, err.message, 'loadPlugin');
            }
        });
    }
    reloadDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._certList = [];
                this._deviceList = [];
                this._deviceMap.clear;
                this.parsedCertificates = [];
                __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_initialize).call(this);
            }
            catch (err) {
                if (err.method)
                    throw err;
                throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 1, err.message, 'reloadDevices');
            }
        });
    }
    addCallback(cb) {
        this._callback = cb;
    }
    signCMS(data, certificateId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            let CMS;
            let isBinded = false;
            let loggedInToken = this._plugin.getLoggedInState();
            let dataToSign;
            if (loggedInToken.tokenID != deviceId || loggedInToken.state == 0) {
                if (!isBinded) {
                    try {
                        this._plugin.bindToken({ args: { tokenID: deviceId, useUI: true } });
                    }
                    catch (reason) {
                        throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 2, reason.message, 'signCMS');
                    }
                }
            }
            try {
                if (typeof data === 'object') {
                    dataToSign = __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_bytesToBase64).call(this, data);
                }
                else {
                    dataToSign = __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_encode).call(this, data);
                }
                CMS = this._plugin.signBase64EncodedData({
                    args: {
                        contID: certificateId,
                        data: dataToSign,
                        attachedSignature: false,
                        addSigningTime: true
                    }
                });
            }
            catch (reason) {
                if (reason.method)
                    throw reason;
                throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 2, reason.message, 'signCMS');
            }
            console.log(CMS);
            return CMS;
        });
    }
    _stringVersionCompare(actualVersion, currentPluginVersion) {
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
    }
    _bufferSerialToHex(serial) {
        const serialString = serial.replace(/(\[|\]|\s)/g, '');
        const serialArray = serialString.split(',').map(v => +v);
        const resultHex = Buffer.from(serialArray).toString('hex').toUpperCase();
        return resultHex;
    }
    _getValueFromCertificate(certificate, key) {
        if (typeof certificate[key] != "undefined") {
            return certificate[key];
        }
        return '';
    }
    _getCertificateInPem(deviceId, certificateId) {
        try {
            let certInBase64 = this._certFromBytesToBase64(this._plugin.getCertificateBody({ args: { tokenID: deviceId, id: certificateId } }));
            const lineBreak = '\n';
            let count = 0;
            for (let i = 64; i <= certInBase64.length; i += 64 + count) {
                certInBase64 = [certInBase64.slice(0, i), lineBreak, certInBase64.slice(i)].join('');
                count = 1;
            }
            const begin = '-----BEGIN CERTIFICATE-----\n';
            const end = '\n-----END CERTIFICATE-----';
            return begin + certInBase64 + end;
        }
        catch (err) {
            throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 1, err.message || err, 'getCertificateInPem');
        }
    }
    _isObject(object) {
        return object != null && typeof object === 'object';
    }
    _certFromBytesToBase64(arrayBuffer) {
        return btoa(String.fromCharCode(...new Uint32Array(arrayBuffer)));
    }
}
_JacartaDriver_instances = new WeakSet(), _JacartaDriver_loadJC = function _JacartaDriver_loadJC() {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        return new Promise(function (resolve, reject) {
            const s = document.createElement('script');
            let r = false;
            s.type = 'text/javascript';
            s.src = 'https://localhost:24738/JCWebClient.js';
            s.async = true;
            s.onerror = function (err) {
                _this.isPluginInstalled = false;
                _this.isPluginLoaded = false;
                reject(err);
            };
            s.onload = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!r && (!document.readyState || document.readyState == 'complete')) {
                        if (typeof (JCWebClient2) === 'undefined') {
                            _this.isPluginInstalled = false;
                            _this.isPluginLoaded = false;
                            reject();
                        }
                        r = true;
                        _this.isPluginInstalled = true;
                        _this.isPluginLoaded = true;
                        _this._plugin = JCWebClient2;
                        __classPrivateFieldGet(_this, _JacartaDriver_instances, "m", _JacartaDriver_addListener).call(_this);
                        _this._plugin.initialize();
                        __classPrivateFieldGet(_this, _JacartaDriver_instances, "m", _JacartaDriver_initialize).call(_this);
                        _this.pluginVersion = yield _this._plugin.getJCWebClientVersion();
                        resolve();
                    }
                });
            };
            const t = document.getElementsByTagName('script')[0];
            t.parentElement.insertBefore(s, t);
        });
    });
}, _JacartaDriver_addListener = function _JacartaDriver_addListener() {
    this._plugin.addEventListener("slotAdded", (slotID) => {
        __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleSlotAdded).call(this, "Slot has been added: " + slotID);
    });
}, _JacartaDriver_handleSlotAdded = function _JacartaDriver_handleSlotAdded(input) {
    console.log(input);
    this.reloadDevices();
    if (typeof this._callback === 'function')
        this._callback(input);
}, _JacartaDriver_initialize = function _JacartaDriver_initialize() {
    try {
        const allDevices = this._plugin.getAllSlots();
        for (let index = 0; index < allDevices.length; index++) {
            this._deviceList.push(allDevices[index].id);
        }
        this._deviceList.forEach(element => {
            let tempCerts = [];
            let certificate = this._plugin.getContainerList({ args: { tokenID: element } });
            for (let j = 0; j < certificate.length; j++) {
                this._certList.push(certificate[j].id);
                tempCerts.push(certificate[j].id);
            }
            this._deviceMap.set(element, tempCerts);
        });
        for (var [key, value] of this._deviceMap) {
            for (let j = 0; j < value.length; j++) {
                __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_getCertificateInfo).call(this, key, value[j]);
            }
        }
    }
    catch (reason) {
        throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 1, reason.message || reason, 'initialize');
    }
}, _JacartaDriver_getCertificateInfo = function _JacartaDriver_getCertificateInfo(deviceId, certificateId) {
    let prepocessedCertificate;
    try {
        this._selectedCertificate = { "deviceId": deviceId, "certificateId": certificateId };
        const certificate = this._plugin.parseX509Certificate({ args: { tokenID: deviceId, id: certificateId } });
        prepocessedCertificate = __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_preprocessCertificate).call(this, certificate);
    }
    catch (reason) {
        if (reason.method)
            throw reason;
        throw __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_handleError).call(this, 1, reason.message || reason, 'getCertificateInfo');
    }
    return __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_parseCertificate).call(this, prepocessedCertificate);
}, _JacartaDriver_preprocessCertificate = function _JacartaDriver_preprocessCertificate(certificate) {
    let res = {}, parts = {}, sLength = certificate.Data.Subject.length, iLength = certificate.Data.Issuer.length, i = 0, j = 0;
    res['issuer'] = {};
    res['subject'] = {};
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
}, _JacartaDriver_parseCertificate = function _JacartaDriver_parseCertificate(certificate) {
    let subjectString = '', issuerString = '';
    let inn = this._getValueFromCertificate(certificate.subject, 'INN'), innLe = this._getValueFromCertificate(certificate.subject, 'INNLE') || inn, ogrnip = this._getValueFromCertificate(certificate.subject, 'OGRNIP'), ogrn = this._getValueFromCertificate(certificate.subject, 'OGRN'), snils = this._getValueFromCertificate(certificate.subject, 'SNILS'), surname = this._getValueFromCertificate(certificate.subject, 'SN'), nameAndPatronymic = this._getValueFromCertificate(certificate.subject, 'GN'), issuerCN = this._getValueFromCertificate(certificate.issuer, 'CN'), ownerCN = this._getValueFromCertificate(certificate.subject, 'CN');
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
    let preparedSerialNumber = this._bufferSerialToHex(certificate.serial);
    let parsedCertificate = ({
        validToDate: certificate.date.to,
        validFromDate: certificate.date.from,
        subjectName: subjectString,
        issuerName: issuerString,
        thumbprint: '',
        id: this._selectedCertificate.certificateId,
        isValid: now >= certificate.date.from && now <= certificate.date.to,
        hasPrivateKey: true,
        serial: preparedSerialNumber,
        b64: this._getCertificateInPem(this._selectedCertificate.deviceId, this._selectedCertificate.certificateId),
        deviceId: this._selectedCertificate.deviceId
    });
    let isFoundParsed = false;
    for (let k = 0; k < this.parsedCertificates.length; k++) {
        let parsedTemp = this.parsedCertificates[k];
        if (__classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_deepEqual).call(this, parsedTemp, parsedCertificate))
            isFoundParsed = true;
    }
    if (!isFoundParsed)
        this.parsedCertificates.push(parsedCertificate);
}, _JacartaDriver_deepEqual = function _JacartaDriver_deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = this._isObject(val1) && this._isObject(val2);
        if (areObjects && !__classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_deepEqual).call(this, val1, val2) ||
            !areObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}, _JacartaDriver_encode = function _JacartaDriver_encode(input) {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = __classPrivateFieldGet(this, _JacartaDriver_instances, "m", _JacartaDriver_utf8_encode).call(this, input);
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
        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
}, _JacartaDriver_utf8_encode = function _JacartaDriver_utf8_encode(input) {
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
}, _JacartaDriver_handleError = function _JacartaDriver_handleError(code, message, method) {
    let error = {
        code,
        description: 'Неизвестная ошибка',
        message,
        method,
        cryptoDriverType: 3,
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
}, _JacartaDriver_bytesToBase64 = function _JacartaDriver_bytesToBase64(arrayBuffer) {
    return btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    // return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
    // return btoa(String.fromCharCode(arrayBuffer));
};
//# sourceMappingURL=JacartaDriver.js.map