import { Injectable, Logger, HttpStatus, HttpException, Body } from '@nestjs/common';
import * as vidchainBackend from "../api/vidchainBackend";
import { Presentation } from '../interfaces/dtos';

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

    async validatePresentation(body: Presentation): Promise<any> {
        this.logger.debug("Body: "+ body);
        return "Hello World"
    }

    
}
