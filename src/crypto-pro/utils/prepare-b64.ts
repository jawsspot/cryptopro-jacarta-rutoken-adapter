export function getCertificateInPem(certInBase64) {

    const begin = '-----BEGIN CERTIFICATE-----\n'
    const end = '-----END CERTIFICATE-----'
    return begin + certInBase64 + end
}