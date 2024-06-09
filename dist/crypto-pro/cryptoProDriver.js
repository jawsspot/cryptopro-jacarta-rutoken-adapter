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
var _CryptoProDriver_instances, _CryptoProDriver_stringVersionCompare, _CryptoProDriver_makeVersionString, _CryptoProDriver_versionCompare_NPAPI, _CryptoProDriver_getLatestVersion_NPAPI, _CryptoProDriver_checkForPlugIn_NPAPI, _CryptoProDriver_getXmlHttp, _CryptoProDriver_checkForPlugIn_Async, _CryptoProDriver_versionCompare_Async, _CryptoProDriver_getLatestVersion_Async, _CryptoProDriver_initialize, _CryptoProDriver_getAllDevices, _CryptoProDriver_getAllDevicesAsync, _CryptoProDriver_signCMSAsync, _CryptoProDriver_signCMSNPAPI, _CryptoProDriver_getAllDevicesNPAPI, _CryptoProDriver_bytesToBase64, _CryptoProDriver_handleError;
import { isObject } from "./utils/deep-equal.js";
import { deepEqual } from "./utils/deep-equal.js";
import { encode } from './utils/encode.js';
import { getCertificateInPem } from './utils/prepare-b64.js';
export class CryptoProDriver {
    constructor() {
        _CryptoProDriver_instances.add(this);
        this.isPluginLoaded = false;
        this.isPluginWorked = false;
        this.isActualVersion = false;
        this._parsedCertificateList = [];
        this._markedThumbprintContainer = [];
        this._deviceMap = new Map();
        this._certList = [];
        this._plugin = cadesplugin;
    }
    /**Псевдоним для совместимости */
    get parsedCertificates() {
        return this._parsedCertificateList;
    }
    reloadDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            this._certList = [];
            this._deviceMap.clear;
            this._parsedCertificateList = [];
            this._markedThumbprintContainer = [];
            yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_initialize).call(this);
        });
    }
    isActualVersionPlugin() {
        return __awaiter(this, void 0, void 0, function* () {
            let _this = this;
            let currentPluginVersion = '';
            let actualVersion;
            yield new Promise(function (resolve, reject) {
                const xmlhttp = __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_getXmlHttp).call(_this);
                xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
                xmlhttp.timeout = 1000;
                xmlhttp.onreadystatechange = function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (xmlhttp.readyState === 4) {
                            if (xmlhttp.status === 200) {
                                actualVersion = xmlhttp.responseText;
                                resolve(void 0);
                            }
                            reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 5, `Ошибка при запросе актуальной версии плагина`, 'isActualVersionPlugin'));
                        }
                    });
                };
                xmlhttp.send(null);
            });
            yield _this._plugin.CreateObjectAsync("CAdESCOM.About")
                .catch(() => {
                throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 5, `Ошибка при получении информации о текущем плагине`, 'isActualVersionPlugin');
            })
                .then((value) => value.Version)
                .then((version) => currentPluginVersion = version);
            this.isActualVersion = __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_stringVersionCompare).call(_this, actualVersion, currentPluginVersion);
            console.timeEnd('isActualVersionPlugin');
            return {
                cryptoDriverType: 1,
                isActualVersion: this.isActualVersion,
                currentVersion: currentPluginVersion,
                actualVersion: actualVersion.replace('\n', '')
            };
        });
    }
    loadPlugin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPluginLoaded)
                return;
            try {
                this._plugin.set_log_level(this._plugin.LOG_LEVEL_ERROR);
                const canAsync = !!this._plugin.CreateObjectAsync;
                console.log(`canAsync: ${canAsync}`);
                if (canAsync) {
                    this._isAsync = true;
                    yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_checkForPlugIn_Async).call(this);
                }
                else {
                    __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_checkForPlugIn_NPAPI).call(this);
                }
                yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_initialize).call(this);
            }
            catch (err) {
                if (err.method)
                    throw err;
                throw __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(this, 6, `Ошибка при загрузке плагина`, 'loadPlugin');
            }
        });
    }
    signCMS(data, certificateId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._isAsync) {
                    return yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_signCMSAsync).call(this, data, certificateId, deviceId);
                }
                else {
                    return __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_signCMSNPAPI).call(this, data, certificateId, deviceId);
                }
            }
            catch (err) {
                if (err.method)
                    throw err;
                throw __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(this, 2, `Ошибка при подписи`, 'loadPlugin');
            }
        });
    }
}
_CryptoProDriver_instances = new WeakSet(), _CryptoProDriver_stringVersionCompare = function _CryptoProDriver_stringVersionCompare(actualVersion, currentPluginVersion) {
    const actual = actualVersion.split('.');
    const current = currentPluginVersion.split('.');
    if (parseInt(current[0]) === parseInt(actual[0])) {
        if (parseInt(current[1]) === parseInt(actual[1])) {
            if (parseInt(current[2]) === parseInt(actual[2])) {
                return true;
            }
            else if (parseInt(current[2]) < parseInt(actual[2])) {
                return false;
            }
        }
        else if (parseInt(current[1]) < parseInt(actual[1])) {
            return false;
        }
    }
    else if (parseInt(current[0]) < parseInt(actual[0])) {
        return false;
    }
    return true;
}, _CryptoProDriver_makeVersionString = function _CryptoProDriver_makeVersionString(oVer) {
    let strVer;
    if (typeof (oVer) == "string")
        return oVer;
    else
        return oVer.MajorVersion + "." + oVer.MinorVersion + "." + oVer.BuildVersion;
}, _CryptoProDriver_versionCompare_NPAPI = function _CryptoProDriver_versionCompare_NPAPI(StringVersion, ObjectVersion) {
    if (typeof (ObjectVersion) == "string")
        return -1;
    const arr = StringVersion.split('.');
    if (ObjectVersion.MajorVersion == parseInt(arr[0])) {
        if (ObjectVersion.MinorVersion == parseInt(arr[1])) {
            if (ObjectVersion.BuildVersion == parseInt(arr[2])) {
                return 0;
            }
            else if (ObjectVersion.BuildVersion < parseInt(arr[2])) {
                return -1;
            }
        }
        else if (ObjectVersion.MinorVersion < parseInt(arr[1])) {
            return -1;
        }
    }
    else if (ObjectVersion.MajorVersion < parseInt(arr[0])) {
        return -1;
    }
    return 1;
}, _CryptoProDriver_getLatestVersion_NPAPI = function _CryptoProDriver_getLatestVersion_NPAPI(currentPluginVersion) {
    const _this = this;
    const xmlhttp = __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_getXmlHttp).call(this);
    try {
        xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
        xmlhttp.timeout = 1000;
        xmlhttp.onreadystatechange = function () {
            let pluginBaseVersion;
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    pluginBaseVersion = xmlhttp.responseText;
                    if (_this.isPluginWorked) { // плагин работает, объекты создаются
                        if (__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_versionCompare_NPAPI).call(_this, pluginBaseVersion, currentPluginVersion) < 0) {
                            _this.isActualVersion = false;
                            console.log("Actual version of plugin is: " + pluginBaseVersion);
                        }
                    }
                    else { // плагин не работает, объекты не создаются
                        if (_this.isPluginLoaded) { // плагин загружен
                            if (!_this._isPluginEnabled) { // плагин загружен, но отключен
                                console.log("Plugin is not enabled in web browser");
                            }
                            else { // плагин загружен и включен, но объекты не создаются
                                console.log("Check browser settings for plugin correct work");
                            }
                        }
                        else { // плагин не загружен
                            _this.isPluginLoaded = false;
                        }
                    }
                }
            }
        };
    }
    catch (err) {
        _this.isActualVersion = true;
        console.log("Couldn't check plugin version");
    }
    xmlhttp.send();
}, _CryptoProDriver_checkForPlugIn_NPAPI = function _CryptoProDriver_checkForPlugIn_NPAPI() {
    let currentPluginVersion;
    try {
        const oAbout = this._plugin.CreateObject("CAdESCOM.About");
        this.isPluginLoaded = true;
        this._isPluginEnabled = true;
        this.isPluginWorked = true;
        // Это значение будет проверяться сервером при загрузке демо-страницы
        currentPluginVersion = oAbout.PluginVersion;
        if (typeof (currentPluginVersion) == "undefined")
            currentPluginVersion = oAbout.Version;
        this._currentPluginVersion = __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_makeVersionString).call(this, currentPluginVersion);
    }
    catch (err) {
        // Объект создать не удалось, проверим, установлен ли
        // вообще плагин. Такая возможность есть не во всех браузерах
        const mimetype = navigator.mimeTypes["application/x-cades"];
        if (mimetype) {
            this.isPluginLoaded = true;
            const plugin = mimetype.enabledPlugin;
            if (plugin) {
                this._isPluginEnabled = true;
            }
        }
    }
    __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_getLatestVersion_NPAPI).call(this, currentPluginVersion);
}, _CryptoProDriver_getXmlHttp = function _CryptoProDriver_getXmlHttp() {
    let xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}, _CryptoProDriver_checkForPlugIn_Async = function _CryptoProDriver_checkForPlugIn_Async() {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        let currentPluginVersion;
        yield this._plugin;
        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (args) {
                try {
                    let oAbout = yield _this._plugin.CreateObjectAsync("CAdESCOM.About");
                    currentPluginVersion = yield oAbout.PluginVersion;
                    __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_getLatestVersion_Async).call(_this, currentPluginVersion).then(() => {
                        _this._isPluginEnabled = true;
                        _this.isPluginLoaded = true;
                        _this.isPluginWorked = true;
                        return args[0]();
                    });
                }
                catch (reason) {
                    console.log(reason);
                    _this._isPluginEnabled = false;
                    _this.isPluginLoaded = false;
                    _this.isPluginWorked = false;
                    return args[1]();
                }
            }, resolve, reject);
        }); //this.#plugin.async_spawn
    });
}, _CryptoProDriver_versionCompare_Async = function _CryptoProDriver_versionCompare_Async(StringVersion, ObjectVersion) {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        if (typeof (ObjectVersion) == "string")
            return -1;
        const arr = StringVersion.split('.');
        let isActualVersion = true;
        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (args) {
                if ((yield ObjectVersion.MajorVersion) == parseInt(arr[0])) {
                    if ((yield ObjectVersion.MinorVersion) == parseInt(arr[1])) {
                        if ((yield ObjectVersion.BuildVersion) == parseInt(arr[2])) {
                            isActualVersion = true;
                            _this.isActualVersion = true;
                        }
                        else if ((yield ObjectVersion.BuildVersion) < parseInt(arr[2])) {
                            _this.isActualVersion = false;
                            isActualVersion = false;
                        }
                    }
                    else if ((yield ObjectVersion.MinorVersion) < parseInt(arr[1])) {
                        _this.isActualVersion = false;
                        isActualVersion = false;
                    }
                }
                else if ((yield ObjectVersion.MajorVersion) < parseInt(arr[0])) {
                    _this.isActualVersion = false;
                    isActualVersion = false;
                }
                // if (!isActualVersion) {
                //     console.log("There is newer version of plugin: " + (yield CurrentPluginVersion.toString()))
                // }
                let oAbout = yield _this._plugin.CreateObjectAsync("CAdESCOM.About");
                let ver = yield oAbout.CSPVersion("", 80);
                let ret = (yield ver.MajorVersion) + "." + (yield ver.MinorVersion) + "." + (yield ver.BuildVersion);
                _this._currentPluginVersion = ret;
                try {
                    _this._scpName = yield oAbout.CSPName(80);
                }
                catch (err) {
                    console.log(err);
                }
                return args[0]();
            }, resolve, reject);
        }); //this.#plugin.async_spawn
    });
}, _CryptoProDriver_getLatestVersion_Async = function _CryptoProDriver_getLatestVersion_Async(currentPluginVersion) {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        return new Promise(function (resolve, reject) {
            const xmlhttp = __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_getXmlHttp).call(_this);
            xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
            xmlhttp.timeout = 1000;
            xmlhttp.onreadystatechange = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let pluginBaseVersion;
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            pluginBaseVersion = xmlhttp.responseText;
                            yield __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_versionCompare_Async).call(_this, pluginBaseVersion, currentPluginVersion);
                            resolve(void 0);
                        }
                        else
                            reject();
                    }
                });
            };
            xmlhttp.send(null);
        }).catch(err => {
            _this.isActualVersion = true;
            console.log("Couldn't check plugin version");
        });
    });
}, _CryptoProDriver_initialize = function _CryptoProDriver_initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_getAllDevices).call(this);
        console.timeEnd('getAllDevices');
    });
}, _CryptoProDriver_getAllDevices = function _CryptoProDriver_getAllDevices() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_getAllDevicesAsync).call(this);
    });
}, _CryptoProDriver_getAllDevicesAsync = function _CryptoProDriver_getAllDevicesAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (args) {
                let MyStoreExists = true;
                let oStore;
                let certCnt;
                let oStoreCertificateList;
                try {
                    oStore = yield _this._plugin.CreateObjectAsync("CAdESCOM.Store");
                    if (!oStore) {
                        console.error("Create store failed");
                    }
                    /**По умолчанию открывает CADESCOM_CURRENT_USER_STORE - аналог CAPICOM_CURRENT_USER_STORE */
                    yield oStore.Open();
                }
                catch (ex) {
                    MyStoreExists = false;
                }
                /**
                 * Сначала читаем CAPICOM_CURRENT_USER_STORE -
                 * тут сертификаты профиля текущего пользователя,
                 *
                 *  хранящиеся в разделе реестра HKEY_CURRENT_USER
                 * в теории - тут только те сертификаты которые хранятся на пк.
                 * */
                if (MyStoreExists) {
                    try {
                        oStoreCertificateList = yield oStore.Certificates;
                        certCnt = yield oStoreCertificateList.Count;
                    }
                    catch (ex) {
                        console.log("Ошибка при получении Certificates или Count: " + _this._plugin.getLastError(ex));
                    }
                    for (let i = 1; i <= certCnt; i++) {
                        let certificateItem;
                        try {
                            certificateItem = yield oStoreCertificateList.Item(i);
                            var certThumbprint = yield certificateItem.Thumbprint;
                            var foundIndex = _this._markedThumbprintContainer.indexOf(certThumbprint);
                            if (foundIndex > -1) {
                                console.log('первая итерация');
                                continue;
                            }
                            _this._markedThumbprintContainer.push(certThumbprint);
                            // let pubKey = yield certificateItem.PublicKey(),
                            //     algo = yield pubKey.Algorithm,
                            //     algoOid = yield algo.Value;
                            let now = new Date();
                            let validToDate = new Date((yield certificateItem.ValidToDate)), validFromDate = new Date((yield certificateItem.ValidFromDate)), certInBase64 = yield certificateItem.Export(_this._plugin.CADESCOM_ENCODE_BASE64);
                            let parsedCertificate = {
                                ValidToDate: yield certificateItem.ValidToDate,
                                ValidFromDate: yield certificateItem.ValidFromDate,
                                SubjectName: yield certificateItem.SubjectName,
                                IssuerName: yield certificateItem.IssuerName,
                                Thumbprint: yield certificateItem.Thumbprint,
                                id: i,
                                IsValid: now < validToDate && now >= validFromDate,
                                serial: yield certificateItem.SerialNumber,
                                HasPrivateKey: yield certificateItem.HasPrivateKey(),
                                b64: getCertificateInPem(certInBase64),
                                // algorythmOid: algoOid,
                                deviceId: 0
                            };
                            _this._parsedCertificateList.push(parsedCertificate);
                        }
                        catch (ex) {
                            alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex));
                            reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesAsync'));
                        }
                        _this._certList[i] = (certificateItem);
                    }
                    if (_this._certList.length > 0)
                        _this._deviceMap.set(0, _this._certList);
                    _this._certList = [];
                    yield oStore.Close();
                }
                //getting certs from hardware
                /**
                 * дальше получаем контейнеры крипто ключей из CADESCOM_CONTAINER_STORE
                 * - контейнерами могут выступать смарткарты, флешки файловые системы
                 * в теории один и тот же сертификат может быть установлен в оба хранилища
                 * поэтому нам требуется отфильтровать дубликаты
                 */
                try {
                    yield oStore.Open(_this._plugin.CADESCOM_CONTAINER_STORE);
                    oStoreCertificateList = yield oStore.Certificates;
                    certCnt = yield oStoreCertificateList.Count;
                }
                catch (e) {
                    yield oStore.Close();
                    console.log("Невозможно загрузить список сертификатов." + _this._plugin.getLastError(e));
                    reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 4, `Невозможно загрузить список сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI'));
                }
                if (certCnt == 0) {
                    console.log("Сертификаты на токенах не обнаружены");
                    yield oStore.Close();
                    return args[0]();
                }
                for (let i = 1; i <= certCnt; i++) {
                    let certificateItem;
                    try {
                        certificateItem = yield oStoreCertificateList.Item(i);
                        var certThumbprint = yield certificateItem.Thumbprint;
                        var foundIndex = _this._markedThumbprintContainer.indexOf(certThumbprint);
                        // если сертификат уже сть в списке - пропускаем
                        if (foundIndex > -1) {
                            continue;
                        }
                        _this._markedThumbprintContainer.push(certThumbprint);
                        /**на случай если понадобится инфромация об алгоритме */
                        // let pubKey = yield certificateItem.PublicKey(),
                        //     algo = yield pubKey.Algorithm,
                        //     algoOid = yield algo.Value
                        let now = new Date();
                        let validToDate = new Date((yield certificateItem.ValidToDate)), validFromDate = new Date((yield certificateItem.ValidFromDate)), certInBase64 = yield certificateItem.Export(_this._plugin.CADESCOM_ENCODE_BASE64);
                        let parsedCertificate = {
                            ValidToDate: yield certificateItem.ValidToDate,
                            ValidFromDate: yield certificateItem.ValidFromDate,
                            SubjectName: yield certificateItem.SubjectName,
                            IssuerName: yield certificateItem.IssuerName,
                            Thumbprint: yield certificateItem.Thumbprint,
                            id: i,
                            IsValid: now < validToDate && now >= validFromDate,
                            serial: yield certificateItem.SerialNumber,
                            HasPrivateKey: yield certificateItem.HasPrivateKey(),
                            b64: getCertificateInPem(certInBase64),
                            // algorythmOid: algoOid,
                            deviceId: 1
                        };
                        _this._parsedCertificateList.push(parsedCertificate);
                    }
                    catch (ex) {
                        alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex));
                        reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesAsync'));
                    }
                    _this._certList[i] = (certificateItem);
                }
                if (_this._certList.length > 0) {
                    _this._deviceMap.set(1, _this._certList);
                }
                _this._certList = [];
                yield oStore.Close();
                return args[0]();
            }, resolve, reject);
        });
    });
}, _CryptoProDriver_signCMSAsync = function _CryptoProDriver_signCMSAsync(data, certificateId, deviceId) {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        const certificate = _this._deviceMap.get(deviceId)[certificateId];
        let dataToSign;
        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (arg) {
                if (!(data != undefined && data != null)) {
                    console.log("Data is null or undefined");
                    reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, 'Нечего подписывать', ' #signCMSAsync'));
                }
                if (typeof data === 'object') {
                    dataToSign = __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_bytesToBase64).call(_this, data);
                }
                else {
                    dataToSign = encode(data);
                }
                let Signature;
                try {
                    //FillCertInfo_Async(certificate);
                    let errormes;
                    let oSigner;
                    let oSigningTimeAttr;
                    let oDocumentNameAttr;
                    let oSignedData;
                    try {
                        oSigner = yield _this._plugin.CreateObjectAsync("CAdESCOM.CPSigner");
                    }
                    catch (err) {
                        console.log("Ошибка при создании объекта CAdESCOM.CPSigner");
                        errormes = "Failed to create CAdESCOM.CPSigner: " + err;
                        reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, ' #signCMSAsync'));
                    }
                    try {
                        oSigningTimeAttr = yield _this._plugin.CreateObjectAsync("CADESCOM.CPAttribute");
                    }
                    catch (err) {
                        reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, err, ' #signCMSAsync'));
                    }
                    yield oSigningTimeAttr.propset_Name(_this._plugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
                    const oTimeNow = new Date();
                    yield oSigningTimeAttr.propset_Value(oTimeNow);
                    const attr = yield oSigner.AuthenticatedAttributes2;
                    yield attr.Add(oSigningTimeAttr);
                    try {
                        oDocumentNameAttr = yield _this._plugin.CreateObjectAsync("CADESCOM.CPAttribute");
                    }
                    catch (err) {
                        reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, err, ' #signCMSAsync'));
                    }
                    yield oDocumentNameAttr.propset_Name(_this._plugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME);
                    yield oDocumentNameAttr.propset_Value("Document Name");
                    yield attr.Add(oDocumentNameAttr);
                    if (oSigner) {
                        yield oSigner.propset_Certificate(certificate);
                    }
                    else {
                        errormes = "Failed to create CAdESCOM.CPSigner";
                        reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, ' #signCMSAsync'));
                    }
                    try {
                        oSignedData = yield _this._plugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                    }
                    catch (err) {
                        reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, err, ' #signCMSAsync'));
                    }
                    // Отключаем проверку цепочки сертификатов пользователя
                    // yield oSigner.propset_Options(this.#plugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN)
                    yield oSigner.propset_Options(_this._plugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);
                    yield oSignedData.propset_ContentEncoding(_this._plugin.CADESCOM_BASE64_TO_BINARY); //
                    yield oSignedData.propset_Content(dataToSign);
                    try {
                        Signature = yield oSignedData.SignCades(oSigner, _this._plugin.CADESCOM_CADES_BES, true);
                    }
                    catch (err) {
                        console.log('Ошибка при вызове метода oSignedData.SignCades, объект CAdESCOM.CadesSignedData');
                        errormes = "Ошибка при вызове метода oSignedData.SignCades, объект CAdESCOM.CadesSignedData \n Не удалось создать подпись из-за ошибки: " + JSON.stringify(err);
                        reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, ' #signCMSAsync'));
                    }
                    console.log("Подпись сформирована успешно:");
                    console.log(Signature);
                    return arg[0](Signature);
                }
                catch (err) {
                    console.error(err);
                    reject(__classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, err, ' #signCMSAsync'));
                }
            }, resolve, reject);
        });
    });
}, _CryptoProDriver_signCMSNPAPI = function _CryptoProDriver_signCMSNPAPI(data, certificateId, deviceId) {
    const setDisplayData = true;
    const _this = this;
    const certificate = _this._deviceMap.get(deviceId)[certificateId];
    if (!isObject(data)) {
        alert("Data is null or undefined");
        return;
    }
    const dataToSign = encode(data);
    let Signature;
    try {
        let errormes;
        let oSigner;
        let oSigningTimeAttr;
        let oDocumentNameAttr;
        let oSignedData;
        try {
            oSigner = _this._plugin.CreateObject("CAdESCOM.CPSigner");
        }
        catch (err) {
            errormes = "Failed to create CAdESCOM.CPSigner: " + err.number;
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, 'signCMSNPAPI');
        }
        try {
            oSigningTimeAttr = _this._plugin.CreateObject("CADESCOM.CPAttribute");
        }
        catch (err) {
            errormes = "Failed to create CADESCOM.CPAttribute: " + JSON.stringify(err);
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, 'signCMSNPAPI');
        }
        oSigningTimeAttr.propset_Name(_this._plugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
        const oTimeNow = new Date();
        oSigningTimeAttr.propset_Value(oTimeNow);
        const attr = oSigner.AuthenticatedAttributes2;
        attr.Add(oSigningTimeAttr);
        try {
            oDocumentNameAttr = _this._plugin.CreateObject("CADESCOM.CPAttribute");
        }
        catch (err) {
            errormes = "Failed to create CADESCOM.CPAttribute: " + JSON.stringify(err);
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, 'signCMSNPAPI');
        }
        oDocumentNameAttr.propset_Name(_this._plugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME);
        oDocumentNameAttr.propset_Value("Document Name");
        attr.Add(oDocumentNameAttr);
        if (oSigner) {
            oSigner.propset_Certificate(certificate);
        }
        else {
            errormes = "Failed to create CAdESCOM.CPSigner";
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, 'signCMSNPAPI');
        }
        try {
            oSignedData = _this._plugin.CreateObject("CAdESCOM.CadesSignedData");
        }
        catch (err) {
            errormes = "Failed to create CAdESCOM.CadesSignedData: " + JSON.stringify(err);
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, 'signCMSNPAPI');
        }
        if (dataToSign) {
            // Отключаем проверку цепочки сертификатов пользователя
            // yield oSigner.propset_Options(this.#plugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN)
            oSigner.propset_Options(_this._plugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);
            oSignedData.propset_ContentEncoding(_this._plugin.CADESCOM_BASE64_TO_BINARY); //
            if (typeof (setDisplayData) != 'undefined') {
                //Set display data flag flag for devices like Rutoken PinPad
                oSignedData.propset_DisplayData(1);
            }
            oSignedData.propset_Content(dataToSign);
            try {
                Signature = oSignedData.SignCades(oSigner, _this._plugin.CADESCOM_CADES_BES);
            }
            catch (err) {
                errormes = "Не удалось создать подпись из-за ошибки: " + JSON.stringify(err);
                throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, errormes, 'signCMSNPAPI');
            }
        }
        console.log("Подпись сформирована успешно:");
        console.log(Signature);
        return Signature;
    }
    catch (err) {
        if (err.method)
            throw err;
        console.error(err);
        throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 2, err, 'signCMSNPAPI');
    }
}, _CryptoProDriver_getAllDevicesNPAPI = function _CryptoProDriver_getAllDevicesNPAPI() {
    const _this = this;
    let MyStoreExists = true;
    let oStore;
    let certCnt;
    let certs;
    let isFound;
    try {
        oStore = _this._plugin.CreateObject("CAdESCOM.Store");
        if (!oStore) {
            console.log("Create store failed");
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 3, 'Create store failed', 'getAllDevicesNPAPI');
        }
        oStore.Open();
    }
    catch (ex) {
        MyStoreExists = false;
        console.log("Ошибка при открытии хранилища: " + _this._plugin.getLastError(ex));
        throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 3, `Ошибка при открытии хранилища: ${_this._plugin.getLastError(ex)}`, 'getAllDevicesNPAPI');
    }
    if (MyStoreExists) {
        try {
            certs = oStore.Certificates;
            certCnt = certs.Count;
        }
        catch (ex) {
            console.log("Ошибка при получении Certificates или Count: " + _this._plugin.getLastError(ex));
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 3, `Ошибка при получении Certificates или Count: ${_this._plugin.getLastError(ex)}`, 'getAllDevicesNPAPI');
        }
        isFound = false;
        for (let i = 1; i <= certCnt; i++) {
            let cert;
            try {
                cert = certs.Item(i);
                for (var j = 0; j < _this._parsedCertificateList.length; j++) {
                    let certListTemp = _this._parsedCertificateList[j].Thumbprint;
                    let certTemp = cert.Thumbprint;
                    if (deepEqual(certListTemp, certTemp)) {
                        isFound = true;
                        break;
                    }
                }
                if (isFound)
                    continue;
                let pubKey = cert.PublicKey(), algo = pubKey.Algorithm, algoOid = algo.Value;
                let now = new Date();
                try {
                    let validToDate = new Date((cert.ValidToDate)), validFromDate = new Date((cert.ValidFromDate)), validator = cert.IsValid(), isValid = validator.Result;
                    let c = {
                        ValidToDate: cert.ValidToDate,
                        ValidFromDate: cert.ValidFromDate,
                        SubjectName: cert.SubjectName,
                        IssuerName: cert.IssuerName,
                        Thumbprint: cert.Thumbprint,
                        id: i,
                        IsValid: now < validToDate && now >= validFromDate,
                        HasPrivateKey: cert.HasPrivateKey(),
                        serial: cert.SerialNumber,
                        b64: cert.Export(_this._plugin.CADESCOM_ENCODE_BASE64),
                        algorythmOid: algoOid,
                        deviceId: 0
                    };
                    let isFoundParsed = false;
                    for (let k = 0; k < _this._parsedCertificateList.length; k++) {
                        let parsedTemp = _this._parsedCertificateList[k];
                        if (deepEqual(parsedTemp, c))
                            isFoundParsed = true;
                    }
                    if (!isFoundParsed)
                        _this._parsedCertificateList.push(c);
                }
                catch (e) {
                    /*me.lastError = "Ошибка при получении свойства SubjectName: " + this.#plugin.getError(e)
                     me.certificateListReady = true*/
                }
            }
            catch (ex) {
                alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex));
                throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesNPAPI');
            }
            _this._certList.push(cert);
        }
        _this._deviceMap.set(0, _this._certList);
        _this._certList = [];
        oStore.Close();
    }
    //getting certs from hardware
    try {
        oStore.Open(_this._plugin.CADESCOM_CONTAINER_STORE);
        certs = oStore.Certificates;
        certCnt = certs.Count;
    }
    catch (e) {
        oStore.Close();
        console.log("Невозможно загрузить список сертификатов." + _this._plugin.getLastError(e));
        throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 4, `Невозможно загрузить список сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI');
    }
    if (certCnt == 0) {
        oStore.Close();
        console.log("Сертификаты на токенах не обнаружены");
        return;
    }
    isFound = false;
    for (let i = 1; i <= certCnt; i++) {
        let cert;
        try {
            cert = certs.Item(i);
            for (let j = 0; j < _this._parsedCertificateList.length; j++) {
                let certListTemp = _this._parsedCertificateList[j].Thumbprint;
                let certTemp = cert.Thumbprint;
                if (deepEqual(certListTemp, certTemp)) {
                    isFound = true;
                    break;
                }
            }
            if (isFound)
                continue;
        }
        catch (e) {
            oStore.Close();
            console.log("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(e));
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI');
        }
        let pubKey = cert.PublicKey(), algo = pubKey.Algorithm, algoOid = algo.Value;
        let now = new Date();
        try {
            let validToDate = new Date((cert.ValidToDate)), validFromDate = new Date((cert.ValidFromDate)), validator = cert.IsValid(), isValid = validator.Result;
            let c = {
                ValidToDate: cert.ValidToDate,
                ValidFromDate: cert.ValidFromDate,
                SubjectName: cert.SubjectName,
                IssuerName: cert.IssuerName,
                thumbPrint: cert.Thumbprint,
                id: i,
                IsValid: now < validToDate && now >= validFromDate,
                HasPrivateKey: cert.HasPrivateKey(),
                serial: cert.SerialNumber,
                b64: cert.Export(_this._plugin.CADESCOM_ENCODE_BASE64),
                algorythmOid: algoOid,
                deviceId: 1
            };
            console.log(cert);
            let isFoundParsed = false;
            for (let k = 0; k < _this._parsedCertificateList.length; k++) {
                let parsedTemp = _this._parsedCertificateList[k];
                if (deepEqual(parsedTemp, c))
                    isFoundParsed = true;
            }
            if (!isFoundParsed)
                _this._parsedCertificateList.push(c);
        }
        catch (e) {
            console.log("Ошибка при парсинге сертификатов: " + _this._plugin.getLastError(e));
            throw __classPrivateFieldGet(_this, _CryptoProDriver_instances, "m", _CryptoProDriver_handleError).call(_this, 4, `Ошибка при парсинге сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI');
        }
        _this._certList.push(cert);
    }
    _this._deviceMap.set(1, _this._certList);
    _this._certList = [];
    oStore.Close();
}, _CryptoProDriver_bytesToBase64 = function _CryptoProDriver_bytesToBase64(arrayBuffer) {
    return btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    // return btoa(String.fromCharCode(arrayBuffer));
}, _CryptoProDriver_handleError = function _CryptoProDriver_handleError(code, message, method) {
    let error = {
        code: code,
        message: message,
        description: 'Неизвестная ошибка',
        method,
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
};
//# sourceMappingURL=cryptoProDriver.js.map