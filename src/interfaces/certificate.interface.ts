export interface IParsedCertificate {
    /**годен до */
    validToDate: string;
    /**выдан */
    validFromDate: string;
    /**имя токена */
    subjectName: string;
    /**владелец */
    issuerName: string;
    id: number;
    isValid: boolean;
    hasPrivateKey: boolean;
    /**серийный номер серта */
    serial: string;
    /**тело сертификата */
    b64: string;
    /**id токена */
    deviceId: number;
    /** Отпечаток сертификата*/
    thumbprint: string
}