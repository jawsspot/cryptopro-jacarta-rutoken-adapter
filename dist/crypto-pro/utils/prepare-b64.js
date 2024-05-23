"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCertificateInPem = getCertificateInPem;

function getCertificateInPem(certInBase64) {
  var begin = '-----BEGIN CERTIFICATE-----\n';
  var end = '-----END CERTIFICATE-----';
  return begin + certInBase64 + end;
}