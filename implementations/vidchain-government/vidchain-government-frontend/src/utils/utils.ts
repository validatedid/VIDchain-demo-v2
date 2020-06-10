import {IDTokenPayload} from '../interfaces/ITokens'

function randomString (length: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * Parse a JWT token
 */
function parseJwt(token: string) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function atobFunction(c) {
            return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return "Error";
    }
  }
  
  function getJwtNonce(jwt: string): string {
    return parseJwt(jwt).nonce
  }
  
  function getUserDid( jwt: string ): string {
    return parseJwt(jwt).sub;
  }
  

export {
    randomString,
    getUserDid
  };