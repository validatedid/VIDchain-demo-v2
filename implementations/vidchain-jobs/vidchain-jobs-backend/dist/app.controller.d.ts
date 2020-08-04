import { AppService } from './app.service';
import { Signature, ValidateResponse } from "./interfaces/dtos";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<string>;
    validate(signature: Signature): Promise<ValidateResponse>;
}
