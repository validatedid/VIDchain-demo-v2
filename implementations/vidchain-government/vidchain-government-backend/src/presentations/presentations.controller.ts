import { Controller, Post, Get, Body, Res, HttpStatus, Param} from '@nestjs/common';
import { Response } from "express";
import { PresentationsService } from "./presentations.service";
import { User } from '../interfaces/dtos'

@Controller('presentations')
export class PresentationsController {
   constructor(private readonly presentationsService: PresentationsService) {}

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

  @Get(":did/:service")
  async generatePresentation(@Param() params, @Res() res: Response): Promise<Response<any>> {
    const result = await this.presentationsService.requestPresentation(params.did, params.service);
    return res.status(HttpStatus.OK).send(result);
  }
}
