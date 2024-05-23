export class JacartaDriver {
    isPluginInstalled: boolean;
    isPluginLoaded: boolean;
    pluginVersion: any;
    parsedCertificates: any[];
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
    #private;
}
