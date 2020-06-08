
export interface initiateFlow {
    audience?: string
    client_id: string
    max_age: number
    nonce: string
    prompt?: string
    redirect_uri: string
    response_type: string
    scope: string
    state: string
}

