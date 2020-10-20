export interface RequestPresentation {
  target: string;
  name?: string;
  type: string[][];
}

export interface MsgPresentationReady {
  message: string;
  url: string;
}

export interface Presentation {
  id: string;
  type: string;
  name: string;
  hash: string;
  did: string;
  data: IAttributeData;
}
export interface IAttributeData {
  encrypted: any;
}
export interface VerifiablePresentation {
  "@context": string[];
  type: string;
  verifiableCredential: string[] | VerifiableCredential[];
  proof: Proof;
}
export interface VerifiableCredential extends Credential {
  issuer: string;
  issuanceDate: string;
  proof: Proof;
}
export interface Proof {
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
  jws: string;
  [x: string]: string;
}

export interface CredentialData {
  type: string[];
  issuer: string;
  id: string;
  credentialSubject: any;
}

export interface SocketClient {
  did: string;
  clientId: any;
}

export interface userInfo {
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
