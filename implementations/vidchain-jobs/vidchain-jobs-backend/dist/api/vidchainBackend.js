"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../config");
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
class VidchainBackend {
    constructor() {
        this.logger = new common_1.Logger('VidchainBackend');
    }
    async validateJWTInBackend(signature) {
        var bearerToken = await this.establishConnection();
        let authorization = {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        };
        var response = await this.validateJWTInVidChain(authorization, signature);
        return response;
    }
    async establishConnection() {
        let data = {
            enterpriseName: config.Name,
            nonce: config.nonce
        };
        const response = await axios_1.default.post(config.API_URL + "token", data);
        return response.data.jwt;
    }
    async validateJWTInVidChain(authorization, signature) {
        const response = await axios_1.default.post(config.API_URL + "signature/validation", signature, authorization);
        return response.data;
    }
}
exports.VidchainBackend = VidchainBackend;
//# sourceMappingURL=vidchainBackend.js.map