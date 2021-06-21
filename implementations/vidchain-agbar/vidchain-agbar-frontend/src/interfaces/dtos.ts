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
