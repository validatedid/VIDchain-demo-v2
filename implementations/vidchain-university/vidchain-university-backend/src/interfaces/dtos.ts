export interface Signature {
    signature: string;
}
  
export interface ValidateResponse {
    response: string;
}
export interface User {
    id: string
    personIdentifier: string
    currentFamilyName: string
    currentGivenName: string
    birthName: string
    dateOfBirth: string
    placeOfBirth: string
    currentAddress: string
    gender: string
    govID: string
}

export interface RequestPresentation {
    target: string, 
    name?: string,
    type: string[][]
}

export interface MsgPresentationReady {
    message: string, 
    url: string
}

export interface Presentation {
    id: string;
    type: string;
    name: string;
    hash: string;
    data: IAttributeData;
}

export interface IAttributeData {
    base64: string;
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
    type: string[]
    issuer: string
    id: string
    credentialSubject: any
}

export interface SocketClient {
    did: string;
    clientId: any;
  }

