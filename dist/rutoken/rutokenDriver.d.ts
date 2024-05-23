export class RutokenDriver {
    isPluginInstalled: boolean;
    isPluginLoaded: boolean;
    pluginVersionStatus: any;
    lastPluginVersion: any;
    parsedCertificates: any[];
    isActualVersionPlugin(): Promise<{
        cryptoDriverType: number;
        isActualVersion: boolean;
        currentVersion: any;
        actualVersion: any;
    }>;
    loadPlugin(): Promise<void>;
    reloadDevices(): Promise<void>;
    signCMS(data: any, certificateId: any, deviceId: any): Promise<any>;
    #private;
}
