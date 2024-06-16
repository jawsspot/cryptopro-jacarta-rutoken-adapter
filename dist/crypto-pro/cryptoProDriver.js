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
var _CryptoProDriver_instances, _CryptoProDriver_initialize, _CryptoProDriver_getAllDevices;
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
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.timeout = 1000;
                xmlhttp.onreadystatechange = function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (xmlhttp.readyState === 4) {
                            if (xmlhttp.status === 200) {
                                actualVersion = xmlhttp.responseText;
                                resolve(void 0);
                            }
                            reject(_this.handleError(5, `Ошибка при запросе актуальной версии плагина`, 'isActualVersionPlugin'));
                        }
                    });
                };
                xmlhttp.send(null);
            });
            yield _this._plugin.CreateObjectAsync("CAdESCOM.About")
                .catch(() => {
                throw _this.handleError(5, `Ошибка при получении информации о текущем плагине`, 'isActualVersionPlugin');
            })
                .then((value) => value.Version)
                .then((version) => currentPluginVersion = version);
            this.isActualVersion = _this.stringVersionCompare(actualVersion, currentPluginVersion);
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
                yield this.checkForPlugIn_Async();
                yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_initialize).call(this);
            }
            catch (err) {
                if (err.method)
                    throw err;
                throw this.handleError(6, `Ошибка при загрузке плагина`, 'loadPlugin');
            }
        });
    }
    signCMS(data, certificateId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.signCMSAsync(data, certificateId, deviceId);
            }
            catch (err) {
                if (err.method)
                    throw err;
                throw this.handleError(2, `Ошибка при подписи`, 'loadPlugin');
            }
        });
    }
    stringVersionCompare(actualVersion, currentPluginVersion) {
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
    }
    // #makeVersionString(oVer) {
    //     let strVer
    //     if (typeof (oVer) == "string")
    //         return oVer
    //     else
    //         return oVer.MajorVersion + "." + oVer.MinorVersion + "." + oVer.BuildVersion
    // }
    checkForPlugIn_Async() {
        return __awaiter(this, void 0, void 0, function* () {
            const _this = this;
            let currentPluginVersion;
            yield this._plugin;
            return new Promise(function (resolve, reject) {
                _this._plugin.async_spawn(function* (args) {
                    try {
                        let oAbout = yield _this._plugin.CreateObjectAsync("CAdESCOM.About");
                        currentPluginVersion = yield oAbout.PluginVersion;
                        _this.getLatestVersion_Async(currentPluginVersion).then(() => {
                            _this.isPluginLoaded = true;
                            _this.isPluginWorked = true;
                            return args[0]();
                        });
                    }
                    catch (reason) {
                        console.log(reason);
                        _this.isPluginLoaded = false;
                        _this.isPluginWorked = false;
                        return args[1]();
                    }
                }, resolve, reject);
            }); //this.#plugin.async_spawn
        });
    }
    versionCompare_Async(StringVersion, ObjectVersion) {
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
                    let oAbout = yield _this._plugin.CreateObjectAsync("CAdESCOM.About");
                    let ver = yield oAbout.CSPVersion("", 80);
                    let ret = (yield ver.MajorVersion) + "." + (yield ver.MinorVersion) + "." + (yield ver.BuildVersion);
                    _this.pluginVersion = ret;
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
    }
    getLatestVersion_Async(currentPluginVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const _this = this;
            return new Promise(function (resolve, reject) {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
                xmlhttp.timeout = 1000;
                xmlhttp.onreadystatechange = function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        let pluginBaseVersion;
                        if (xmlhttp.readyState == 4) {
                            if (xmlhttp.status == 200) {
                                pluginBaseVersion = xmlhttp.responseText;
                                yield _this.versionCompare_Async(pluginBaseVersion, currentPluginVersion);
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
    }
    getAllDevicesAsync() {
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
                                    validToDate: yield certificateItem.ValidToDate,
                                    validFromDate: yield certificateItem.ValidFromDate,
                                    subjectName: yield certificateItem.SubjectName,
                                    issuerName: yield certificateItem.IssuerName,
                                    thumbprint: yield certificateItem.Thumbprint,
                                    id: i,
                                    isValid: now < validToDate && now >= validFromDate,
                                    serial: yield certificateItem.SerialNumber,
                                    hasPrivateKey: yield certificateItem.HasPrivateKey(),
                                    b64: getCertificateInPem(certInBase64),
                                    // algorythmOid: algoOid,
                                    deviceId: 0
                                };
                                _this._parsedCertificateList.push(parsedCertificate);
                            }
                            catch (ex) {
                                alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex));
                                reject(_this.handleError(4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesAsync'));
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
                        reject(_this.handleError(4, `Невозможно загрузить список сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI'));
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
                                validToDate: yield certificateItem.ValidToDate,
                                validFromDate: yield certificateItem.ValidFromDate,
                                subjectName: yield certificateItem.SubjectName,
                                issuerName: yield certificateItem.IssuerName,
                                thumbprint: yield certificateItem.Thumbprint,
                                id: i,
                                isValid: now < validToDate && now >= validFromDate,
                                serial: yield certificateItem.SerialNumber,
                                hasPrivateKey: yield certificateItem.HasPrivateKey(),
                                b64: getCertificateInPem(certInBase64),
                                // algorythmOid: algoOid,
                                deviceId: 1
                            };
                            _this._parsedCertificateList.push(parsedCertificate);
                        }
                        catch (ex) {
                            alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex));
                            reject(_this.handleError(4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesAsync'));
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
    }
    signCMSAsync(data, certificateId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const _this = this;
            const certificate = _this._deviceMap.get(deviceId)[certificateId];
            let dataToSign;
            return new Promise(function (resolve, reject) {
                _this._plugin.async_spawn(function* (arg) {
                    if (!(data != undefined && data != null)) {
                        console.log("Data is null or undefined");
                        reject(_this.handleError(2, 'Нечего подписывать', ' #signCMSAsync'));
                    }
                    if (typeof data === 'object') {
                        dataToSign = _this.bytesToBase64(data);
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
                            reject(_this.handleError(2, errormes, ' #signCMSAsync'));
                        }
                        try {
                            oSigningTimeAttr = yield _this._plugin.CreateObjectAsync("CADESCOM.CPAttribute");
                        }
                        catch (err) {
                            reject(_this.handleError(2, err, ' #signCMSAsync'));
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
                            reject(_this.handleError(2, err, ' #signCMSAsync'));
                        }
                        yield oDocumentNameAttr.propset_Name(_this._plugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME);
                        yield oDocumentNameAttr.propset_Value("Document Name");
                        yield attr.Add(oDocumentNameAttr);
                        if (oSigner) {
                            yield oSigner.propset_Certificate(certificate);
                        }
                        else {
                            errormes = "Failed to create CAdESCOM.CPSigner";
                            reject(_this.handleError(2, errormes, ' #signCMSAsync'));
                        }
                        try {
                            oSignedData = yield _this._plugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                        }
                        catch (err) {
                            reject(_this.handleError(2, err, ' #signCMSAsync'));
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
                            reject(_this.handleError(2, errormes, ' #signCMSAsync'));
                        }
                        console.log("Подпись сформирована успешно:");
                        console.log(Signature);
                        return arg[0](Signature);
                    }
                    catch (err) {
                        console.error(err);
                        reject(_this.handleError(2, err, ' #signCMSAsync'));
                    }
                }, resolve, reject);
            });
        });
    }
    bytesToBase64(arrayBuffer) {
        return btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
        // return btoa(String.fromCharCode(arrayBuffer));
    }
    handleError(code, message, method) {
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
    }
}
_CryptoProDriver_instances = new WeakSet(), _CryptoProDriver_initialize = function _CryptoProDriver_initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet(this, _CryptoProDriver_instances, "m", _CryptoProDriver_getAllDevices).call(this);
        console.timeEnd('getAllDevices');
    });
}, _CryptoProDriver_getAllDevices = function _CryptoProDriver_getAllDevices() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.getAllDevicesAsync();
    });
};
//# sourceMappingURL=cryptoProDriver.js.map