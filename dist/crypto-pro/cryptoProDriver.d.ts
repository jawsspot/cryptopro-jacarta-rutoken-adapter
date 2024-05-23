export class CryptoProDriver {
    isPluginLoaded: boolean;
    isPluginWorked: boolean;
    isActualVersion: boolean;
    parsedCertificates: any[];
    reloadDevices(): Promise<void>;
    isActualVersionPlugin(): Promise<{
        cryptoDriverType: number;
        isActualVersion: boolean;
        currentVersion: string;
        actualVersion: any;
    }>;
    loadPlugin(): Promise<void>;
    signCMS(data: any, certificateId: any, deviceId: any): Promise<any>;
    isPluginEnabled: boolean;
    #private;
}
