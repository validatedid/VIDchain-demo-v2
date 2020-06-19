import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { User } from '../interfaces/dtos'
import Redis from 'ioredis';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    private readonly userRedis = new Redis({ 
        port: process.env.REDIS_PORT, // Redis port
        host: process.env.REDIS_URL,
        keyPrefix: "government-user:" });

    async getUser(did: string): Promise<User> {
        return await this.userRedis.get(did);
    }

    async createUser(user: User): Promise<any> {
        try {
            await this.userRedis.set(user.id, JSON.stringify(user));
            this.logger.debug("Successfully user creation");
            return "Successfully user creation";
        }
        catch (e) {
            throw new HttpException(
                {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  error: "Error while creating the user",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
              );
        }
    }
}
