import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "./users.service";
import { SocketClient } from "../interfaces/dtos";

@Controller("demo/governmentbackend/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   *  presentationReady message is used to trigger the response of a Verifiable presentation. Notice that the did of user is retrieved from the credential and the socket clientId from the backend database.
   */
  /**
   *  Store socket clientId -  did pair in a database
   */
  @Post("")
  async register(
    @Body() body: SocketClient,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.usersService.createUser(body);
    return res.status(HttpStatus.CREATED).send(result);
  }

  /**
   *  Retrieve from database socket clientId
   */
  @Get(":did")
  async getUser(@Param() params, @Res() res: Response): Promise<Response<any>> {
    const result = await this.usersService.getUser(params.did);
    return res.status(HttpStatus.OK).send(result);
  }
}
