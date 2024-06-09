export declare class JacartaDriver {
    #private;
    _plugin: any;
    isPluginInstalled: boolean;
    isPluginLoaded: boolean;
    pluginVersion: any;
    _deviceList: any[];
    _deviceMap: Map<any, any>;
    _certList: any[];
    parsedCertificates: any[];
    _selectedCertificate: any;
    _keyStr: string;
    _callback: any;
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
