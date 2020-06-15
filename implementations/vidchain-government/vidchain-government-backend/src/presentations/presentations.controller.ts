import { Controller, Post, Get, Body, Res, HttpStatus, Param} from '@nestjs/common';
import { Response } from "express";
import { PresentationsService } from "./presentations.service";
import { Presentation } from '../interfaces/dtos'

@Controller('presentations')
export class PresentationsController {
   constructor(private readonly presentationsService: PresentationsService) {}

  @Post("validation")
  async register(
    @Body() body: Presentation,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.presentationsService.validatePresentation(
      body
    );

    return res.status(HttpStatus.CREATED).send(result);
  }

}
