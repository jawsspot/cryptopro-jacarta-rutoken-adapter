import { IParsedCertificate } from "../interfaces/certificate.interface";
import { ICryptoDriverError } from "../interfaces/crypto-driver-error.interface";
import { IPluginData } from "../interfaces/plugin-data.interface";
import { encode } from "../utils/encode";

declare const JCWebClient2;
export class JacartaDriver {
    public parsedCertificates: IParsedCertificate[] = [];

    public isPluginInstalled = false;
    public isPluginLoaded = false;

    public pluginVersion: string;

    private _plugin;
    private _deviceList = [];
    private _deviceMap = new Map()
    private _certList = [];
    private _selectedCertificate
    private _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    private _callback;

    public async isActualVersionPlugin(): Promise<IPluginData> {
        try {
            let actualVersion = '4.3.2';
            let currentPluginVersion = await this.pluginVersion

            return {
                cryptoDriverType: 3,
                isActualVersion: this._stringVersionCompare(actualVersion, currentPluginVersion),
                currentVersion: currentPluginVersion,
                actualVersion: actualVersion
            }
        }
        catch (err) {
            throw this.handleError(5, err.message, 'isActualVersionPlugin')
        }
    }

    public async loadPlugin(): Promise<void> {
        if (this.isPluginLoaded) return
        try {
            await this.loadJC()
        }
        catch (err) {
            throw this.handleError(6, err.message, 'loadPlugin')
        }

    }

    public async reloadDevices() {
        try {
            this._certList = []
            this._deviceList = []
            this._deviceMap.clear
            this.parsedCertificates = []
            this.initialize()
        }
        catch (err) {
            if (err.method)
                throw err;
            throw this.handleError(1, err.message, 'reloadDevices')
        }
    }

    public addCallback(cb) {
        this._callback = cb
    }

    public async signCMS(data, certificateId, deviceId) {
        let CMS
        let isBinded = false
        let loggedInToken = this._plugin.getLoggedInState()
        let dataToSign
        if (loggedInToken.tokenID != deviceId || loggedInToken.state == 0) {
            if (!isBinded) {
                try {
                    this._plugin.bindToken({ args: { tokenID: deviceId, useUI: true } })


                }
                catch (reason) {
                    throw this.handleError(2, reason.message, 'signCMS')
                }
            }
        }

        try {

            if (typeof data === 'object') {
                dataToSign = this.bytesToBase64(data)
            }
            else {
                dataToSign = encode(data)
            }

            CMS = this._plugin.signBase64EncodedData({
                args: {
                    contID: certificateId,
                    data: dataToSign,
                    attachedSignature: false,
                    addSigningTime: true
                }
            })

        }
        catch (reason) {
            if (reason.method)
                throw reason;
            throw this.handleError(2, reason.message, 'signCMS')
        }
        console.log(CMS);

        return CMS
    }

    public addListener(): void {
        this._plugin.addEventListener("slotAdded", (slotID) => {
            this.handleSlotAdded("Slot has been added: " + slotID);
        })
    }

    public handleSlotAdded(input) {
        console.log(input)
        this.reloadDevices()
        if (typeof this._callback === 'function')
            this._callback(input)
    }

    private _stringVersionCompare(actualVersion, currentPluginVersion) {
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

    private async loadJC() {
        const _this = this

        return new Promise<void>(function (resolve, reject) {
            const s: HTMLScriptElement = document.createElement('script');
            let r = false;
            s.type = 'text/javascript';
            s.src = 'https://localhost:24738/JCWebClient.js';
            s.async = true;
            s.onerror = function (err) {
                _this.isPluginInstalled = false;
                _this.isPluginLoaded = false;

                reject(err);
            };
            s.onload = async function () {
                if (!r && (!document.readyState || document.readyState == 'complete')) {
                    if (typeof (JCWebClient2) === 'undefined') {
                        _this.isPluginInstalled = false;
                        _this.isPluginLoaded = false;

                        reject();
                    }
                    r = true;
                    _this.isPluginInstalled = true
                    _this.isPluginLoaded = true
                    _this._plugin = JCWebClient2
                    _this.addListener()
                    _this._plugin.initialize()
                    _this.initialize()
                    _this.pluginVersion = await _this._plugin.getJCWebClientVersion();

                    resolve();
                }
            };
            const t = document.getElementsByTagName('script')[0];
            t.parentElement.insertBefore(s, t);
        });
    }




    private initialize() {
        try {
            const allDevices = this._plugin.getAllSlots()
            for (let index = 0; index < allDevices.length; index++) {
                this._deviceList.push(allDevices[index].id)

            }
            this._deviceList.forEach(element => {
                let tempCerts = []
                let certificate = this._plugin.getContainerList({ args: { tokenID: element } })
                for (let j = 0; j < certificate.length; j++) {

                    this._certList.push(certificate[j].id)
                    tempCerts.push(certificate[j].id)
                }
                this._deviceMap.set(element, tempCerts)
            });

            for (var [key, value] of this._deviceMap) {
                for (let j = 0; j < value.length; j++) {
                    this.getCertificateInfo(key, value[j])
                }
            }
        }
        catch (reason) {
            throw this.handleError(1, reason.message || reason, 'initialize')
        }
    }

    private getCertificateInfo(deviceId, certificateId) {
        let prepocessedCertificate
        try {
            this._selectedCertificate = { "deviceId": deviceId, "certificateId": certificateId }

            const certificate = this._plugin.parseX509Certificate({ args: { tokenID: deviceId, id: certificateId } })
            prepocessedCertificate = this.preprocessCertificate(certificate)
        }
        catch (reason) {
            if (reason.method)
                throw reason;
            throw this.handleError(1, reason.message || reason, 'getCertificateInfo')
        }
        return this.parseCertificate(prepocessedCertificate)
    }

    private preprocessCertificate(certificate) {
        let res: any = {},
            parts: any = {},
            sLength = certificate.Data.Subject.length,
            iLength = certificate.Data.Issuer.length,
            i = 0, j = 0;
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

        return res
    }
    private parseCertificate(certificate) {
        let subjectString = '', issuerString = '';

        let inn = this._getValueFromCertificate(certificate.subject, 'INN'),
            innLe = this._getValueFromCertificate(certificate.subject, 'INNLE') || inn,
            ogrnip = this._getValueFromCertificate(certificate.subject, 'OGRNIP'),
            ogrn = this._getValueFromCertificate(certificate.subject, 'OGRN'),
            snils = this._getValueFromCertificate(certificate.subject, 'SNILS'),
            surname = this._getValueFromCertificate(certificate.subject, 'SN'),
            nameAndPatronymic = this._getValueFromCertificate(certificate.subject, 'GN'),
            issuerCN = this._getValueFromCertificate(certificate.issuer, 'CN'),
            ownerCN = this._getValueFromCertificate(certificate.subject, 'CN');

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

        let parsedCertificate: IParsedCertificate = ({
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
        let isFoundParsed = false
        for (let k = 0; k < this.parsedCertificates.length; k++) {
            let parsedTemp = this.parsedCertificates[k]
            if (parsedTemp.thumbprint === parsedCertificate.thumbprint) {
                isFoundParsed = true
            }
        }
        if (!isFoundParsed)
            this.parsedCertificates.push(parsedCertificate)
    }

    private _bufferSerialToHex(serial) {
        const serialString = serial.replace(/(\[|\]|\s)/g, '');
        const serialArray = serialString.split(',').map(v => +v);
        const resultHex = Buffer.from(serialArray).toString('hex').toUpperCase();

        return resultHex;
    }

    private _getValueFromCertificate(certificate, key) {
        if (typeof certificate[key] != "undefined") {
            return certificate[key];
        }

        return '';
    }

    private _getCertificateInPem(deviceId, certificateId) {
        try {
            let certInBase64 = this._certFromBytesToBase64(this._plugin.getCertificateBody({ args: { tokenID: deviceId, id: certificateId } }))
            const lineBreak = '\n'
            let count = 0
            for (let i = 64; i <= certInBase64.length; i += 64 + count) {
                certInBase64 = [certInBase64.slice(0, i), lineBreak, certInBase64.slice(i)].join('')
                count = 1
            }
            const begin = '-----BEGIN CERTIFICATE-----\n'
            const end = '\n-----END CERTIFICATE-----'
            return begin + certInBase64 + end
        }
        catch (err) {
            throw this.handleError(1, err.message || err, 'getCertificateInPem')
        }
    }









    private handleError(code, message, method): ICryptoDriverError {
        let error = {
            code,
            description: 'Неизвестная ошибка',
            message,
            method,
            cryptoDriverType: 3,
        }
        switch (code) {
            case 2:
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
                    case "CKR_FUNCTION_CANCELED":
                        error.description = "Операция отменена";
                        error.code = 7;
                        break;
                    case "CKR_PIN_LEN_RANGE":
                        error.description = "Введен PIN-код некорректной длины";
                        error.code = 8
                        break;
                    case "CKR_PIN_INCORRECT":
                        error.description = "Введен некорректный PIN-код";
                        error.code = 9
                        break;
                    case "CKR_SIGNATURE_PIN_INCORRECT":
                        error.description = "Введен некорректный PIN-код подписи";
                        error.code = 10
                        break;
                    case "NOT_STATE_NOT_BINDED":
                        error.code = 11
                        error.description = "Для выполнения операции нужно \"отвязать\" токен";
                        break;
                    case "CKR_HOST_MEMORY":
                        error.description = "Недостаточно памяти для выполнения функции";
                        error.code = 13
                        break;
                    case "CERTIFICATE_NOT_FOUND":
                        error.description = "сертификат не обнаружен"
                        error.code = 14
                        break;
                    case "USER_CANCELED_PIN":
                        error.description = "Пользователь отменил ввод пин кода"
                        error.code = 15
                        break;
                    default:
                        error.code = 1
                        break;
                }
                break;
        }

        return error;
    }

    private bytesToBase64(arrayBuffer) {
        return btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
        // return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
        // return btoa(String.fromCharCode(arrayBuffer));
    }
    private _certFromBytesToBase64(arrayBuffer) {
        return btoa(String.fromCharCode(...new Uint32Array(arrayBuffer)));
    }
}
