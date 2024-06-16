export interface ICryptoDriverError {
    code: number,
    description: string,
    message: string,
    method: string,
    cryptoDriverType: number
}