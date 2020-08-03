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
}

export interface CredentialData {
  type: string[];
  issuer: string;
  id: string;
  credentialSubject: any;
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
