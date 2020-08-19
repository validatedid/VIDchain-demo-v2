var jwtDecode = require('jwt-decode');
/**
 * Parse a JWT token
 */
function parseJwt(token) {
  try{
    var tok = jwtDecode(token)
    return tok;
  }
  catch(Error){
      return null;
  }
}

export { parseJwt };
