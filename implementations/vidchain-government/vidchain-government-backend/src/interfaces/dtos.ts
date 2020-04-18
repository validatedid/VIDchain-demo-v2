export interface Signature {
    signature: string;
}
  
export interface ValidateResponse {
    response: string;
}
export interface User {
    did: string
    firstname: string
    lastname: string
    gender: string
    dateOfBirth: string
    placeOfBirth: string
    currentAddress: string
    city: string
    state: string
    zip: string
}