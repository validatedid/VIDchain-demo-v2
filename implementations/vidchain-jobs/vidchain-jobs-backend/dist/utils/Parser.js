"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwtDecode = require('jwt-decode');
function parseJwt(token) {
    try {
        var tok = jwtDecode(token);
        return tok;
    }
    catch (Error) {
        return null;
    }
}
exports.parseJwt = parseJwt;
//# sourceMappingURL=Parser.js.map