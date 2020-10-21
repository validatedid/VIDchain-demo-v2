import { Injectable, Logger, HttpStatus, HttpException } from "@nestjs/common";
import { SocketClient } from "../interfaces/dtos";
import Redis from "ioredis";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly userRedis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_URL,
    keyPrefix: "gavius-user:",
  });

  /**
   *  Store SocketClient, i.e. did - clientId pair
   */
  async createUser(body: SocketClient): Promise<any> {
    try {
      await this.userRedis.set(body.did, body.clientId);
      this.logger.debug("Successfully user session creation");
      const currentSession = await this.getUser(body.did);
      this.logger.debug("currentSession: " + JSON.stringify(currentSession));
      return "Successfully user session creation";
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while creating the user",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   *  Retrieve socket clientId
   */
  async getUser(did: string): Promise<string> {
    return await this.userRedis.get(did);
  }
}
