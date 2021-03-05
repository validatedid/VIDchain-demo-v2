import { decode as atob, encode } from "base-64";
import { verifiableKYC } from "../interfaces/dtos";

const jwtDecode = require("jwt-decode");

function randomString(length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Parse a JWT token
 */
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function atobFunction(c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return "Error";
  }
}

function getUserDid(jwt: string): string {
  return parseJwt(jwt).sub;
}
function getIssuerDid(jwt: string): string {
  return parseJwt(jwt).did;
}

/**
 * Decodes a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64dec(input: any) {
  try {
    return JSON.parse(atob(input));
  } catch (error) {
    return null;
  }
}

/**
 * Encoded  a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64enc(input: any) {
  try {
    return encode(JSON.stringify(input));
  } catch (error) {
    return null;
  }
}

function decodeJWT(token: any) {
  try {
    var tok = jwtDecode(token);
    return tok;
  } catch (Error) {
    return Error;
  }
}

function generateFakeCredential(): verifiableKYC{
  const verifiableCredentialFake: verifiableKYC = {
    id: "Not yet provided",
    name: "Santi",
    surname: "Casas",
    fullName: "Santi Casas",
    dateOfBirth: "01/01/1990",
    placeOfBirth: "Barcelona",
    personalNumber: "123344",
    documentType: "Carnet de Identidad",
    nationality: "ESP",
    stateIssuer: "ESP",
    dateOfExpiry: "10/10/2020",
    sex: "Male",
    documentNumber: "1234455",
    issuingAuthority: "ESP",
  }
  return verifiableCredentialFake;
}

export { randomString, getIssuerDid, getUserDid, strB64dec, strB64enc, decodeJWT, generateFakeCredential};
