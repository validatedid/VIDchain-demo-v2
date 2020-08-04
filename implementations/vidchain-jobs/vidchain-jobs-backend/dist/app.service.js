"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const io = require("socket.io-client");
const config = require("./config");
const common_2 = require("@nestjs/common");
const vidchainBackend_1 = require("./api/vidchainBackend");
const Parser_1 = require("./utils/Parser");
const ioredis_1 = require("ioredis");
let AppService = class AppService {
    constructor() {
        this.logger = new common_2.Logger('LoginGateway');
        this.socket = io(config.BASE_URL);
        this.vidchainBackend = new vidchainBackend_1.VidchainBackend();
        this.nonceRedis = new ioredis_1.default({ keyPrefix: "jobs-nonce:" });
        this.userRedis = new ioredis_1.default({ keyPrefix: "jobs-user:" });
    }
    async getHello() {
        var userDID = "did:ebsi:0xB7C3CAD23c2445aFdBE0DE95eb4FBE4ae982C783";
        const nonce = await this.nonceRedis.get(userDID);
        const user = await this.userRedis.get(userDID);
        this.logger.log(`Nonce from DB:`);
        this.logger.log(nonce);
        this.logger.log(`User from DB:`);
        this.logger.log(user);
        return user;
    }
    async validate(signature) {
        var validateReponse = {
            response: "success"
        };
        const validate = await this.vidchainBackend.validateJWTInBackend(signature);
        if (!validate.payload) {
            validateReponse.response = "error";
        }
        else {
            const tokenParsed = Parser_1.parseJwt(signature.signature);
            this.storeUserNonce(tokenParsed);
            var user = await this.getUser(tokenParsed.did);
            console.log(user);
            if (user !== null && user !== "") {
                this.sendUserDataToClient(user);
            }
            else {
                this.sendDataToClient(tokenParsed.did);
            }
        }
        return validateReponse;
    }
    async getUser(did) {
        return await this.userRedis.get(did);
    }
    storeUserNonce(token) {
        this.nonceRedis.set(token.did, token.nonce);
    }
    sendDataToClient(did) {
        const socket = io(config.BASE_URL);
        socket.emit('login', did);
    }
    sendUserDataToClient(user) {
        const socket = io(config.BASE_URL);
        socket.emit('access', user);
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map