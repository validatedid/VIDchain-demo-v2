import { Signature } from "../interfaces/dtos";
export declare class VidchainBackend {
    private logger;
    constructor();
    validateJWTInBackend(signature: Signature): Promise<string>;
    private establishConnection;
    private validateJWTInVidChain;
}
