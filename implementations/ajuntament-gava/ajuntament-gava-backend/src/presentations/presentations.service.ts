import { Injectable, Logger, HttpStatus, HttpException } from "@nestjs/common";
import * as vidchain from "../api/vidchain";
import {
  Presentation,
  MsgPresentationReady,
  CredentialData,
} from "../interfaces/dtos";
import { strB64dec } from "../utils/Util";
import * as config from "../config";

@Injectable()
export class PresentationsService {
  private readonly logger = new Logger(PresentationsService.name);

  /**
   * Request Verifiable presentation
   * An authorization token is requested and it is used to request a Verifiable Presentation
   */
  async handleRequest(body: MsgPresentationReady): Promise<any> {
    this.logger.debug("handling vp request...");
    this.logger.debug(JSON.stringify(body));
    const token = await vidchain.getAuthzToken();
    const response = await vidchain.requestVP(
      token,
      JSON.parse(JSON.stringify(body))
    );
    this.logger.debug("requestVP response:");
    this.logger.debug(response);
  }

  /**
   * Handle callback return presentation
   * An authorization token is requested and it is used to request a Presentation retrieval and validate it
   */
  async handlePresentation(body: MsgPresentationReady): Promise<any> {
    try {
      this.logger.debug("Presentation ready");
      const token = await vidchain.getAuthzToken();
      const presentation: Presentation = await vidchain.retrievePresentation(
        token,
        body.url
      );
      this.logger.debug(
        "Presentation retrieved: " + presentation
      );
      const validation: boolean = await this.validatePresentation(
        token,
        presentation
      );
      /**
       * The type of presentation can be parsed so as to perform one action or another.
       * In the following example if the credential is for Login there's no need to generate a new credential.
       * Otherwise the backend of the entity could generate a credential automatically after a successful VP.
       */

      const credentialType = presentation.name.split(": Verifiable")[0];
      this.logger.debug("Presentation type: " + credentialType);
      if (validation && credentialType == "Login") {
        this.logger.debug(
          "Presentation has just been checked. Presentation validation: done."
        );
        this.logger.debug("No need to generate a new credential.");
        return presentation;
      } else if (validation && credentialType != "Login") {
        this.logger.debug(
          "Presentation has just been checked. Presentation validation: done."
        );
        this.logger.debug("About to generate a new credential.");
        const response = await this.generateCredential(token, presentation);
        this.logger.debug("generateCredential response: " + response);
        return presentation;
      }
      return validation;
    } catch (e) {
      this.throwErrorMessage("Error while creating the VC");
    }
  }

  /**
   *  Validates retrieved presentation
   */
  async validatePresentation(token: string, presentation: Presentation) {
    this.logger.debug("validate presentation: "+ JSON.stringify(presentation));
    let validation = false;
    /**
     * Despite the API validates the Credential Type, and the wallet filters by type of requested credential too, at this point, the backend could even perform its own extra validations. For instance:
     * const credentialType = await this.customValidationCredentialType(presentation);
     * For testing purposes, in this example, this const is simply set to true.
     */
    const credentialType = true;
    if (credentialType) {
      validation = await vidchain.validateVP(token, JSON.parse(presentation.data.encrypted));
      this.logger.debug("Validation of VP: " + validation);
    }
    return validation;
  }

  /**
   * Request Verifiable Credential generation
   */
  async generateCredential(token: string, presentation: Presentation) {
    const serviceName = presentation.name.split(": Verifiable")[0];
    const userDID = presentation.name.split(" by ")[1];
    const credential: CredentialData = {
      type: ["VerifiableCredential", "ServiceCredential"],
      issuer: config.DID,
      id: "https://example.com/credential/2390",
      credentialSubject: {
        id: userDID,
        name: serviceName.replace(": Verifiable", ""),
        startAt: Math.floor(Date.now() / 1000),
        expiresAt: Math.floor(Date.now() / 1000) + Math.floor(31104000), //1 year
      },
    };
    const response = await vidchain.generateVerifiableCredential(
      token,
      credential
    );
    this.logger.debug("Credential created:" + response);
    return response;
  }

  throwErrorMessage(message: string) {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}