export interface Signature {
    signature: string;
}
  
export interface ValidateResponse {
    response: string;
}
export interface User {
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