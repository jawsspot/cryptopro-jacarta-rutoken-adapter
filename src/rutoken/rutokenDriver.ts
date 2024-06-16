import { IParsedCertificate } from "../interfaces/certificate.interface";
import { ICryptoDriverError } from "../interfaces/crypto-driver-error.interface";
import { IPluginData } from "../interfaces/plugin-data.interface";
import { encode } from "../utils/encode";
import { rutoken } from "./rutoken";
export class RutokenDriver {
    public parsedCertificates: IParsedCertificate[] = []

    public isPluginInstalled = false;
    public isPluginLoaded = false;

    public pluginVersion: string;


    private _rutoken
    private _plugin: any
    private _deviceList = []
    private _deviceMap: Map<number, any> = new Map();
    private _errors = [];
    private _selectedCertificate
    private _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

    constructor() {
        this._rutoken = rutoken
    }

    public async isActualVersionPlugin(): Promise<IPluginData> {
        try {
            let _this = this
            let currentPluginVersion;

            await new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://download.rutoken.ru/Rutoken_Plugin/Current/version.txt', true)
                xhr.onreadystatechange = async function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            this['actualVersion'] = xhr.responseText.split('Version: v.')[1].split('Release')[0].replace(/\s+/g, '');

                            resolve(void 0);
                        }
                        reject(_this.handleError(5, `Ошибка при запросе актуальной версии плагина`, 'isActualVersionPlugin'))
                    }
                }
                xhr.send()
            })
            currentPluginVersion = this._plugin.version.toString()

            return {
                cryptoDriverType: 2,
                isActualVersion: this.stringVersionCompare(this.pluginVersion, currentPluginVersion),
                currentVersion: currentPluginVersion,
                actualVersion: this.pluginVersion
            }
        }

        catch (err) {
            throw err
        }
    }

    public async loadPlugin(): Promise<void> {
        if (this.isPluginLoaded) {
            return
        }

        try {
            let isRutokenReady: boolean;

            await this._rutoken.ready;

            if (window.chrome || typeof window.InstallTrigger !== 'undefined') {
                isRutokenReady = await this._rutoken.isExtensionInstalled()
            }
            else {
                isRutokenReady = true
            }
            if (isRutokenReady) {
                this.isPluginInstalled = await this._rutoken.isPluginInstalled()
            }
            if (!this.isPluginInstalled)
                return

            this._plugin = await this._rutoken.loadPlugin();

            this.loadErrorCodes();

            await this.initialize()

            await this.getLastRtPluginVersion()


            if (this._plugin)
                this.isPluginLoaded = true
        }
        catch (reason) {
            if (reason.method)
                throw reason;
            console.log(this._errors[reason.message])
            throw this.handleError(6, this._errors[reason.message] || reason.message, 'loadPlugin')
        }
    }

    public async reloadDevices(): Promise<void> {
        try {
            this._deviceList = []
            this._deviceMap.clear();
            this.parsedCertificates = []
            await this.initialize()
        }

        catch (reason) {
            if (reason.method)
                throw reason;
            console.log(this._errors[reason.message])
            throw this.handleError(3, this._errors[reason.message] || reason.message, 'reloadDevices')
        }
    }

    public async signCMS(data, certificateId, deviceId): Promise<string> {
        let dataToSign
        let CMS

        const options = {
            "detached": true,
            "addSignTime": true
        }

        try {
            // Получение текста для подписи

            if (data.length == 0) {

                console.log("Data to sign is null")
                return
            }

            if (typeof data === 'object') {
                dataToSign = this.bytesToBase64(data)
            }
            else {
                dataToSign = encode(data)
            }
            console.log('before  bindToken if')
            if (!await this.bindToken(deviceId)) {
                console.log('return from bindToken if')
                return
            }

            CMS = await this._plugin.sign(deviceId, certificateId, dataToSign, this._plugin.DATA_FORMAT_BASE64, options)

            console.log(CMS)

            // Закрытие сессии
            await this._plugin.logout(deviceId)
        }
        catch (reason) {

            if (reason.code === 10) {
                throw this.handleError(2, reason.message, 'signCMS');
            }
            throw this.handleError(2, this._errors[reason.message] || reason.message, 'signCMS')
        }
        return CMS
    }

    private stringVersionCompare(actualVersion, currentPluginVersion): boolean {
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


    private async getLastRtPluginVersion(): Promise<void> {
        let _this = this
        const xhr = new XMLHttpRequest()

        xhr.open('GET', 'https://download.rutoken.ru/Rutoken_Plugin/Current/version.txt', true)
        xhr.onreadystatechange = async function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                _this.pluginVersion = await this.response.split('Version: v.')[1].split('Release')[0].replace(/\s+/g, '');

            }
        }
        xhr.send()
    }

    private async initialize() {
        await this.getAllDevices();
        await this.getAllCertificates();
        for (var [key, value] of this._deviceMap) {
            for (let j = 0; j < value.length; j++) {
                await this.getCertificateInfo(key, value[j])
            }
        }
    }

    private async getAllDevices() {
        try {
            this._deviceList = await this._plugin.enumerateDevices();
            return this._deviceList
        }
        catch (e) {
            throw this.handleError(3, this._errors[e.message] || e.message, 'getAllDevices')
        }
    }

    private async getAllCertificates(): Promise<Map<number, any>> {
        try {
            if (!this._deviceList.length)
                return

            for (let i = 0; i < this._deviceList.length; i++) {
                console.log('device')
                console.log(this._deviceList[i])
                let certificate = await this._plugin.enumerateCertificates(this._deviceList[i], this._plugin.CERT_CATEGORY_USER)
                this._deviceMap.set(this._deviceList[i], certificate);

            }

            return this._deviceMap
        }
        catch (e) {
            throw this.handleError(4, this._errors[e.message] || e.message, 'getAllCertificates')
        }
    }

    private async getCertificateInfo(deviceId, certificateId): Promise<IParsedCertificate> {
        try {
            this._selectedCertificate = { "deviceId": deviceId, "certificateId": certificateId }
            const certificate = await this._plugin.parseCertificate(deviceId, certificateId);

            return this.parseCertificate(certificate)
        }
        catch (e) {
            if (e.method)
                throw e;

            throw this.handleError(4, this._errors[e.message] || e.message, 'getAllCertificates')
        }
    }

    private async parseCertificate(certificate): Promise<IParsedCertificate> {
        let inn = this.getValueFromCertificate(certificate.subject, 'INN'),
            ogrnip = this.getValueFromCertificate(certificate.subject, 'OGRNIP'),
            ogrn = this.getValueFromCertificate(certificate.subject, 'OGRN'),
            snils = this.getValueFromCertificate(certificate.subject, 'SNILS'),
            surname = this.getValueFromCertificate(certificate.subject, 'surname'),
            nameAndPatronymic = this.getValueFromCertificate(certificate.subject, 'givenName'),
            issuerCN = this.getValueFromCertificate(certificate.issuer, 'commonName'),
            ownerCN = this.getValueFromCertificate(certificate.subject, 'commonName'),
            innLe = this.getValueFromCertificate(certificate.subject, 'INNLE') || inn,
            subjectString = '', issuerString = '';

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
        let certPem = await this._plugin.getCertificate(this._selectedCertificate.deviceId, this._selectedCertificate.certificateId)
        let parsedCertificate: IParsedCertificate = {
            validToDate: new Date(certificate.validNotAfter).toUTCString(),
            validFromDate: new Date(certificate.validNotBefore).toUTCString(),
            subjectName: subjectString,
            issuerName: issuerString,
            id: this._selectedCertificate.certificateId,
            isValid: now <= new Date(certificate.validNotAfter) && now >= new Date(certificate.validNotBefore),
            hasPrivateKey: true,
            serial: certificate.serialNumber,
            b64: certPem,
            thumbprint: this._selectedCertificate.certificateId.replace(/:/g, '').toUpperCase(),
            deviceId: this._selectedCertificate.deviceId
        }
        let isFoundParsed = false
        for (let k = 0; k < this.parsedCertificates.length; k++) {
            let parsedTemp = this.parsedCertificates[k];

            if (parsedTemp.thumbprint === parsedCertificate.thumbprint)
                isFoundParsed = true
        }
        if (!isFoundParsed)
            this.parsedCertificates.push(parsedCertificate)

        return parsedCertificate;
    }

    private getValueFromCertificate(arr, key) {

        let i = 0, cnt = arr.length

        for (; i < cnt; i++) {
            if (arr[i].rdn == key) {
                return arr[i].value
            }
        }

        return ''
    }



    private async bindToken(deviceId): Promise<boolean> {
        try {
            let isLoggedIn = await this._plugin.getDeviceInfo(deviceId, this._plugin.TOKEN_INFO_IS_LOGGED_IN)

            if (isLoggedIn)
                return true

            await this._plugin.login(deviceId, prompt("Введите pin"))

            return true
        }
        catch (e) {
            throw this.handleError(2, this._errors[e.message] ?? e, 'bindToken')
        }
    }

    private loadErrorCodes() {
        this._errors[this._plugin.errorCodes.UNKNOWN_ERROR] = "Неизвестная ошибка"
        this._errors[this._plugin.errorCodes.BAD_PARAMS] = "Неправильные параметры"
        this._errors[this._plugin.errorCodes.NOT_ENOUGH_MEMORY] = "Недостаточно памяти"
        this._errors[this._plugin.errorCodes.DEVICE_NOT_FOUND] = "Устройство не найдено"
        this._errors[this._plugin.errorCodes.DEVICE_ERROR] = "Ошибка устройства"
        this._errors[this._plugin.errorCodes.TOKEN_INVALID] = "Ошибка чтения/записи устройства. Возможно, устройство было извлечено. %device-step%"
        this._errors[this._plugin.errorCodes.CERTIFICATE_CATEGORY_BAD] = "Недопустимый тип сертификата"
        this._errors[this._plugin.errorCodes.CERTIFICATE_EXISTS] = "Сертификат уже существует на устройстве"
        this._errors[this._plugin.errorCodes.CERTIFICATE_NOT_FOUND] = "Сертификат не найден"
        this._errors[this._plugin.errorCodes.CERTIFICATE_HASH_NOT_UNIQUE] = "Хэш сертификата не уникален"
        this._errors[this._plugin.errorCodes.CA_CERTIFICATES_NOT_FOUND] = "Корневые сертификаты не найдены"
        this._errors[this._plugin.errorCodes.CERTIFICATE_VERIFICATION_ERROR] = "Ошибка проверки сертификата"
        this._errors[this._plugin.errorCodes.PKCS11_LOAD_FAILED] = "Не удалось загрузить PKCS#11 библиотеку"
        this._errors[this._plugin.errorCodes.PIN_LENGTH_INVALID] = "Некорректная длина PIN-кода"
        this._errors[this._plugin.errorCodes.PIN_INCORRECT] = "Некорректный PIN-код"
        this._errors[this._plugin.errorCodes.PIN_LOCKED] = "PIN-код заблокирован"
        this._errors[this._plugin.errorCodes.PIN_CHANGED] = "PIN-код был изменен"
        this._errors[this._plugin.errorCodes.SESSION_INVALID] = "Состояние токена изменилось"
        this._errors[this._plugin.errorCodes.USER_NOT_LOGGED_IN] = "Выполните вход на устройство"
        this._errors[this._plugin.errorCodes.ALREADY_LOGGED_IN] = "Вход на устройство уже был выполнен"
        this._errors[this._plugin.errorCodes.ATTRIBUTE_READ_ONLY] = "Свойство не может быть изменено"
        this._errors[this._plugin.errorCodes.KEY_NOT_FOUND] = "Соответствующая сертификату ключевая пара не найдена"
        this._errors[this._plugin.errorCodes.KEY_ID_NOT_UNIQUE] = "Идентификатор ключевой пары не уникален"
        this._errors[this._plugin.errorCodes.CEK_NOT_AUTHENTIC] = "Выбран неправильный ключ"
        this._errors[this._plugin.errorCodes.KEY_LABEL_NOT_UNIQUE] = "Метка ключевой пары не уникальна"
        this._errors[this._plugin.errorCodes.WRONG_KEY_TYPE] = "Неправильный тип ключа"
        this._errors[this._plugin.errorCodes.LICENCE_READ_ONLY] = "Лицензия доступна только для чтения"
        this._errors[this._plugin.errorCodes.DATA_INVALID] = "Неверные данные"
        this._errors[this._plugin.errorCodes.UNSUPPORTED_BY_TOKEN] = "Операция не поддерживается токеном"
        this._errors[this._plugin.errorCodes.KEY_FUNCTION_NOT_PERMITTED] = "Операция запрещена для данного типа ключа"
        this._errors[this._plugin.errorCodes.BASE64_DECODE_FAILED] = "Ошибка декодирования даных из BASE64"
        this._errors[this._plugin.errorCodes.PEM_ERROR] = "Ошибка разбора PEM"
        this._errors[this._plugin.errorCodes.ASN1_ERROR] = "Ошибка декодирования ASN1 структуры"
        this._errors[this._plugin.errorCodes.FUNCTION_REJECTED] = "Операция отклонена пользователем"
        this._errors[this._plugin.errorCodes.FUNCTION_FAILED] = "Невозможно выполнить операцию"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT] = "Невозможно получить сертификат подписанта"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_GET_CRL] = "Невозможно получить CRL"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_DECRYPT_CERT_SIGNATURE] = "Невозможно расшифровать подпись сертификата"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_DECRYPT_CRL_SIGNATURE] = "Невозможно расшифровать подпись CRL"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY] = "Невозможно раскодировать открытый ключ эмитента"
        this._errors[this._plugin.errorCodes.X509_CERT_SIGNATURE_FAILURE] = "Неверная подпись сертификата"
        this._errors[this._plugin.errorCodes.X509_CRL_SIGNATURE_FAILURE] = "Неверная подпись CRL"
        this._errors[this._plugin.errorCodes.X509_CERT_NOT_YET_VALID] = "Срок действия сертификата еще не начался"
        this._errors[this._plugin.errorCodes.X509_CRL_NOT_YET_VALID] = "Срок действия CRL еще не начался"
        this._errors[this._plugin.errorCodes.X509_CERT_HAS_EXPIRED] = "Срок действия сертификата истек"
        this._errors[this._plugin.errorCodes.X509_CRL_HAS_EXPIRED] = "Срок действия CRL истек"
        this._errors[this._plugin.errorCodes.X509_ERROR_IN_CERT_NOT_BEFORE_FIELD] = "Некорректные данные в поле \"notBefore\" у сертификата"
        this._errors[this._plugin.errorCodes.X509_ERROR_IN_CERT_NOT_AFTER_FIELD] = "Некорректные данные в поле \"notAfter\" у сертификата"
        this._errors[this._plugin.errorCodes.X509_ERROR_IN_CRL_LAST_UPDATE_FIELD] = "Некорректные данные в поле \"lastUpdate\" у CRL"
        this._errors[this._plugin.errorCodes.X509_ERROR_IN_CRL_NEXT_UPDATE_FIELD] = "Некорректные данные в поле \"nextUpdate\" у CRL"
        this._errors[this._plugin.errorCodes.X509_OUT_OF_MEM] = "Нехватает памяти"
        this._errors[this._plugin.errorCodes.X509_DEPTH_ZERO_SELF_SIGNED_CERT] = "Недоверенный самоподписанный сертификат"
        this._errors[this._plugin.errorCodes.X509_SELF_SIGNED_CERT_IN_CHAIN] = "В цепочке обнаружен недоверенный самоподписанный сертификат"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_GET_ISSUER_CERT_LOCALLY] = "Невозможно получить локальный сертификат подписанта"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_VERIFY_LEAF_SIGNATURE] = "Невозможно проверить первый сертификат"
        this._errors[this._plugin.errorCodes.X509_CERT_CHAIN_TOO_LONG] = "Слишком длинная цепочка сертификатов"
        this._errors[this._plugin.errorCodes.X509_CERT_REVOKED] = "Сертификат отозван"
        this._errors[this._plugin.errorCodes.X509_INVALID_CA] = "Неверный корневой сертификат"
        this._errors[this._plugin.errorCodes.X509_INVALID_NON_CA] = "Неверный некорневой сертфикат, помеченный как корневой"
        this._errors[this._plugin.errorCodes.X509_PATH_LENGTH_EXCEEDED] = "Превышена длина пути"
        this._errors[this._plugin.errorCodes.X509_PROXY_PATH_LENGTH_EXCEEDED] = "Превышина длина пути прокси"
        this._errors[this._plugin.errorCodes.X509_PROXY_CERTIFICATES_NOT_ALLOWED] = "Проксирующие сертификаты недопустимы"
        this._errors[this._plugin.errorCodes.X509_INVALID_PURPOSE] = "Неподдерживаемое назначение сертификата"
        this._errors[this._plugin.errorCodes.X509_CERT_UNTRUSTED] = "Недоверенный сертификат"
        this._errors[this._plugin.errorCodes.X509_CERT_REJECTED] = "Сертифкат отклонен"
        this._errors[this._plugin.errorCodes.X509_APPLICATION_VERIFICATION] = "Ошибка проверки приложения"
        this._errors[this._plugin.errorCodes.X509_SUBJECT_ISSUER_MISMATCH] = "Несовпадения субъекта и эмитента"
        this._errors[this._plugin.errorCodes.X509_AKID_SKID_MISMATCH] = "Несовпадение идентификатора ключа у субьекта и доверенного центра"
        this._errors[this._plugin.errorCodes.X509_AKID_ISSUER_SERIAL_MISMATCH] = "Несовпадение серийного номера субьекта и доверенного центра"
        this._errors[this._plugin.errorCodes.X509_KEYUSAGE_NO_CERTSIGN] = "Ключ не может быть использован для подписи сертификатов"
        this._errors[this._plugin.errorCodes.X509_UNABLE_TO_GET_CRL_ISSUER] = "Невозможно получить CRL подписанта"
        this._errors[this._plugin.errorCodes.X509_UNHANDLED_CRITICAL_EXTENSION] = "Неподдерживаемое расширение"
        this._errors[this._plugin.errorCodes.X509_KEYUSAGE_NO_CRL_SIGN] = "Ключ не может быть использован для подписи CRL"
        this._errors[this._plugin.errorCodes.X509_KEYUSAGE_NO_DIGITAL_SIGNATURE] = "Ключ не может быть использован для цифровой подписи"
        this._errors[this._plugin.errorCodes.X509_UNHANDLED_CRITICAL_CRL_EXTENSION] = "Неподдерживаемое расширение CRL"
        this._errors[this._plugin.errorCodes.X509_INVALID_EXTENSION] = "Неверное или некорректное расширение сертификата"
        this._errors[this._plugin.errorCodes.X509_INVALID_POLICY_EXTENSION] = "Неверное или некорректное расширение политик сертификата"
        this._errors[this._plugin.errorCodes.X509_NO_EXPLICIT_POLICY] = "Явные политики отсутствуют"
        this._errors[this._plugin.errorCodes.X509_DIFFERENT_CRL_SCOPE] = "Другая область CRL"
        this._errors[this._plugin.errorCodes.X509_UNSUPPORTED_EXTENSION_FEATURE] = "Неподдерживаемое расширение возможностей"
        this._errors[this._plugin.errorCodes.X509_UNNESTED_RESOURCE] = "RFC 3779 неправильное наследование ресурсов"
        this._errors[this._plugin.errorCodes.X509_PERMITTED_VIOLATION] = "Неправильная структура сертификата"
        this._errors[this._plugin.errorCodes.X509_EXCLUDED_VIOLATION] = "Неправильная структура сертфиката"
        this._errors[this._plugin.errorCodes.X509_SUBTREE_MINMAX] = "Неправильная структура сертификата"
        this._errors[this._plugin.errorCodes.X509_UNSUPPORTED_CONSTRAINT_TYPE] = "Неправильная структура сертфиката"
        this._errors[this._plugin.errorCodes.X509_UNSUPPORTED_CONSTRAINT_SYNTAX] = "Неправильная структура сертификата"
        this._errors[this._plugin.errorCodes.X509_UNSUPPORTED_NAME_SYNTAX] = "Неправильная структура сертфиката"
        this._errors[this._plugin.errorCodes.X509_CRL_PATH_VALIDATION_ERROR] = "Неправильный путь CRL"
    }



    private bytesToBase64(arrayBuffer): string {
        return btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));

    }

    private handleError(code, message, method): ICryptoDriverError {
        let error = {
            code,
            description: 'Неизвестная ошибка',
            message,
            method,
            cryptoDriverType: 2
        }
        switch (code) {
            case 2:
                if (message.error === 'Could not execute command') {
                    error.description = "Пользователь отменил ввод пин-кода"
                    error.code = 18
                    break;
                }
                error.description = 'Ошибка подписи'
                break;
            case 3:
                error.description = 'Ошибка при получении устройств'
                break;
            case 4:
                error.code = 4
                error.description = 'Проблемы при обнаружении сертификатов'
                break;
            case 5:
                error.code = 5
                error.description = 'Ошибка определения актуальности плагина'
                break;
            case 6:
                error.description = 'Ошибка загрузки плагина'
                break;
            default:
                switch (message) {
                    case "Некорректная длина PIN-кода":
                        error.description = "Введен PIN-код некорректной длины";
                        error.code = 8
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
                        error.description = "сертификат не обнаружен"
                        error.code = 14
                        break;
                    case "Вход на устройство уже был выполнен":
                        error.code = 15
                        break;
                    case "Недопустимый тип сертификата":
                        error.description = "Недопустимый тип сертификата"
                        error.code = 16;
                        break;
                    case "PIN-код заблокирован":
                        error.description = "PIN-код заблокирован"
                        error.code = 17
                        break;
                    case "Пользователь отменил ввод пин-кода":
                        error.description = "Пользователь отменил ввод пин-кода"
                        error.code = 18
                        break;
                    case "Выполните вход на устройство":
                        error.description = "Выполните вход на устройство"
                        error.code = 19
                        break;
                    default:
                        error.code = 1;
                        break;
                }
                break;
        }

        return error;
    }
}
