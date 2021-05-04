import * as siopDidAuth from "@validatedid/did-auth";
import * as vidchain from '../api/vidchain';
import * as config from '../config';
import * as didAuth from '../interfaces/didAuth';
import {UriRequest, DidAuthRequestOpts,ObjectPassedBy, DidAuthResponseMode, DidAuthResponseContext} from '../interfaces/didAuth';
import {getEnterpriseDID, getJwtNonce} from './Util';

const generateJwtRequest = async (socketId: string): Promise<UriRequest> => {
    const sessionToken = await vidchain.getAuthzTokendDidKey();
    const jwt: string = sessionToken;
    const did: string = getEnterpriseDID(jwt);

    const claim: siopDidAuth.OidcClaim = {
        vc: {
          VerifiableIdCredential: { essential: true },
        },
      };
    const kid = `#${did.substring(8)}`;
    //We don't generate a state, but the library will manage the state
    const requestOpts: DidAuthRequestOpts = {
        oidpUri: "vidchain://did-auth",
        redirectUri: config.DID_AUTH_REDIRECT,
        requestObjectBy: {
          type: ObjectPassedBy.VALUE
        },
        signatureType: {
          signatureUri: `${config.API_URL}/signatures`,
          did: did,
          authZToken: jwt,
          kid: kid,
        },
        registrationType: {
          type: ObjectPassedBy.REFERENCE,
          referenceUri: `${config.API_URL}identifiers/${did};transform-keys=jwks`,
        },
        responseMode: DidAuthResponseMode.FORM_POST,
        responseContext:DidAuthResponseContext.WALLET,
        claims: claim,
      };
    const uriRequest: UriRequest = await siopDidAuth.createUriRequest(requestOpts);
    return uriRequest;
}

const verifyDidAuthResponse = async(siopResponseJwt: didAuth.SiopResponseJwt): Promise<siopDidAuth.DidAuthTypes.DidAuthValidationResponse> => {
  const authZToken = await vidchain.getAuthzToken();
  const nonce = await getJwtNonce(siopResponseJwt.id_token);
  
  const optsVerify: siopDidAuth.DidAuthTypes.DidAuthVerifyOpts = {
    verificationType: {
      verifyUri: config.SIGNATURE_VALIDATION,
      authZToken,
      didUrlResolver: config.DID_URI_RESOLVER,
    },
    redirectUri: config.DID_AUTH_REDIRECT,
    nonce,
  };
  const validationResponse = await siopDidAuth.verifyDidAuthResponse(
    siopResponseJwt.id_token,
    optsVerify
  );
  return validationResponse;
}

export {generateJwtRequest, verifyDidAuthResponse}