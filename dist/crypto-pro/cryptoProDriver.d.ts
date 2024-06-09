export declare class CryptoProDriver {
    #private;
    /**Псевдоним для совместимости */
    get parsedCertificates(): Array<any>;
    isPluginLoaded: boolean;
    isPluginWorked: boolean;
    isActualVersion: boolean;
    private _parsedCertificateList;
    private _plugin;
    private _isAsync;
    private _currentPluginVersion;
    private _scpName;
    private _markedThumbprintContainer;
    private _isPluginEnabled;
    private _deviceMap;
    private _certList;
    constructor();
    reloadDevices(): Promise<void>;
    isActualVersionPlugin(): Promise<{
        cryptoDriverType: number;
        isActualVersion: boolean;
        currentVersion: string;
        actualVersion: any;
    }>;
    loadPlugin(): Promise<void>;
    signCMS(data: any, certificateId: any, deviceId: any): Promise<any>;
}
