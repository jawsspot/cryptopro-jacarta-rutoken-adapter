import { isObject } from './utils/deep-equal';
import { deepEqual } from './utils/deep-equal';
import { encode } from './utils/encode';
import { getCertificateInPem } from './utils/prepare-b64';
import { IParsedCertificate } from '../interfaces/certificate.interface';

declare const cadesplugin;
export class CryptoProDriver {
    /**Псевдоним для совместимости */
    public get parsedCertificates(): Array<IParsedCertificate> {
        return this._parsedCertificateList;
    }
    public isPluginLoaded: boolean = false
    public isPluginWorked: boolean = false
    public isActualVersion: boolean = false

    private _parsedCertificateList: Array<IParsedCertificate> = []
    private _plugin: any;
    private _isAsync: boolean;
    private _currentPluginVersion: string;
    private _scpName: string;
    private _markedThumbprintContainer: Array<string> = [];
    private _isPluginEnabled: boolean;
    private _deviceMap: Map<number, Array<any>> = new Map();
    private _certList: Array<any> = []


    constructor() {
        this._plugin = cadesplugin;
    }

    async reloadDevices() {
        this._certList = []
        this._deviceMap.clear
        this._parsedCertificateList = [];
        this._markedThumbprintContainer = [];
        await this.#initialize()
    }

    async isActualVersionPlugin() {

        let _this = this;
        let currentPluginVersion = '';
        let actualVersion;

        await new Promise(function (resolve, reject) {
            const xmlhttp = _this.#getXmlHttp()
            xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true)
            xmlhttp.timeout = 1000
            xmlhttp.onreadystatechange = async function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        actualVersion = xmlhttp.responseText;
                        resolve(void 0);
                    }
                    reject(_this.#handleError(5, `Ошибка при запросе актуальной версии плагина`, 'isActualVersionPlugin'))
                }
            }
            xmlhttp.send(null)
        })

        await _this._plugin.CreateObjectAsync("CAdESCOM.About")
            .catch(() => {
                throw _this.#handleError(5, `Ошибка при получении информации о текущем плагине`, 'isActualVersionPlugin')
            })
            .then((value) => value.Version)
            .then((version) => currentPluginVersion = version)

        this.isActualVersion = _this.#stringVersionCompare(actualVersion, currentPluginVersion)
        console.timeEnd('isActualVersionPlugin')

        return {
            cryptoDriverType: 1,
            isActualVersion: this.isActualVersion,
            currentVersion: currentPluginVersion,
            actualVersion: actualVersion.replace('\n', '')
        }
    }

    async loadPlugin() {
        if (this.isPluginLoaded) return
        try {
            this._plugin.set_log_level(this._plugin.LOG_LEVEL_ERROR)
            const canAsync = !!this._plugin.CreateObjectAsync
            console.log(`canAsync: ${canAsync}`);

            if (canAsync) {
                this._isAsync = true
                await this.#checkForPlugIn_Async()

            } else {
                this.#checkForPlugIn_NPAPI()
            }
            await this.#initialize()
        }

        catch (err) {
            if (err.method)
                throw err;
            throw this.#handleError(6, `Ошибка при загрузке плагина`, 'loadPlugin')
        }
    }

    async signCMS(data, certificateId, deviceId) {
        try {
            if (this._isAsync) {
                return await this.#signCMSAsync(data, certificateId, deviceId)

            } else {
                return this.#signCMSNPAPI(data, certificateId, deviceId)
            }
        }
        catch (err) {
            if (err.method)
                throw err;
            throw this.#handleError(2, `Ошибка при подписи`, 'loadPlugin')
        }
    }

    #stringVersionCompare(actualVersion, currentPluginVersion) {
        const actual = actualVersion.split('.');
        const current = currentPluginVersion.split('.');

        if (parseInt(current[0]) === parseInt(actual[0])) {
            if (parseInt(current[1]) === parseInt(actual[1])) {
                if (parseInt(current[2]) === parseInt(actual[2])) {
                    return true
                } else if (parseInt(current[2]) < parseInt(actual[2])) {
                    return false
                }
            } else if (parseInt(current[1]) < parseInt(actual[1])) {
                return false
            }
        } else if (parseInt(current[0]) < parseInt(actual[0])) {
            return false
        }

        return true
    }

    #makeVersionString(oVer) {
        let strVer
        if (typeof (oVer) == "string")
            return oVer
        else
            return oVer.MajorVersion + "." + oVer.MinorVersion + "." + oVer.BuildVersion
    }

    #versionCompare_NPAPI(StringVersion, ObjectVersion) {
        if (typeof (ObjectVersion) == "string")
            return -1
        const arr = StringVersion.split('.')

        if (ObjectVersion.MajorVersion == parseInt(arr[0])) {
            if (ObjectVersion.MinorVersion == parseInt(arr[1])) {
                if (ObjectVersion.BuildVersion == parseInt(arr[2])) {
                    return 0
                } else if (ObjectVersion.BuildVersion < parseInt(arr[2])) {
                    return -1
                }
            } else if (ObjectVersion.MinorVersion < parseInt(arr[1])) {
                return -1
            }
        } else if (ObjectVersion.MajorVersion < parseInt(arr[0])) {
            return -1
        }

        return 1
    }

    #getLatestVersion_NPAPI(currentPluginVersion) {
        const _this = this
        const xmlhttp = this.#getXmlHttp()
        try {
            xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true)
            xmlhttp.timeout = 1000
            xmlhttp.onreadystatechange = function () {
                let pluginBaseVersion
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        pluginBaseVersion = xmlhttp.responseText
                        if (_this.isPluginWorked) { // плагин работает, объекты создаются
                            if (_this.#versionCompare_NPAPI(pluginBaseVersion, currentPluginVersion) < 0) {
                                _this.isActualVersion = false
                                console.log("Actual version of plugin is: " + pluginBaseVersion)
                            }
                        } else { // плагин не работает, объекты не создаются
                            if (_this.isPluginLoaded) { // плагин загружен
                                if (!_this._isPluginEnabled) { // плагин загружен, но отключен
                                    console.log("Plugin is not enabled in web browser")
                                } else { // плагин загружен и включен, но объекты не создаются
                                    console.log("Check browser settings for plugin correct work")
                                }
                            } else { // плагин не загружен
                                _this.isPluginLoaded = false
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            _this.isActualVersion = true
            console.log("Couldn't check plugin version")
        }
        xmlhttp.send()
    }

    #checkForPlugIn_NPAPI() {
        let currentPluginVersion
        try {
            const oAbout = this._plugin.CreateObject("CAdESCOM.About")
            this.isPluginLoaded = true
            this._isPluginEnabled = true
            this.isPluginWorked = true

            // Это значение будет проверяться сервером при загрузке демо-страницы
            currentPluginVersion = oAbout.PluginVersion
            if (typeof (currentPluginVersion) == "undefined")
                currentPluginVersion = oAbout.Version
            this._currentPluginVersion = this.#makeVersionString(currentPluginVersion)

        } catch (err) {
            // Объект создать не удалось, проверим, установлен ли
            // вообще плагин. Такая возможность есть не во всех браузерах
            const mimetype = navigator.mimeTypes["application/x-cades"]
            if (mimetype) {
                this.isPluginLoaded = true
                const plugin = mimetype.enabledPlugin
                if (plugin) {
                    this._isPluginEnabled = true
                }
            }
        }
        this.#getLatestVersion_NPAPI(currentPluginVersion)

    }


    #getXmlHttp() {
        let xmlhttp
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (E) {
                xmlhttp = false
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest()
        }
        return xmlhttp
    }

    async #checkForPlugIn_Async() {
        const _this = this
        let currentPluginVersion
        await this._plugin
        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (args) {
                try {
                    let oAbout = yield _this._plugin.CreateObjectAsync("CAdESCOM.About")
                    currentPluginVersion = yield oAbout.PluginVersion
                    _this.#getLatestVersion_Async(currentPluginVersion).then(() => {
                        _this._isPluginEnabled = true
                        _this.isPluginLoaded = true
                        _this.isPluginWorked = true
                        return args[0]()
                    })

                }
                catch (reason) {
                    console.log(reason)
                    _this._isPluginEnabled = false
                    _this.isPluginLoaded = false
                    _this.isPluginWorked = false
                    return args[1]()
                }

            }, resolve, reject)
        }); //this.#plugin.async_spawn
    }


    async #versionCompare_Async(StringVersion, ObjectVersion) {
        const _this = this
        if (typeof (ObjectVersion) == "string")
            return -1
        const arr = StringVersion.split('.')
        let isActualVersion = true
        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (args) {
                if ((yield ObjectVersion.MajorVersion) == parseInt(arr[0])) {
                    if ((yield ObjectVersion.MinorVersion) == parseInt(arr[1])) {
                        if ((yield ObjectVersion.BuildVersion) == parseInt(arr[2])) {
                            isActualVersion = true
                            _this.isActualVersion = true
                        }
                        else if ((yield ObjectVersion.BuildVersion) < parseInt(arr[2])) {
                            _this.isActualVersion = false
                            isActualVersion = false
                        }
                    } else if ((yield ObjectVersion.MinorVersion) < parseInt(arr[1])) {
                        _this.isActualVersion = false
                        isActualVersion = false
                    }
                } else if ((yield ObjectVersion.MajorVersion) < parseInt(arr[0])) {
                    _this.isActualVersion = false
                    isActualVersion = false
                }

                // if (!isActualVersion) {
                //     console.log("There is newer version of plugin: " + (yield CurrentPluginVersion.toString()))
                // }
                let oAbout = yield _this._plugin.CreateObjectAsync("CAdESCOM.About")
                let ver = yield oAbout.CSPVersion("", 80)
                let ret = (yield ver.MajorVersion) + "." + (yield ver.MinorVersion) + "." + (yield ver.BuildVersion)
                _this._currentPluginVersion = ret

                try {
                    _this._scpName = yield oAbout.CSPName(80)
                }
                catch (err) {
                    console.log(err)
                }
                return args[0]()
            }, resolve, reject)
        }); //this.#plugin.async_spawn
    }

    async #getLatestVersion_Async(currentPluginVersion) {
        const _this = this
        return new Promise(function (resolve, reject) {
            const xmlhttp = _this.#getXmlHttp()
            xmlhttp.open("GET", "https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true)
            xmlhttp.timeout = 1000
            xmlhttp.onreadystatechange = async function () {
                let pluginBaseVersion
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        pluginBaseVersion = xmlhttp.responseText
                        await _this.#versionCompare_Async(pluginBaseVersion, currentPluginVersion)
                        resolve(void 0)
                    }
                    else
                        reject()
                }
            }
            xmlhttp.send(null)
        }).catch(err => {
            _this.isActualVersion = true
            console.log("Couldn't check plugin version")
        });
    }

    async #initialize() {
        await this.#getAllDevices()
        console.timeEnd('getAllDevices')
    }

    async #getAllDevices() {

        return await this.#getAllDevicesAsync()

    }


    async #getAllDevicesAsync() {
        const _this = this

        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (args) {
                let MyStoreExists = true
                let oStore
                let certCnt
                let oStoreCertificateList



                try {
                    oStore = yield _this._plugin.CreateObjectAsync("CAdESCOM.Store")
                    if (!oStore) {
                        console.error("Create store failed")
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
                        oStoreCertificateList = yield oStore.Certificates
                        certCnt = yield oStoreCertificateList.Count
                    }
                    catch (ex) {
                        console.log("Ошибка при получении Certificates или Count: " + _this._plugin.getLastError(ex))
                    }

                    for (let i = 1; i <= certCnt; i++) {
                        let certificateItem
                        try {
                            certificateItem = yield oStoreCertificateList.Item(i)

                            var certThumbprint = yield certificateItem.Thumbprint;
                            var foundIndex = _this._markedThumbprintContainer.indexOf(certThumbprint);
                            if (foundIndex > -1) {
                                console.log('первая итерация')
                                continue;
                            }
                            _this._markedThumbprintContainer.push(certThumbprint);


                            // let pubKey = yield certificateItem.PublicKey(),

                            //     algo = yield pubKey.Algorithm,
                            //     algoOid = yield algo.Value;


                            let now = new Date()



                            let validToDate = new Date((yield certificateItem.ValidToDate)),
                                validFromDate = new Date((yield certificateItem.ValidFromDate)),
                                certInBase64 = yield certificateItem.Export(_this._plugin.CADESCOM_ENCODE_BASE64);



                            let parsedCertificate: IParsedCertificate = {
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
                            }

                            _this._parsedCertificateList.push(parsedCertificate)

                        }
                        catch (ex) {
                            alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex))
                            reject(_this.#handleError(4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesAsync'))
                        }
                        _this._certList[i] = (certificateItem)

                    }


                    if (_this._certList.length > 0)
                        _this._deviceMap.set(0, _this._certList)
                    _this._certList = []

                    yield oStore.Close()


                }



                //getting certs from hardware

                /**
                 * дальше получаем контейнеры крипто ключей из CADESCOM_CONTAINER_STORE 
                 * - контейнерами могут выступать смарткарты, флешки файловые системы
                 * в теории один и тот же сертификат может быть установлен в оба хранилища
                 * поэтому нам требуется отфильтровать дубликаты
                 */
                try {
                    yield oStore.Open(_this._plugin.CADESCOM_CONTAINER_STORE)
                    oStoreCertificateList = yield oStore.Certificates
                    certCnt = yield oStoreCertificateList.Count

                } catch (e) {
                    yield oStore.Close()
                    console.log("Невозможно загрузить список сертификатов." + _this._plugin.getLastError(e))

                    reject(_this.#handleError(4, `Невозможно загрузить список сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI'))
                }

                if (certCnt == 0) {
                    console.log("Сертификаты на токенах не обнаружены")
                    yield oStore.Close()
                    return args[0]()

                }

                for (let i = 1; i <= certCnt; i++) {
                    let certificateItem
                    try {
                        certificateItem = yield oStoreCertificateList.Item(i)

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


                        let now = new Date()

                        let validToDate = new Date((yield certificateItem.ValidToDate)),
                            validFromDate = new Date((yield certificateItem.ValidFromDate)),
                            certInBase64 = yield certificateItem.Export(_this._plugin.CADESCOM_ENCODE_BASE64);


                        let parsedCertificate: IParsedCertificate = {
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
                        }

                        _this._parsedCertificateList.push(parsedCertificate)

                    }
                    catch (ex) {
                        alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex))
                        reject(_this.#handleError(4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesAsync'))
                    }
                    _this._certList[i] = (certificateItem)

                }


                if (_this._certList.length > 0) {
                    _this._deviceMap.set(1, _this._certList);
                }

                _this._certList = [];

                yield oStore.Close();

                return args[0]();

            }, resolve, reject)
        });
    }









    async #signCMSAsync(data, certificateId, deviceId) {
        const _this = this

        const certificate = _this._deviceMap.get(deviceId)[certificateId];

        let dataToSign

        return new Promise(function (resolve, reject) {
            _this._plugin.async_spawn(function* (arg) {

                if (!(data != undefined && data != null)) {
                    console.log("Data is null or undefined")

                    reject(_this.#handleError(2, 'Нечего подписывать', ' #signCMSAsync'));
                }

                if (typeof data === 'object') {
                    dataToSign = _this.#bytesToBase64(data);
                }
                else {
                    dataToSign = encode(data);
                }

                let Signature;

                try {
                    //FillCertInfo_Async(certificate);
                    let errormes
                    let oSigner
                    let oSigningTimeAttr
                    let oDocumentNameAttr
                    let oSignedData

                    try {
                        oSigner = yield _this._plugin.CreateObjectAsync("CAdESCOM.CPSigner")
                    } catch (err) {
                        console.log("Ошибка при создании объекта CAdESCOM.CPSigner");
                        errormes = "Failed to create CAdESCOM.CPSigner: " + err;

                        reject(_this.#handleError(2, errormes, ' #signCMSAsync'))
                    }

                    try {
                        oSigningTimeAttr = yield _this._plugin.CreateObjectAsync("CADESCOM.CPAttribute")
                    } catch (err) {
                        reject(_this.#handleError(2, err, ' #signCMSAsync'))
                    }

                    yield oSigningTimeAttr.propset_Name(_this._plugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME)
                    const oTimeNow = new Date()
                    yield oSigningTimeAttr.propset_Value(oTimeNow)
                    const attr = yield oSigner.AuthenticatedAttributes2
                    yield attr.Add(oSigningTimeAttr)

                    try {
                        oDocumentNameAttr = yield _this._plugin.CreateObjectAsync("CADESCOM.CPAttribute")
                    } catch (err) {
                        reject(_this.#handleError(2, err, ' #signCMSAsync'))
                    }

                    yield oDocumentNameAttr.propset_Name(_this._plugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME)
                    yield oDocumentNameAttr.propset_Value("Document Name");
                    yield attr.Add(oDocumentNameAttr);

                    if (oSigner) {
                        yield oSigner.propset_Certificate(certificate)
                    }
                    else {
                        errormes = "Failed to create CAdESCOM.CPSigner"
                        reject(_this.#handleError(2, errormes, ' #signCMSAsync'))
                    }

                    try {
                        oSignedData = yield _this._plugin.CreateObjectAsync("CAdESCOM.CadesSignedData")
                    } catch (err) {
                        reject(_this.#handleError(2, err, ' #signCMSAsync'))
                    }

                    // Отключаем проверку цепочки сертификатов пользователя
                    // yield oSigner.propset_Options(this.#plugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN)
                    yield oSigner.propset_Options(_this._plugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY)
                    yield oSignedData.propset_ContentEncoding(_this._plugin.CADESCOM_BASE64_TO_BINARY) //


                    yield oSignedData.propset_Content(dataToSign)

                    try {
                        Signature = yield oSignedData.SignCades(oSigner, _this._plugin.CADESCOM_CADES_BES, true)
                    }
                    catch (err) {
                        console.log('Ошибка при вызове метода oSignedData.SignCades, объект CAdESCOM.CadesSignedData')
                        errormes = "Ошибка при вызове метода oSignedData.SignCades, объект CAdESCOM.CadesSignedData \n Не удалось создать подпись из-за ошибки: " + JSON.stringify(err);
                        reject(_this.#handleError(2, errormes, ' #signCMSAsync'))
                    }

                    console.log("Подпись сформирована успешно:")
                    console.log(Signature)
                    return arg[0](Signature)
                }
                catch (err) {
                    console.error(err)

                    reject(_this.#handleError(2, err, ' #signCMSAsync'))
                }
            }, resolve, reject)
        });
    }


    #signCMSNPAPI(data, certificateId, deviceId) {
        const setDisplayData = true
        const _this = this
        const certificate = _this._deviceMap.get(deviceId)[certificateId]

        if (!isObject(data)) {
            alert("Data is null or undefined")
            return
        }


        const dataToSign = encode(data)
        let Signature

        try {
            let errormes
            let oSigner
            let oSigningTimeAttr
            let oDocumentNameAttr
            let oSignedData
            try {
                oSigner = _this._plugin.CreateObject("CAdESCOM.CPSigner")
            } catch (err) {
                errormes = "Failed to create CAdESCOM.CPSigner: " + err.number
                throw _this.#handleError(2, errormes, 'signCMSNPAPI');
            }
            try {
                oSigningTimeAttr = _this._plugin.CreateObject("CADESCOM.CPAttribute")
            } catch (err) {
                errormes = "Failed to create CADESCOM.CPAttribute: " + JSON.stringify(err)
                throw _this.#handleError(2, errormes, 'signCMSNPAPI');
            }

            oSigningTimeAttr.propset_Name(_this._plugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME)
            const oTimeNow = new Date()
            oSigningTimeAttr.propset_Value(oTimeNow)
            const attr = oSigner.AuthenticatedAttributes2
            attr.Add(oSigningTimeAttr)

            try {
                oDocumentNameAttr = _this._plugin.CreateObject("CADESCOM.CPAttribute")
            } catch (err) {
                errormes = "Failed to create CADESCOM.CPAttribute: " + JSON.stringify(err);
                throw _this.#handleError(2, errormes, 'signCMSNPAPI');
            }

            oDocumentNameAttr.propset_Name(_this._plugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME)
            oDocumentNameAttr.propset_Value("Document Name")
            attr.Add(oDocumentNameAttr)

            if (oSigner) {
                oSigner.propset_Certificate(certificate)
            }
            else {
                errormes = "Failed to create CAdESCOM.CPSigner"
                throw _this.#handleError(2, errormes, 'signCMSNPAPI');
            }
            try {
                oSignedData = _this._plugin.CreateObject("CAdESCOM.CadesSignedData")
            } catch (err) {
                errormes = "Failed to create CAdESCOM.CadesSignedData: " + JSON.stringify(err);
                throw _this.#handleError(2, errormes, 'signCMSNPAPI');
            }

            if (dataToSign) {
                // Отключаем проверку цепочки сертификатов пользователя
                // yield oSigner.propset_Options(this.#plugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN)
                oSigner.propset_Options(_this._plugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY)
                oSignedData.propset_ContentEncoding(_this._plugin.CADESCOM_BASE64_TO_BINARY) //
                if (typeof (setDisplayData) != 'undefined') {
                    //Set display data flag flag for devices like Rutoken PinPad
                    oSignedData.propset_DisplayData(1)
                }
                oSignedData.propset_Content(dataToSign)

                try {
                    Signature = oSignedData.SignCades(oSigner, _this._plugin.CADESCOM_CADES_BES)
                }
                catch (err) {
                    errormes = "Не удалось создать подпись из-за ошибки: " + JSON.stringify(err)
                    throw _this.#handleError(2, errormes, 'signCMSNPAPI');
                }
            }
            console.log("Подпись сформирована успешно:")
            console.log(Signature)
            return Signature
        }
        catch (err) {
            if (err.method)
                throw err;
            console.error(err)
            throw _this.#handleError(2, err, 'signCMSNPAPI');
        }
    }

    #getAllDevicesNPAPI() {
        const _this = this
        let MyStoreExists = true
        let oStore
        let certCnt
        let certs
        let isFound
        try {
            oStore = _this._plugin.CreateObject("CAdESCOM.Store")
            if (!oStore) {
                console.log("Create store failed")
                throw _this.#handleError(3, 'Create store failed', 'getAllDevicesNPAPI');
            }

            oStore.Open()
        }
        catch (ex) {
            MyStoreExists = false
            console.log("Ошибка при открытии хранилища: " + _this._plugin.getLastError(ex))
            throw _this.#handleError(3, `Ошибка при открытии хранилища: ${_this._plugin.getLastError(ex)}`, 'getAllDevicesNPAPI');
        }


        if (MyStoreExists) {
            try {
                certs = oStore.Certificates
                certCnt = certs.Count
            }
            catch (ex) {
                console.log("Ошибка при получении Certificates или Count: " + _this._plugin.getLastError(ex))
                throw _this.#handleError(3, `Ошибка при получении Certificates или Count: ${_this._plugin.getLastError(ex)}`, 'getAllDevicesNPAPI');
            }

            isFound = false
            for (let i = 1; i <= certCnt; i++) {
                let cert
                try {
                    cert = certs.Item(i)
                    for (var j = 0; j < _this._parsedCertificateList.length; j++) {
                        let certListTemp = _this._parsedCertificateList[j].thumbprint
                        let certTemp = cert.Thumbprint
                        if (deepEqual(certListTemp, certTemp)) {
                            isFound = true
                            break
                        }
                    }
                    if (isFound)
                        continue


                    let pubKey = cert.PublicKey(),
                        algo = pubKey.Algorithm,
                        algoOid = algo.Value

                    let now = new Date()

                    try {
                        let validToDate = new Date((cert.ValidToDate)),
                            validFromDate = new Date((cert.ValidFromDate)),
                            validator = cert.IsValid(),
                            isValid = validator.Result

                        let c: IParsedCertificate = {
                            validToDate: cert.ValidToDate,
                            validFromDate: cert.ValidFromDate,
                            subjectName: cert.SubjectName,
                            issuerName: cert.IssuerName,
                            thumbprint: cert.Thumbprint,
                            id: i,
                            isValid: now < validToDate && now >= validFromDate,
                            hasPrivateKey: cert.HasPrivateKey(),
                            serial: cert.SerialNumber,
                            b64: cert.Export(_this._plugin.CADESCOM_ENCODE_BASE64),
                            // algorythmOid: algoOid,
                            deviceId: 0
                        }
                        let isFoundParsed = false
                        for (let k = 0; k < _this._parsedCertificateList.length; k++) {
                            let parsedTemp = _this._parsedCertificateList[k]
                            if (deepEqual(parsedTemp, c))
                                isFoundParsed = true
                        }
                        if (!isFoundParsed)
                            _this._parsedCertificateList.push(c)

                    } catch (e) {
                        /*me.lastError = "Ошибка при получении свойства SubjectName: " + this.#plugin.getError(e)
                         me.certificateListReady = true*/
                    }
                }
                catch (ex) {
                    alert("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(ex))
                    throw _this.#handleError(4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(ex)}`, 'getAllDevicesNPAPI');
                }
                _this._certList.push(cert)

            }
            _this._deviceMap.set(0, _this._certList)
            _this._certList = []


            oStore.Close()
        }

        //getting certs from hardware

        try {
            oStore.Open(_this._plugin.CADESCOM_CONTAINER_STORE)
            certs = oStore.Certificates
            certCnt = certs.Count
        } catch (e) {
            oStore.Close()
            console.log("Невозможно загрузить список сертификатов." + _this._plugin.getLastError(e))
            throw _this.#handleError(4, `Невозможно загрузить список сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI');
        }

        if (certCnt == 0) {
            oStore.Close()

            console.log("Сертификаты на токенах не обнаружены")
            return
        }
        isFound = false

        for (let i = 1; i <= certCnt; i++) {
            let cert
            try {
                cert = certs.Item(i)
                for (let j = 0; j < _this._parsedCertificateList.length; j++) {
                    let certListTemp = _this._parsedCertificateList[j].thumbprint
                    let certTemp = cert.Thumbprint
                    if (deepEqual(certListTemp, certTemp)) {
                        isFound = true
                        break
                    }
                }
                if (isFound)
                    continue
            } catch (e) {
                oStore.Close()

                console.log("Ошибка при перечислении сертификатов: " + _this._plugin.getLastError(e))
                throw _this.#handleError(4, `Ошибка при перечислении сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI');
            }

            let pubKey = cert.PublicKey(),
                algo = pubKey.Algorithm,
                algoOid = algo.Value

            let now = new Date()

            try {
                let validToDate = new Date((cert.ValidToDate)),
                    validFromDate = new Date((cert.ValidFromDate)),
                    validator = cert.IsValid(),
                    isValid = validator.Result

                let c: IParsedCertificate = {
                    validToDate: cert.ValidToDate,
                    validFromDate: cert.ValidFromDate,
                    subjectName: cert.SubjectName,
                    issuerName: cert.IssuerName,
                    thumbprint: cert.Thumbprint,
                    id: i,
                    isValid: now < validToDate && now >= validFromDate,
                    hasPrivateKey: cert.HasPrivateKey(),
                    serial: cert.SerialNumber,
                    b64: cert.Export(_this._plugin.CADESCOM_ENCODE_BASE64),
                    // algorythmOid: algoOid,
                    deviceId: 1
                }
                console.log(cert)
                let isFoundParsed = false
                for (let k = 0; k < _this._parsedCertificateList.length; k++) {
                    let parsedTemp = _this._parsedCertificateList[k]
                    if (deepEqual(parsedTemp, c))
                        isFoundParsed = true
                }
                if (!isFoundParsed)
                    _this._parsedCertificateList.push(c)

            } catch (e) {
                console.log("Ошибка при парсинге сертификатов: " + _this._plugin.getLastError(e))
                throw _this.#handleError(4, `Ошибка при парсинге сертификатов ${_this._plugin.getLastError(e)}`, 'getAllDevicesNPAPI');
            }
            _this._certList.push(cert)
        }
        _this._deviceMap.set(1, _this._certList)
        _this._certList = []

        oStore.Close()
    }

    #bytesToBase64(arrayBuffer) {
        return btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
        // return btoa(String.fromCharCode(arrayBuffer));
    }

    #handleError(code, message, method) {
        let error = {
            code: code,
            message: message,
            description: 'Неизвестная ошибка',
            method,
            cryptoDriverType: 1
        }
        switch (code) {
            case 2:
                error.description = 'Ошибка подписи'
                break;
            case 3:
                error.description = 'Ошибка при получении устройств'
                break;
            case 4:
                error.description = 'Проблемы при обнаружении сертификатов'
                break;
            case 5:
                error.description = 'Ошибка определения актуальности плагина'
                break;
            case 6:
                error.description = 'Ошибка загрузки плагина'
                break;
            default:
                error.code = 1
                break;
        }

        return error;
    }



}
