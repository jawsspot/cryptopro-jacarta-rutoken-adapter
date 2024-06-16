import { IParsedCertificate } from "../interfaces/certificate.interface";
export declare class RutokenDriver {
    #private;
    parsedCertificates: IParsedCertificate[];
    isPluginInstalled: boolean;
    isPluginLoaded: boolean;
    pluginVersion: string;
    private _rutoken;
    private _plugin;
    private _deviceList;
    private _deviceMap;
    private _errors;
    private _selectedCertificate;
    private _keyStr;
    constructor();
    loadPlugin(): Promise<void>;
    reloadDevices(): Promise<void>;
    signCMS(data: any, certificateId: any, deviceId: any): Promise<string>;
    private stringVersionCompare;
    private getLastRtPluginVersion;
    private initialize;
    private getAllDevices;
    private getAllCertificates;
    private getCertificateInfo;
    private parseCertificate;
    private getValueFromCertificate;
    private bindToken;
    private loadErrorCodes;
}
