import { Controller, Post, Get, Body, Res, HttpStatus, Param} from '@nestjs/common';
import { Response } from "express";
import { UsersService } from "./users.service";
import { User } from '../interfaces/dtos'

@Controller('demo-api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Post("")
  async register(
    @Body() body: User,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.usersService.createUser(
      body
    );

    return res.status(HttpStatus.CREATED).send(result);
  }

  @Get(":did")
  async getUser(@Param() params, @Res() res: Response): Promise<Response<any>> {
    const result = await this.usersService.getUser(params.did);
    return res.status(HttpStatus.OK).send(result);
  }

}
