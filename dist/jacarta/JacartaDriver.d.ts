import { IParsedCertificate } from "../interfaces/certificate.interface";
export declare class JacartaDriver {
    #private;
    parsedCertificates: IParsedCertificate[];
    isPluginInstalled: boolean;
    isPluginLoaded: boolean;
    pluginVersion: string;
    private _plugin;
    private _deviceList;
    private _deviceMap;
    private _certList;
    private _selectedCertificate;
    private _keyStr;
    private _callback;
    isActualVersionPlugin(): Promise<{
        cryptoDriverType: number;
        isActualVersion: boolean;
        currentVersion: any;
        actualVersion: string;
    }>;
    loadPlugin(): Promise<void>;
    reloadDevices(): Promise<void>;
    addCallback(cb: any): void;
    signCMS(data: any, certificateId: any, deviceId: any): Promise<any>;
    _stringVersionCompare(actualVersion: any, currentPluginVersion: any): boolean;
    _bufferSerialToHex(serial: any): string;
    _getValueFromCertificate(certificate: any, key: any): any;
    _getCertificateInPem(deviceId: any, certificateId: any): string;
    _isObject(object: any): boolean;
    _certFromBytesToBase64(arrayBuffer: any): string;
}
