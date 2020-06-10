import { JWT } from 'jose';
import {IDTokenPayload} from '../interfaces/ITokens'

function randomString (length: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function decodePayload( jwt: string ): IDTokenPayload{
    const { payload } = JWT.decode(jwt, { complete: true });
    return payload as IDTokenPayload;
  }
  
  function getJwtNonce(jwt: string): string {
    return decodePayload(jwt).nonce
  }
  
  function getUserDid( jwt: string ): string {
    return decodePayload(jwt).sub;
  }
  

export {
    randomString,
    getUserDid
  };