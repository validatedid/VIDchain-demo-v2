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