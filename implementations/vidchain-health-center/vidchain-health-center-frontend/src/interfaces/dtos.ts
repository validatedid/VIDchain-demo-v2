export interface ICredentialData {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  currentAddress: string;
  city: string;
  state: string;
  zip: string;
  gender: string;
}

export interface Presentation {
  target: string;
  name?: string;
  type: string[][];
  redirectUri?: string;
}

export interface CredentialData {
  credential: InputCredential;
  options?: InputOptions;
}

export interface InputOptions {
  eidasBridge: EsealOptions;
}

export interface EsealOptions {
  id?: string;
  password: string;
}

export interface InputCredential {
  id: string;
  "@context"?: string[];
  type: string[];
  credentialSubject: any;
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialStatus?: CredentialStatus;
  [x: string]: unknown;
}
export interface CredentialStatus {
  id: string;
  type: string;
}

export interface verifiableKYC {
  id: string;
  documentNumber: string;
  documentType: string;
  name: string;
  surname: string;
  fullName: string;
  nationality: string;
  stateIssuer: string;
  issuingAuthority: string;
  dateOfExpiry: string;
  dateOfBirth: string;
  placeOfBirth: string;
  sex: string;
  personalNumber: string;
}


