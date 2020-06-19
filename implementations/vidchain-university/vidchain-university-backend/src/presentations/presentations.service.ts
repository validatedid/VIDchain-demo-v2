import { Injectable, Logger, HttpStatus, HttpException, Body } from '@nestjs/common';
import * as vidchainBackend from "../api/vidchainBackend";
import { VerifiablePresentation, Presentation, MsgPresentationReady, CredentialData } from '../interfaces/dtos';
import { parseJwt, strB64dec } from "../utils/Util";
import * as config from "../config";

@Injectable()
export class PresentationsService {
    private readonly logger = new Logger(PresentationsService.name);
    
    async handlePresentation(body: MsgPresentationReady): Promise<any> {
        try{
            this.logger.debug("Presentation ready");
            const token = await vidchainBackend.getAuthzToken();
            const presentation: Presentation = await vidchainBackend.retrievePresentation(token, body.url);
            this.logger.debug("Presentation retrieved: "+ JSON.stringify(presentation));

            const validation: boolean = await this.validatePresentation(token, presentation);

            if(validation){
               const response = await this.generateCredential(token, presentation);
               return response;
            }
            else{
                this.throwErrorMessage("Error while validation the VP");
            }
        }
        catch (e) {
            this.throwErrorMessage("Error while creating the VC");
        }
    }

    async validatePresentation(token: string, presentation: Presentation){
        const dataDecoded = strB64dec(presentation.data.base64);
        this.logger.debug("Data decoded: "+ JSON.stringify(dataDecoded));
        const validation: boolean = await vidchainBackend.validateVP(token, dataDecoded);
        this.logger.debug("Validation of VP: "+ validation);
        return validation;
    }

    async generateCredential(token: string, presentation: Presentation){
        const userDID = presentation.name.split(" by ")[1];

         const credential: CredentialData = {
            type: ["VerifiableCredential", "ServiceCredential"],
            issuer: config.DID,
            id: "https://example.com/credential/2390",
            credentialSubject: {
                "id": userDID,
                "name": "IT Security degree",
                "University": "UPC",
                "starts": "Sept 2020"
            }
        }
        const response = await vidchainBackend.generateVerifiableCredential(token, credential);
        this.logger.debug("Credential created:"+ response);
        return response;
    }

    throwErrorMessage(message: string){
        throw new HttpException(
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }






    
}
