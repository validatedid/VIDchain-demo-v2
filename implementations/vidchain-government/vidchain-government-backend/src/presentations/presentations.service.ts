import { Injectable, Logger, HttpStatus, HttpException, Body } from '@nestjs/common';
import * as vidchainBackend from "../api/vidchainBackend";
import { VerifiablePresentation, Presentation, MsgPresentationReady } from '../interfaces/dtos';
import { parseJwt, strB64dec } from "../utils/Parser";

@Injectable()
export class PresentationsService {
    private readonly logger = new Logger(PresentationsService.name);

    // async requestPresentation(did: string, service: string): Promise<any> {
    //     try {
    //         const token = await vidchainBackend.getAuthzToken();
    //         const presentation: Presentation = {
    //             target: did,
    //             name: service,
    //             type: [
    //                 [
    //                     "VerifiableCredential",
    //                     "VidOnboardingCredential"
    //                 ]
    //             ],
    //         }
    //         const response = await vidchainBackend.requestVP(token, presentation);
    //         this.logger.debug(response);
    //         //Check response
    //         if(response !== "Error"){
    //             return "Successfully VP creation";
    //         }
    //         else{
    //             throw new HttpException(
    //                 {
    //                   status: HttpStatus.INTERNAL_SERVER_ERROR,
    //                   error: "Error while creating the VP",
    //                 },
    //                 HttpStatus.INTERNAL_SERVER_ERROR
    //               );
    //         }
    //     }
    //     catch (e) {
    //         throw new HttpException(
    //             {
    //               status: HttpStatus.INTERNAL_SERVER_ERROR,
    //               error: "Error while creating the VP",
    //             },
    //             HttpStatus.INTERNAL_SERVER_ERROR
    //           );
    //     }
    // }

    async validatePresentation(body: MsgPresentationReady): Promise<any> {
        this.logger.debug("Presentation ready");
        const token = await vidchainBackend.getAuthzToken();
        const presentation: Presentation = await vidchainBackend.retrievePresentation(token, body.url);
        this.logger.debug("Presentation retrieved: "+ JSON.stringify(presentation));
        const dataDecoded = strB64dec(presentation.data.base64);
        this.logger.debug("Data decoded: "+ dataDecoded);
        const validation: boolean = await vidchainBackend.validateVP(token, dataDecoded);
        this.logger.debug("Validation of VP: "+ validation);
        if(validation){
            //And can create a Verifiable Credential
        }

        
    }





    
}
