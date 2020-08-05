"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let LoginGateway = class LoginGateway {
    constructor() {
        this.userRedis = new ioredis_1.default({ keyPrefix: "jobs-user:" });
        this.logger = new common_1.Logger('LoginGateway');
    }
    afterInit() {
        this.logger.log('Initialized!');
    }
    handleConnection(client) {
        this.logger.log(`Client connected:     ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected:     ${client.id}`);
    }
    handleLoginEvent(message) {
        this.logger.log("handleLoginEvent:" + message);
        this.wss.emit('login', message);
    }
    handleAccessEvent(message) {
        this.logger.log("handleAccessEvent:" + message);
        this.wss.emit('access', message);
    }
    handleRegistrationEvent(message) {
        this.logger.log("handleRegistrationEvent:" + message);
        var user = JSON.parse(message);
        this.storeUser(user);
    }
    storeUser(user) {
        this.userRedis.set(user.credentialSubject.id, JSON.stringify(user));
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], LoginGateway.prototype, "wss", void 0);
__decorate([
    websockets_1.SubscribeMessage('login'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoginGateway.prototype, "handleLoginEvent", null);
__decorate([
    websockets_1.SubscribeMessage('access'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoginGateway.prototype, "handleAccessEvent", null);
__decorate([
    websockets_1.SubscribeMessage('registration'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoginGateway.prototype, "handleRegistrationEvent", null);
LoginGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [])
], LoginGateway);
exports.LoginGateway = LoginGateway;
//# sourceMappingURL=login.gateway.js.map