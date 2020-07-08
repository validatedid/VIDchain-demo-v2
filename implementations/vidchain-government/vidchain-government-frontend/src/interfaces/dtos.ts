
export interface ICredentialData {
    id: string
    firstName: string
    lastName: string
    dateOfBirth: string
    placeOfBirth: string
    currentAddress: string
    city: string
    state: string
    zip: string
    gender: string
}

export interface Presentation {
    target: string, 
    name?: string,
    type: string[][]
}

export interface CredentialData {
    type: string[]
    issuer: string
    id: string
    credentialSubject: any
}