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

export interface UserInfo {
  did?: string;
  status: string;
  identifier?: string;
  prefix?: string;
  phone?: string;
  identifierType?: string;
  name?: string;
  surnames?: string;
  surname1?: string;
  surname2?: string;
  countryCode?: string;
  email?: string;
  phouserCertificatene?: string;
  certificateType?: string;
  companyId?: string;
  companyName?: string;
  method?: string;
  assuranceLevel?: string;
  error?: string;
}
