import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import * as vidchainBackend from "../api/vidchainBackend";
import { Presentation } from '../interfaces/dtos';

@Injectable()
export class PresentationsService {

    async requestPresentation(did: string, service: string): Promise<any> {
        try {
            const token = await vidchainBackend.getAuthzToken();
            const presentation: Presentation = {
                target: did,
                name: service,
                type: [
                    [
                        "VerifiableCredential",
                        "VidOnboardingCredential"
                    ]
                ],
            }
		    const response = await vidchainBackend.requestVP(token, presentation);
            //Check response
            if(response !== "Error"){
                return "Successfully VP creation";
            }
            else{
                throw new HttpException(
                    {
                      status: HttpStatus.INTERNAL_SERVER_ERROR,
                      error: "Error while creating the VP",
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                  );
            }
        }
        catch (e) {
            throw new HttpException(
                {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  error: "Error while creating the VP",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
              );
        }
    }

    async createUser(user: User): Promise<any> {
        try {
            await this.userRedis.set(user.id, JSON.stringify(user));
            return "Successfully user creation";
        }
        catch (e) {
            throw new HttpException(
                {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  error: "Error while creating the user",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
              );
        }
    }
}
