import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class LoginGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private readonly userRedis;
    wss: Server;
    constructor();
    private logger;
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleLoginEvent(message: any): void;
    handleAccessEvent(message: any): void;
    handleRegistrationEvent(message: any): void;
    storeUser(user: any): void;
}
