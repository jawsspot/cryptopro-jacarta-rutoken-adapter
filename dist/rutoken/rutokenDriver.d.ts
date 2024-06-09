export declare class RutokenDriver {
    #private;
    isPluginInstalled: boolean;
    isPluginLoaded: boolean;
    lastPluginVersion: any;
    parsedCertificates: any[];
    constructor();
    isActualVersionPlugin(): Promise<{
        cryptoDriverType: number;
        isActualVersion: boolean;
        currentVersion: any;
        actualVersion: any;
    }>;
    loadPlugin(): Promise<void>;
    reloadDevices(): Promise<void>;
    signCMS(data: any, certificateId: any, deviceId: any): Promise<any>;
}
