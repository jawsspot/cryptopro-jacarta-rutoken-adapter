import { IParsedCertificate } from '../interfaces/certificate.interface';
export declare class CryptoProDriver {
    #private;
    /**Псевдоним для совместимости */
    get parsedCertificates(): Array<IParsedCertificate>;
    isPluginLoaded: boolean;
    isPluginWorked: boolean;
    pluginVersion: string;
    isActualVersion: boolean;
    private _parsedCertificateList;
    private _plugin;
    private _scpName;
    private _markedThumbprintContainer;
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
    signCMS(data: any, certificateId: any, deviceId: any): Promise<unknown>;
    private stringVersionCompare;
    private checkForPlugIn_Async;
    private versionCompare_Async;
    private getLatestVersion_Async;
    private getAllDevicesAsync;
    private signCMSAsync;
    private bytesToBase64;
    private handleError;
}
