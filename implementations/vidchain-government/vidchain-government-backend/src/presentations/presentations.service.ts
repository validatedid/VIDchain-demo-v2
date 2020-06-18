import { Injectable, Logger, HttpStatus, HttpException, Body } from '@nestjs/common';
import * as vidchainBackend from "../api/vidchainBackend";
import { VerifiablePresentation, Presentation, MsgPresentationReady, CredentialData } from '../interfaces/dtos';
import { parseJwt, strB64dec } from "../utils/Parser";
import * as config from "../config";

@Injectable()
export class PresentationsService {
    private readonly logger = new Logger(PresentationsService.name);
    
    async validatePresentation(body: MsgPresentationReady): Promise<any> {
        try{
            this.logger.debug("Presentation ready");
            const token = await vidchainBackend.getAuthzToken();
            this.logger.debug("token: "+ token + "body: "+ body.url);
            const presentation: Presentation = await vidchainBackend.retrievePresentation(token, body.url);
            const userDID = presentation.name.split(" by ")[1];
            this.logger.debug("Presentation retrieved: "+ JSON.stringify(presentation));
            const dataDecoded = strB64dec(presentation.data.base64);
            this.logger.debug("Data decoded: "+ JSON.stringify(dataDecoded));
            //const validation: boolean = await vidchainBackend.validateVP(token, dataDecoded);
            const validation = true;
            this.logger.debug("Validation of VP: "+ validation);
            if(validation){
                //And can create a Verifiable Credential
                const credential: CredentialData = {
                    type: ["VerifiableCredential", "ServiceCredential"],
                    issuer: config.DID,
                    id: "https://example.com/credential/2390",
                    credentialSubject: {
                        "id": userDID,
                        "name": "Service: Bicing",
                        "startAt": Math.floor(Date.now() / 1000),
                        "expiresAt": Math.floor(Date.now() / 1000) + Math.floor(31104000) //1 year
                    }
                }
                const response = await vidchainBackend.generateVerifiableCredential(token, credential);
                this.logger.debug("Credential Sent: "+ response);
                return response;
            }
            else{
                throw new HttpException(
                    {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: "Error while validation the VC",
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
        catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: "Error while creating the VC",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        
    }





    
}
