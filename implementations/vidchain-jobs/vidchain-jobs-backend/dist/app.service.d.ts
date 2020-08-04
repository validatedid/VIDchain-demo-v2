import { ValidateResponse, Signature } from "./interfaces/dtos";
export declare class AppService {
    private logger;
    private readonly socket;
    private vidchainBackend;
    private readonly nonceRedis;
    private readonly userRedis;
    getHello(): Promise<string>;
    validate(signature: Signature): Promise<ValidateResponse>;
    getUser(did: string): Promise<any>;
    storeUserNonce(token: any): void;
    sendDataToClient(did: any): void;
    sendUserDataToClient(user: any): void;
}
